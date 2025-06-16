import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TipoCancha } from '../models/tipo-cancha.model';
import { Horario } from '../models/horario.model';
import { Precio } from '../models/precio.model';
import { CanchaService } from '../services/cancha.service';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  tiposCancha: TipoCancha[] = [];
  horarios: Horario[] = [];
  precios: Precio[] = [];
  dataCargada: boolean = false;


  constructor(private canchaService: CanchaService,   private reservaService: ReservaService
) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.canchaService.getTiposCancha().subscribe(tipos => {
      this.tiposCancha = tipos;
      const horarioRequests = tipos.map(c => this.canchaService.getHorarios(c.id));

      forkJoin(horarioRequests).subscribe(horariosArrays => {
        // ✅ Asignar canchaId correctamente por índice
        this.horarios = horariosArrays.flatMap((horarios, index) =>
          horarios.map(h => ({
            ...h,
            canchaId: this.tiposCancha[index].id,
            id: +h.id
          }))
        );

        this.canchaService.getAllPrecios().subscribe(precios => {
          this.precios = precios.map(p => ({
            ...p,
            canchaId: +p.canchaId,
            horarioId: +p.horarioId,
            precio: +p.precio
          }));
          this.dataCargada = true;

          // 🔍 Verificar combinaciones sin precio (solo para debug)
          const combinacionesSinPrecio = this.horarios.filter(horario => {
            return !this.precios.find(precio =>
              +precio.horarioId === +horario.id && +precio.canchaId === +horario.canchaId
            );
          });

          if (combinacionesSinPrecio.length > 0) {
            console.warn('🔎 Combinaciones sin precio asignado:');
            combinacionesSinPrecio.forEach(h => {
              console.warn(
                `➡️ canchaId=${h.canchaId}, horarioId=${h.id}, día=${h.diaSemana}, horaInicio=${h.horaInicio}, horaFin=${h.horaFin}`
              );
            });
          }
        });
      });
    });
  }

  getHorariosPorCanchaYDia(canchaId: number, dia: string): Horario[] {
    return this.horarios.filter(h => +h.canchaId === +canchaId && h.diaSemana === dia);
  }

  getPrecioDeHorario(horarioId: number, canchaId: number): number | null {
    const precio = this.precios.find(p =>
      +p.horarioId === +horarioId && +p.canchaId === +canchaId
    );
    if (!precio) {
      console.warn(`❌ Precio no encontrado para canchaId=${canchaId}, horarioId=${horarioId}`);
    }
    return precio?.precio ?? null;
  }

}

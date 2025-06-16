import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TipoCancha } from '../models/tipo-cancha.model';
import { Horario } from '../models/horario.model';
import { Precio } from '../models/precio.model';
import { CanchaService } from '../services/cancha.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  tiposCancha: TipoCancha[] = [];
  horarios: Horario[] = [];
  precios: Precio[] = [];

  constructor(private canchaService: CanchaService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.canchaService.getTiposCancha().subscribe(tipos => {
      this.tiposCancha = tipos;
      const horarioRequests = tipos.map(c => this.canchaService.getHorarios(c.id));

      forkJoin(horarioRequests).subscribe(horariosArrays => {
        this.horarios = horariosArrays.flat();

        const precioRequests = this.horarios.map(h =>
          this.canchaService.getPrecios(h.canchaId, h.id)
        );

        forkJoin(precioRequests).subscribe(preciosArrays => {
          const preciosPlano = preciosArrays.flat();
          // ✅ Eliminar precios duplicados
          this.precios = preciosPlano.filter((valor, index, self) =>
            index === self.findIndex(p =>
              p.canchaId === valor.canchaId &&
              p.horarioId === valor.horarioId &&
              p.precio === valor.precio
            )
          );
        });
      });
    });
  }

  getHorariosPorCanchaYDia(canchaId: number, dia: string): Horario[] {
    return this.horarios.filter(h => h.canchaId === canchaId && h.diaSemana === dia);
  }

  getPreciosDeHorarioPorCancha(horarioId: number, canchaId: number): Precio[] {
    return this.precios.filter(p => p.horarioId === horarioId && p.canchaId === canchaId);
  }
}

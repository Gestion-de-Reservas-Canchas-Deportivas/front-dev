// pricing.component.ts
import { Component, OnInit } from '@angular/core';
import { PrecioService } from '../../services/precio.service';
import { Precio } from '../../models/precio.model';
import { TipoCancha } from '../../models/tipo-cancha.model';
import { TipoCanchaService } from '../../services/tipo-cancha.service';
import { Horario } from '../../models/horario.model';
import { HorarioService } from 'src/app/services/horario.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  precios: Precio[] = [];
  canchas: TipoCancha[] = [];
  horarios: Horario[] = [];
  editando: boolean = false;
  nuevoHorarioStr: string = '';
  tipoDiaSeleccionado: string = '';


  canchaSeleccionadaId: number = 0;

  // Propiedad para el nuevo registro
  nuevoPrecio: Precio = {
    canchaId: 0,
    horarioId: 0,
    precio: 0
  };

  constructor(
    private precioService: PrecioService,
    private canchaService: TipoCanchaService,
    private horarioService: HorarioService
  ) { }

ngOnInit(): void {
  this.canchaService.getAll().subscribe(data => {
    this.canchas = data;
    this.canchaSeleccionadaId = 0;
    this.cargarHorariosYPrecios();
  });
}

  cargarCanchas(): void {
    this.canchaService.getAll().subscribe(data => {
      this.canchas = data;
      if (this.canchas.length) {
        this.canchaSeleccionadaId = this.canchas[0].id;
        this.cargarPrecios();
        this.cargarHorarios();
      }
    });
  }

cargarPrecios(): void {
  this.cargarHorariosYPrecios(); // Siempre asegura el orden correcto
}


cargarHorarios(): void {
  if (this.canchaSeleccionadaId === 0) {
    this.horarioService.getAll().subscribe(data => {
      this.horarios = data;
    });
  } else {
    this.horarioService.getByCanchaId(this.canchaSeleccionadaId).subscribe(data => {
      this.horarios = data;
    });
  }
}

cargarHorariosYPrecios(): void {
  this.horarioService.getAll().subscribe(horarios => {
    this.horarios = horarios.map(h => ({
      ...h,
      id: Number(h.id),
      canchaId: Number(h.canchaId)
    }));

    this.precioService.getAll().subscribe({
      next: (data) => {
        const preciosConvertidos = data.map(p => ({
          ...p,
          horarioId: Number(p.horarioId),
          canchaId: Number(p.canchaId)
        }));

        this.precios = preciosConvertidos
          .filter(p => +this.canchaSeleccionadaId === 0 || +p.canchaId === +this.canchaSeleccionadaId)
          .filter(p => {
            if (!this.tipoDiaSeleccionado) return true;

            const horario = this.horarios.find(h => h.id === p.horarioId);
            if (!horario) return false;

            const dia = horario.diaSemana;
            if (this.tipoDiaSeleccionado === 'weekday') {
              return dia !== 'SABADO' && dia !== 'DOMINGO' && dia !== 'FERIADO';
            }
            if (this.tipoDiaSeleccionado === 'weekend') {
              return dia === 'SABADO' || dia === 'DOMINGO';
            }
            return dia === 'FERIADO';
          });
      },
      error: (err) => console.error('Error al obtener precios', err)
    });
  });
}




getNombreCancha(id: number): string {
  if (!id || !this.canchas?.length) return '—';
  return this.canchas.find(c => c.id === id)?.name ?? '—';
}

getHorario(id: number): string {
  const horario = this.horarios.find(h => +h.id === +id);
  console.log('Buscando horario para ID:', id, '=>', horario);
  return horario ? `${horario.horaInicio} - ${horario.horaFin}` : '—';
}


getDiaSemana(id: number): string {
  const horario = this.horarios.find(h => +h.id === +id);
  return horario ? this.traducirDia(horario.diaSemana) : '';
}

getBadgeClass(id: number): string {
  const horario = this.horarios.find(h => +h.id === +id);
  if (!horario) return '';
  return horario.diaSemana === 'SABADO' || horario.diaSemana === 'DOMINGO'
    ? 'weekend'
    : 'weekday';
}


  traducirDia(dia: string): string {
    switch (dia) {
      case 'SABADO':
      case 'DOMINGO': return 'Fin de semana';
      case 'FERIADO': return 'Feriado';
      default: return 'Día de semana';
    }
  }

  abrirModal(): void {
    this.nuevoPrecio = { canchaId: 0, horarioId: 0, precio: 0 };
    const modal = document.getElementById('pricing-modal');
    if (modal) modal.classList.add('show');
  }

  cerrarModal(): void {
    this.editando = false;
    this.nuevoPrecio = { canchaId: 0, horarioId: 0, precio: 0 };
    this.nuevoHorarioStr = '';
    const modal = document.getElementById('pricing-modal');
    if (modal) modal.classList.remove('show');
  }


  editarPrecio(precio: Precio): void {
    const horario = this.horarios.find(h => h.id === precio.horarioId);
    if (!horario) {
      alert('Horario no encontrado.');
      return;
    }

    this.editando = true;
    this.nuevoPrecio = { ...precio };
    this.nuevoHorarioStr = `${horario.horaInicio} - ${horario.horaFin}`;

    const modal = document.getElementById('pricing-modal');
    if (modal) modal.classList.add('show');
  }


  eliminarPrecio(precio: Precio): void {
    if (confirm('¿Seguro que deseas eliminar este precio?')) {
      this.precioService.delete(precio.canchaId, precio.horarioId, precio.id!).subscribe({
        next: () => this.cargarPrecios(),
        error: err => console.error('Error eliminando precio', err)
      });
    }
  }

 guardarPrecio(): void {
  if (!this.nuevoPrecio.canchaId || !this.nuevoPrecio.horarioId || !this.nuevoPrecio.precio) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }

  const dto: Precio = {
    canchaId: this.nuevoPrecio.canchaId,
    horarioId: this.nuevoPrecio.horarioId,
    precio: this.nuevoPrecio.precio,
    id: this.editando ? this.nuevoPrecio.id : undefined
  };

  const req = this.editando
    ? this.precioService.update(dto)
    : this.precioService.create(dto);

  req.subscribe({
    next: () => {
      this.cargarPrecios();
      this.cerrarModal();
    },
    error: err => console.error('Error al guardar precio', err)
  });
}


}


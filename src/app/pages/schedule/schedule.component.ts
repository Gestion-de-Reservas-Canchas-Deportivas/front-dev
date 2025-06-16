import { Component, OnInit } from '@angular/core';
import { Horario } from '../../models/horario.model';
import { TipoCancha } from '../../models/tipo-cancha.model';
import { HorarioService } from '../../services/horario.service';
import { TipoCanchaService } from '../../services/tipo-cancha.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  canchas: TipoCancha[] = [];
  horarios: Horario[] = [];
  horariosFiltrados: Horario[] = [];
  diasSemana = [
    { value: 'MONDAY', label: 'Lunes' },
    { value: 'TUESDAY', label: 'Martes' },
    { value: 'WEDNESDAY', label: 'Miércoles' },
    { value: 'THURSDAY', label: 'Jueves' },
    { value: 'FRIDAY', label: 'Viernes' },
    { value: 'SATURDAY', label: 'Sábado' },
    { value: 'SUNDAY', label: 'Domingo' }
  ];

  filtroCanchaId: number | null = null;
  filtroDiaSemana: string = '';

  editando = false;
  nuevoHorario: Horario = {
    id: 0,
    canchaId: 0,
    diaSemana: 'MONDAY',
    horaInicio: '',
    horaFin: ''
  };

  constructor(
    private horarioService: HorarioService,
    private tipoCanchaService: TipoCanchaService
  ) {}

  ngOnInit(): void {
    this.tipoCanchaService.getAll().subscribe(data => this.canchas = data);
    this.horarioService.getAll().subscribe(data => {
      this.horarios = data;
      this.horariosFiltrados = [...data];
    });
  }

  abrirModal(): void {
    this.editando = false;
    this.nuevoHorario = { id: 0, canchaId: 0, diaSemana: 'MONDAY', horaInicio: '', horaFin: '' };
    document.getElementById('schedule-modal')?.classList.add('show');
  }

  cerrarModal(): void {
    document.getElementById('schedule-modal')?.classList.remove('show');
  }

guardarHorario(): void {
  if (!this.nuevoHorario.canchaId || !this.nuevoHorario.diaSemana || !this.nuevoHorario.horaInicio || !this.nuevoHorario.horaFin) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  this.horarioService.create(this.nuevoHorario.canchaId, this.nuevoHorario).subscribe({
    next: (res) => {
      console.log('Horario creado:', res);
      this.horarios.push(res);
      this.filtrarHorarios();
      this.cerrarModal();
    },
    error: (err) => {
      console.error('Error al guardar horario:', err);
      alert('Ocurrió un error al guardar.');
    }
  });
}


  editarHorario(horario: Horario): void {
    this.editando = true;
    this.nuevoHorario = { ...horario };
    this.abrirModal();
  }

eliminarHorario(id: number): void {
  if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
    this.horarioService.eliminarHorario(id).subscribe({
      next: () => {
        this.horarios = this.horarios.filter(h => h.id !== id);
      },
      error: err => {
        console.error('Error eliminando horario:', err);
        alert('No se pudo eliminar el horario.');
      }
    });
  }
}


  getNombreCancha(canchaId: number): string {
    const cancha = this.canchas.find(c => c.id === canchaId);
    return cancha ? cancha.name : 'Desconocido';
  }

  traducirDia(dia: string): string {
    const encontrado = this.diasSemana.find(d => d.value === dia);
    return encontrado ? encontrado.label : dia;
  }

  filtrarHorarios(): void {
    this.horariosFiltrados = this.horarios.filter(h =>
      (!this.filtroCanchaId || h.canchaId === this.filtroCanchaId) &&
      (!this.filtroDiaSemana || h.diaSemana === this.filtroDiaSemana)
    );
  }

}

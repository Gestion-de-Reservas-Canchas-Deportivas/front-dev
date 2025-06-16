// reserva-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoCancha } from 'src/app/models/tipo-cancha.model';
import { HorarioService } from 'src/app/services/horario.service';
import { Horario } from 'src/app/models/horario.model';

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() tiposCanchas: TipoCancha[] = [];
  @Output() submitReserva = new EventEmitter<void>();

  horariosDisponibles: Horario[] = [];
  fechaSeleccionada: string = '';
  canchaSeleccionada: number = 0;

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.form.get('canchaId')?.valueChanges.subscribe((canchaId) => {
      this.canchaSeleccionada = canchaId;
      this.cargarHorarios();
    });

    this.form.get('fecha')?.valueChanges.subscribe((fecha) => {
      this.fechaSeleccionada = fecha;
      this.cargarHorarios();
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitReserva.emit();
    }
  }

  cargarHorarios(): void {
    if (this.canchaSeleccionada && this.fechaSeleccionada) {
      this.horarioService.getByCanchaId(this.canchaSeleccionada).subscribe({
        next: (horarios) => {
          this.horariosDisponibles = horarios;
        },
        error: (err) => {
          console.error('Error cargando horarios disponibles', err);
        }
      });
    }
  }
}

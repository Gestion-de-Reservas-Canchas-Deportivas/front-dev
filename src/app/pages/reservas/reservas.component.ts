import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reserva } from 'src/app/models/reserva.model';
import { TipoCancha } from 'src/app/models/tipo-cancha.model';
import { ReservaService } from 'src/app/services/reserva.service';
import { TipoCanchaService } from 'src/app/services/tipo-cancha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  selectedTab: 'nueva-reserva' | 'mis-reservas' = 'nueva-reserva';

  reservas: Reserva[] = [];
  tiposCanchas: TipoCancha[] = [];
  reservaForm!: FormGroup;

  mostrarModal: boolean = false;
  reservaSeleccionada: Reserva | null = null;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private tipoCanchaService: TipoCanchaService
  ) {}

  ngOnInit(): void {
    this.reservaForm = this.fb.group({
      canchaId: [null],
      fecha: [''],
      horaInicio: [''],
      horaFin: ['']
    });

    this.cargarTiposCanchas();
    this.cargarReservasActivas();
  }

  showTab(tab: 'nueva-reserva' | 'mis-reservas') {
    this.selectedTab = tab;
  }

  crearReserva(): void {
    if (this.reservaForm.valid) {
      const reserva: Reserva = {
        ...this.reservaForm.value,
        usuarioId: 1
      };

      this.reservaService.crearReserva(reserva).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Reserva creada correctamente', 'success');
          this.cargarReservasActivas();
          this.reservaForm.reset();
          this.showTab('mis-reservas');
        },
        error: err => {
          console.error('Error al crear reserva', err);
          Swal.fire('Error', err?.error?.message || 'No se pudo crear la reserva.', 'error');
        }
      });
    }
  }

  cargarTiposCanchas(): void {
    this.tipoCanchaService.getAll().subscribe({
      next: data => this.tiposCanchas = data,
      error: err => console.error('Error al cargar tipos de cancha', err)
    });
  }

  cargarReservasActivas(): void {
    const usuarioId = 1;
    this.reservaService.obtenerReservasActivas(usuarioId).subscribe({
      next: res => this.reservas = res,
      error: err => console.error('Error al obtener reservas', err)
    });
  }

  cancelarReserva(id: number | undefined): void {
    if (!id) return;
    this.reservaService.cancelarReserva(id).subscribe({
      next: resp => {
        Swal.fire('Cancelada', resp.mensaje, 'success');
        this.cargarReservasActivas();
      },
      error: err => {
        console.error('Error al cancelar reserva:', err);
        Swal.fire('Error', err?.error?.message || 'No se pudo cancelar la reserva.', 'error');
      }
    });
  }

  abrirModalModificar(reserva: Reserva): void {
    console.log('🟡 Abriendo modal para:', reserva);
    this.reservaSeleccionada = { ...reserva };
    this.mostrarModal = true;
  }

  confirmarModificacion(): void {
    if (!this.reservaSeleccionada) return;

    this.reservaService.actualizarReserva(this.reservaSeleccionada).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Reserva modificada correctamente', 'success');
        this.cargarReservasActivas();
        this.cerrarModal();
      },
      error: err => {
        console.error('Error al actualizar reserva:', err);
        Swal.fire('Error', err?.error?.message || 'No se pudo actualizar la reserva.', 'error');
      }
    });
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.reservaSeleccionada = null;
  }
}

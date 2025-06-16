import { Component, OnInit } from '@angular/core';
import { TipoCancha } from 'src/app/models/tipo-cancha.model';
import { TipoCanchaService } from 'src/app/services/tipo-cancha.service';

@Component({
  selector: 'app-court-types',
  templateUrl: './court-types.component.html',
  styleUrls: ['./court-types.component.css']

})
export class CourtTypesComponent implements OnInit {
  tiposCancha: TipoCancha[] = [];

  tipoActual: TipoCancha = {
    id: 0,
    name: '',
    description: '',
    activo: true
  };

  constructor(private tipoCanchaService: TipoCanchaService) { }

  ngOnInit(): void {
    this.cargarTipos();
  }

cargarTipos(): void {
  this.tipoCanchaService.getAll().subscribe({
    next: data => {
      console.log('🎯 datos recibidos', data); // 👈 Verifica si "activo" ya es booleano
      this.tiposCancha = data;
    },
    error: err => console.error('Error cargando tipos de cancha', err)
  });
}


abrirModal(tipo?: TipoCancha): void {
  const modal = document.getElementById('court-type-modal');
  if (modal) modal.classList.add('show');

  if (tipo) {
    this.tipoActual = { ...tipo };
  } else {
    this.tipoActual = {
      id: 0,
      name: '',
      description: '',
      activo: true
    };
  }
}


cerrarModal(): void {
  const modal = document.getElementById('court-type-modal');
  if (modal) modal.classList.remove('show');
}


  guardarTipo(): void {
    const isNuevo = this.tipoActual.id === 0;
    const request = isNuevo
      ? this.tipoCanchaService.create(this.tipoActual)
      : this.tipoCanchaService.update(this.tipoActual.id, this.tipoActual);

    request.subscribe({
      next: () => {
        this.cargarTipos();
        this.cerrarModal();
      },
      error: err => console.error('Error guardando tipo de cancha', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este tipo de cancha?')) {
      this.tipoCanchaService.delete(id).subscribe({
        next: () => this.cargarTipos(),
        error: err => console.error('Error eliminando tipo de cancha', err)
      });
    }
  }
}

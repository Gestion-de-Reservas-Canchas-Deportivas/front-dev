import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reserva } from 'src/app/models/reserva.model';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.css']
})
export class ReservaListComponent {
  @Input() reservas: Reserva[] = [];
  @Output() cancelar = new EventEmitter<number>();
  @Output() actualizar = new EventEmitter<Reserva>();
}

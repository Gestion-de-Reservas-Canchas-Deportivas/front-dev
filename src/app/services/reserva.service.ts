// services/reserva.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly API = 'http://localhost:8080/api/v1/reservas';

  constructor(private http: HttpClient) { }

  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.API}/crear`, reserva);
  }

  obtenerReservasActivas(usuarioId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.API}/activas/${usuarioId}`);
  }

actualizarReserva(reserva: Reserva): Observable<{ mensaje: string }> {
  return this.http.put<{ mensaje: string }>(`${this.API}/actualizar`, reserva);
}


cancelarReserva(id: number): Observable<{ mensaje: string }> {
  return this.http.put<{ mensaje: string }>(`${this.API}/cancelar/${id}`, {});
}

}

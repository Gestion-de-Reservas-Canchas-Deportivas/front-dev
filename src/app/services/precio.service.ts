import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Precio } from '../models/precio.model';
import { Horario } from '../models/horario.model';

@Injectable({ providedIn: 'root' })
export class PrecioService {
  private baseUrl = 'http://localhost:8080/api/v1/tipo-cancha';

  constructor(private http: HttpClient) {}

  getByCancha(canchaId: number): Observable<Precio[]> {
    return this.http.get<Precio[]>(`${this.baseUrl}/${canchaId}/horarios/all/precios`);
  }

  getByHorario(canchaId: number, horarioId: number): Observable<Precio[]> {
    return this.http.get<Precio[]>(`${this.baseUrl}/${canchaId}/horarios/${horarioId}/precios/franja`);
  }

  create(precio: Precio): Observable<Precio> {
    return this.http.post<Precio>(`${this.baseUrl}/${precio.canchaId}/horarios/${precio.horarioId}/precios`, precio);
  }

  update(precio: Precio): Observable<Precio> {
    return this.http.put<Precio>(
      `${this.baseUrl}/${precio.canchaId}/horarios/${precio.horarioId}/precios/${precio.id}`,
      precio
    );
  }

  delete(canchaId: number, horarioId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${canchaId}/horarios/${horarioId}/precios/${id}`);
  }

getAll(): Observable<Precio[]> {
  return this.http.get<Precio[]>('http://localhost:8080/api/v1/precios/all');
}

}

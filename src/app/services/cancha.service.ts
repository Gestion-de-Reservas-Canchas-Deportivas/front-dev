import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoCancha } from '../models/tipo-cancha.model';
import { Horario } from '../models/horario.model';
import { Precio } from '../models/precio.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CanchaService {
  private baseUrl = 'http://localhost:8080/api/v1/tipo-cancha';

  constructor(private http: HttpClient) {}

  getTiposCancha(): Observable<TipoCancha[]> {
    return this.http.get<TipoCancha[]>(`${this.baseUrl}/all`);
  }

  getHorarios(canchaId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/${canchaId}/horarios/all`);
  }

  getPrecios(canchaId: number, horarioId: number): Observable<Precio[]> {
    return this.http.get<Precio[]>(`${this.baseUrl}/${canchaId}/horarios/${horarioId}/precios`);
  }
}

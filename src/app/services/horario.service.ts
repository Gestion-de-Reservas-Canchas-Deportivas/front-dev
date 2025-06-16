import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario.model';

@Injectable({ providedIn: 'root' })
export class HorarioService {
  private baseUrl = 'http://localhost:8080/api/v1/tipo-cancha';

  constructor(private http: HttpClient) {}

  getByCanchaId(canchaId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/${canchaId}/horarios/all`);
  }

getAll(): Observable<Horario[]> {
  return this.http.get<Horario[]>('http://localhost:8080/api/v1/horarios/all');
}

create(canchaId: number, horario: Horario): Observable<Horario> {
  return this.http.post<Horario>(`http://localhost:8080/api/v1/tipo-cancha/${canchaId}/horarios`, horario);
}


eliminarHorario(id: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:8080/api/v1/horarios/${id}`);
}

}

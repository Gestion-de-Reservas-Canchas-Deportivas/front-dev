import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoCancha } from '../models/tipo-cancha.model';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class TipoCanchaService {
  private apiUrl = 'http://localhost:8080/api/v1/tipo-cancha';

  constructor(private http: HttpClient) {}

getAll(): Observable<TipoCancha[]> {
  return this.http.get<TipoCancha[]>(`${this.apiUrl}/all`).pipe(
    map(tipos =>
      tipos.map(tipo => ({
        ...tipo,
        activo: !!tipo.activo // convierte 0 o 1 a false o true
      }))
    )
  );
}

create(data: TipoCancha): Observable<TipoCancha> {
  const body = { ...data, activo: data.activo ? 1 : 0 };
  return this.http.post<TipoCancha>(`${this.apiUrl}/save`, body);
}

update(id: number, data: TipoCancha): Observable<TipoCancha> {
  const body = { ...data, activo: data.activo ? 1 : 0 };
  return this.http.put<TipoCancha>(`${this.apiUrl}/updateCancha/${id}`, body);
}


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteCanchaBy/${id}`);
  }

  getById(id: number): Observable<TipoCancha> {
    return this.http.get<TipoCancha>(`${this.apiUrl}/${id}`);
  }

    listar() {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
}

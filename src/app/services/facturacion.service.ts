import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturacionResponse } from '../models/facturacion.model';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  private readonly apiUrl = 'http://localhost:8080/api/v1/reportes/facturacion';

  constructor(private http: HttpClient) {}

  obtenerResumen(
    inicio: string,
    fin: string,
    tipoCanchaId?: number,
    usuarioId?: number
  ): Observable<FacturacionResponse> {
    let params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    if (tipoCanchaId) params = params.set('tipoCanchaId', tipoCanchaId);
    if (usuarioId) params = params.set('usuarioId', usuarioId);

    return this.http.get<FacturacionResponse>(this.apiUrl, { params });
  }
}

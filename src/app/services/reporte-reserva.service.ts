import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ReporteReserva {
  nombreCancha: string;
  tipoCancha: string;
  totalReservas: number;
  horasUtilizadas: number;
  porcentajeOcupacion: number;
}

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private baseUrl = 'http://localhost:8080/api/v1/reportes';

  constructor(private http: HttpClient) {}

  obtenerReporte(fechaInicio: string, fechaFin: string, tipoCanchaId?: number): Observable<ReporteReserva[]> {
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    if (tipoCanchaId !== undefined) {
      params = params.set('tipoCanchaId', tipoCanchaId.toString());
    }

    return this.http.get<ReporteReserva[]>(`${this.baseUrl}/uso-canchas`, { params });
  }

  exportarPdf(fechaInicio: string, fechaFin: string, tipoCanchaId?: number): Observable<Blob> {
  let params = new HttpParams()
    .set('fechaInicio', fechaInicio)
    .set('fechaFin', fechaFin);

  if (tipoCanchaId !== undefined) {
    params = params.set('tipoCanchaId', tipoCanchaId.toString());
  }

  return this.http.get(`${this.baseUrl}/uso-canchas/pdf`, {
    params,
    responseType: 'blob'
  });
}

exportarExcel(fechaInicio: string, fechaFin: string, tipoCanchaId?: number): Observable<Blob> {
  let params = new HttpParams()
    .set('fechaInicio', fechaInicio)
    .set('fechaFin', fechaFin);

  if (tipoCanchaId !== undefined) {
    params = params.set('tipoCanchaId', tipoCanchaId.toString());
  }

  return this.http.get(`${this.baseUrl}/uso-canchas/excel`, {
    params,
    responseType: 'blob'
  });
}

}

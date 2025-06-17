import { Component } from '@angular/core';
import { ReporteReserva } from 'src/app/models/reporte-reserva.model';
import { ReportesService } from 'src/app/services/reporte-reserva.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  fechaInicio: string = '';
  fechaFin: string = '';

  tipoCanchaId?: number;
  canchaId?: number;

  reporte: ReporteReserva[] = [];
  reporteReservas: ReporteReserva[] = [];

  constructor(private reportesService: ReportesService) { }

  generarReporte() {
    this.reportesService.obtenerReporte(this.fechaInicio, this.fechaFin, this.tipoCanchaId)
      .subscribe(data => {
        this.reporte = data;
        this.reporteReservas = data;
      });
  }

  exportarPdf() {
    this.reportesService.exportarPdf(this.fechaInicio, this.fechaFin, this.tipoCanchaId)
      .subscribe(blob => this.descargarArchivo(blob, 'reporte-uso-canchas.pdf'));
  }

  exportarExcel() {
    this.reportesService.exportarExcel(this.fechaInicio, this.fechaFin, this.tipoCanchaId)
      .subscribe(blob => this.descargarArchivo(blob, 'reporte-uso-canchas.xlsx'));
  }

  private descargarArchivo(blob: Blob, nombre: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

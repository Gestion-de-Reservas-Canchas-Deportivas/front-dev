import { Component, OnInit } from '@angular/core';
import { FacturacionService } from '../services/facturacion.service';
import { UsuarioService } from '../services/usuario.service';
import { TipoCanchaService } from '../services/tipo-cancha.service';
import { FacturacionDTO, FacturacionResponse } from '../models/facturacion.model';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']

})
export class FacturacionComponent implements OnInit {

  resumen: FacturacionDTO[] = [];
  totalFacturado = 0;

  tiposCanchas: any[] = [];
  usuarios: any[] = [];

  filtros = this.inicializarFiltros();

  constructor(
    private facturacionService: FacturacionService,
    private tipoCanchaService: TipoCanchaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.generarReporte();
  }

  private inicializarFiltros() {
    const hoy = new Date().toISOString().split('T')[0];
    return {
      fechaInicio: hoy,
      fechaFin: hoy,
      tipoCanchaId: null as number | null,
      usuarioId: null as number | null
    };
  }



  cargarUsuarios(): void {
    this.usuarioService.listar().subscribe((data: any[]) => {
      this.usuarios = data;
    });
  }

  generarReporte(): void {
    const { fechaInicio, fechaFin, tipoCanchaId, usuarioId } = this.filtros;

    this.facturacionService.obtenerResumen(
      fechaInicio,
      fechaFin,
      tipoCanchaId ?? undefined,
      usuarioId ?? undefined
    ).subscribe((resp: FacturacionResponse) => {
      this.resumen = resp.resumen;
      this.totalFacturado = resp.totalFacturado;
    });
  }

  limpiarFiltros(): void {
    this.filtros = this.inicializarFiltros();
    this.generarReporte();
  }

  calcularPromedioPorReserva(): number {
    return this.resumen.length
      ? this.totalFacturado / this.resumen.length
      : 0;
  }

  calcularIngresosDiariosProm(): number {
    if (!this.resumen.length) return 0;
    const diasUnicos = new Set(this.resumen.map(r => r.fecha));
    return this.totalFacturado / diasUnicos.size;
  }
}

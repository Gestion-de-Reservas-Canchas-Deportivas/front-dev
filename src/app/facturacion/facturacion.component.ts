import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarTipos();
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

  cargarTipos(): void {
    this.tipoCanchaService.listar().subscribe((data: any[]) => {
      console.log('Tipos Canchas:', data);
      this.tiposCanchas = data;
    });
  }

  generarReporte(): void {
    console.log('¡Ejecutando generarReporte()!');
    const {
      fechaInicio: inicio,
      fechaFin: fin,
      tipoCanchaId,
      usuarioId
    } = this.filtros;

    this.facturacionService.obtenerResumen(
      inicio,
      fin,
      tipoCanchaId ?? undefined,
      usuarioId ?? undefined
    ).subscribe({
      next: (resp: FacturacionResponse) => {
        console.log('Respuesta recibida:', resp);
        this.totalFacturado = resp.totalFacturado ?? 0;
        this.resumen = resp.resumen ?? [];

        console.log('Resumen actualizado:', this.resumen);
        this.cdr.detectChanges(); // Forzar renderizado manual
      },
      error: (err) => {
        console.error('Error al obtener resumen', err);
      }
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

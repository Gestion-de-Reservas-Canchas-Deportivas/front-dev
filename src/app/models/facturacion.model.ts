export interface FacturacionDTO {
  reservaId: number;
  usuarioId: number;
  tipoCancha: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  monto: number;
}

export interface FacturacionResponse {
  resumen: FacturacionDTO[];
  totalFacturado: number;
}

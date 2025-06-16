export interface Reserva {
  id?: number;
  usuarioId: number;
  canchaId: number;
  fecha: string;         // Formato: yyyy-MM-dd
  horaInicio: string;    // Formato: HH:mm:ss
  horaFin: string;       // Formato: HH:mm:ss
}

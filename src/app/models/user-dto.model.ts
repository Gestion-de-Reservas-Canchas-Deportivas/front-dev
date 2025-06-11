export interface UserDTO {
  /** Se asigna en el backend tras guardar */
  id?: number;

  /** Datos personales obligatorios */
  firstName: string;
  lastName?: string;

  /** Email de login/identificación */
  emailAddress: string;

  /** Teléfono, dirección y fecha de nacimiento opcionales */
  phone?: string;
  address?: string;
  /** En formato ISO (ej: '2025-06-11') */
  birthDate?: string;

  /**
   * El hash generado en el backend; normalmente no lo envías desde el front
   * y lo consideramos opcional
   */
  hashPassword?: string;

  /**
   * La contraseña en claro, que sólo envías al crear/actualizar
   */
  password?: string;
}

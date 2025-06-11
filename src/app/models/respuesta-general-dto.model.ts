import { HttpStatusCode } from "@angular/common/http";
import { AuthResponseDTO } from "./auth-response-dto.model";

export interface RespuestaGeneralDTO {
  status: HttpStatusCode;
  message: string;
  data: AuthResponseDTO | null;
}

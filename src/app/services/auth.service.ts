import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginUserDTO } from '../models/login-user-dto.model';
import { RespuestaGeneralDTO } from '../models/respuesta-general-dto.model';
import { UserDTO } from '../models/user-dto.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl; // ej. 'http://localhost:8080/api/v1'

  constructor(private http: HttpClient) { }

  login(payload: LoginUserDTO): Observable<RespuestaGeneralDTO> {
    return this.http.post<RespuestaGeneralDTO>(
      `${this.api}/public/login`,
      payload
    );
  }

  recoverPassword(email: string): Observable<RespuestaGeneralDTO> {
    return this.http.post<RespuestaGeneralDTO>(
      `${this.api}/public/forgot-password`,
      { emailAddress: email }
    );
  }

  register(payload: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(
      `${this.api}/users/saveUser`,
      payload
    );
  }
}

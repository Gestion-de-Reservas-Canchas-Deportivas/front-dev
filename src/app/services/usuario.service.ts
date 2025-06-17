import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  listar() {
    return of([{ id: 1, nombre: 'Usuario Admin' }]);
  }
}

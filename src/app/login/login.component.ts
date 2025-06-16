import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginUserDTO } from '../models/login-user-dto.model';
import { RespuestaGeneralDTO } from '../models/respuesta-general-dto.model';
import { AuthResponseDTO } from '../models/auth-response-dto.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const creds: LoginUserDTO = {
      emailAddress: this.form.value.emailAddress,
      password: this.form.value.password
    };

    this.auth.login(creds).subscribe({
      next: (res: RespuestaGeneralDTO) => {
        const token = (res.data as AuthResponseDTO)?.token;

        if (token) {
          // Limpia token anterior
          localStorage.removeItem('token');

          // Guarda nuevo token
          localStorage.setItem('token', token);

          // 🔍 Mostrar token y expiración en consola (opcional)
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expDate = new Date(payload.exp * 1000);
            console.log('📦 Nuevo token guardado:', token);
            console.log('⏳ Expira:', expDate.toLocaleString());
          } catch (e) {
            console.warn('⚠️ No se pudo decodificar el token');
          }

          // Redirigir
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = res.message;
        }
      },
      error: () => {
        this.errorMessage = 'Error al comunicar con el servidor';
      }
    });
  }
}

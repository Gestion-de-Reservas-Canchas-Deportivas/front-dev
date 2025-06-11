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
  styleUrls: ['./login.component.css']   // tu CSS scoped aquí
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

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
        // Si viene un token bajo res.data.token, lo guardamos
        const token = (res.data as AuthResponseDTO)?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/dashboard']);
        } else {
          // Si no vino token, mostramos el mensaje de error/back
          this.errorMessage = res.message;
        }
      },
      error: () => {
        this.errorMessage = 'Error al comunicar con el servidor';
      }
    });
  }
}


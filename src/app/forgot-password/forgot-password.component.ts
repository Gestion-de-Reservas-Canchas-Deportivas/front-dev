import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']  // si tienes CSS scoped
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const email = this.form.value.email;
    this.auth.recoverPassword(email).subscribe({
      next: () => this.message = 'Revisa tu correo para las instrucciones.',
      error: () => this.message = 'Error al enviar instrucciones.'
    });
  }
}

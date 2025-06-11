// src/app/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDTO } from '../models/user-dto.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  showPassword = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name:             ['', Validators.required],
      lastName:         [''],                                      // ← nuevo
      emailAddress:     ['', [Validators.required, Validators.email]],
      phone:            ['', Validators.required],
      address:          [''],                                      // ← nuevo
      birthDate:        [''],                                      // ← nuevo (tipo string ISO)
      password:         ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword:  ['', Validators.required],
      terms:            [false, Validators.requiredTrue]
    }, {
      validators: this.passwordsMatch
    });
  }

  passwordsMatch(c: AbstractControl): ValidationErrors | null {
    return c.get('password')?.value === c.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const payload: UserDTO = {
      firstName:    this.form.value.name,
      lastName:     this.form.value.lastName,       // ← mapeado
      emailAddress: this.form.value.emailAddress,
      phone:        this.form.value.phone,
      address:      this.form.value.address,        // ← mapeado
      birthDate:    this.form.value.birthDate ? this.form.value.birthDate : undefined,
      password:     this.form.value.password
    };

    this.auth.register(payload).subscribe({
      next: (user: UserDTO) => {
        this.message = `Usuario ${user.firstName} creado con ID ${user.id}`;
        this.router.navigate(['/']);
      },
      error: () => {
        this.message = 'Error al crear el usuario';
      }
    });
  }
}

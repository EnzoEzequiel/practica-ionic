import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterPage {
  registerForm: FormGroup;
  registerError: string = '';
  registerSuccess: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  async onRegister() {
    this.registerError = '';
    this.registerSuccess = false;
    if (this.registerForm.invalid) {
      console.log('Formulario inválido:', this.registerForm.value);
      return;
    }
    const { email, password } = this.registerForm.value;
    try {
      const result = await this.auth.signUp(email, password);
      console.log('Registro exitoso:', result);
      this.registerSuccess = true;
      this.registerForm.reset();
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      this.registerError = error.message || 'Error al registrar usuario';
    }
  }

  async onRegisterQuick(email: string, password: string) {
    this.registerError = '';
    this.registerSuccess = false;
    try {
      const result = await this.auth.signUp(email, password);
      console.log('Registro rápido exitoso:', result);
      this.registerSuccess = true;
      this.registerForm.reset();
    } catch (error: any) {
      console.error('Error en registro rápido:', error);
      this.registerError = error.message || 'Error al registrar usuario';
    }
  }
}

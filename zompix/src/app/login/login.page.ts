
import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string = '';
  loginSuccess: boolean = false;
  registerError: string = '';
  registerSuccess: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  async onSubmit() {
    this.loginError = '';
    this.loginSuccess = false;
    if (this.loginForm.invalid) {
      console.log('Formulario de login inválido:', this.loginForm.value);
      this.loginError = 'Completa todos los campos correctamente.';
      return;
    }
    const { email, password } = this.loginForm.value;
    try {
      const result = await this.auth.signIn(email, password);
      console.log('Login exitoso:', result);
      this.loginSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
      }, 1000);
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      if (error?.message?.toLowerCase().includes('invalid login credentials')) {
        this.loginError = 'Credenciales inválidas. Verifica tu email y contraseña.';
      } else {
        this.loginError = error.message || 'Error al iniciar sesión.';
      }
    }
  }

  async onRegisterFromLogin() {
    this.registerError = '';
    this.registerSuccess = false;
    if (this.loginForm.invalid) {
      this.registerError = 'Completa todos los campos correctamente.';
      return;
    }
    const { email, password } = this.loginForm.value;
    try {
      const result = await this.auth.signUp(email, password);
      console.log('Registro desde login exitoso:', result);
      this.registerSuccess = true;
      this.loginForm.reset();
    } catch (error: any) {
      console.error('Error al registrar usuario desde login:', error);
      this.registerError = error.message || 'Error al registrar usuario';
    }
  }
}

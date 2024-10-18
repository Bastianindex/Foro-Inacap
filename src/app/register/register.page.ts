/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  passwordMismatch = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async register() {
    // Reiniciar el error de desajuste de contraseña
    this.passwordMismatch = false;

    // Verificar si algún campo está vacío
    if (!this.user.email || !this.user.password || !this.user.confirmPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verificar si el correo electrónico es válido
    if (!this.isValidEmail(this.user.email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Verificar si las contraseñas coinciden
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    try {
      // Registrar usuario con Firebase
      await this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      // Si el registro es exitoso, redirigir a home
      this.router.navigate(['/home']);
    } catch (error: any) {
      alert('Error al registrar el usuario: ' + error.message);
    }
  }
}
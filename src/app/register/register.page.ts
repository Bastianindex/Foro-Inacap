/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  constructor(private navCtrl: NavController) {}

  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
      // Lógica para registrar al usuario
      console.log('Usuario registrado:', this.user);
      // Redirigir al usuario a otra página si es necesario
      this.navCtrl.navigateForward('/home');
    }
  }
}
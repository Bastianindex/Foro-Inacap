import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    email: '',
    password: '',
    rememberMe: false
  };

  constructor(private router: Router) {}

  login() {
    if (this.user.rememberMe) {
      localStorage.setItem('userEmail', this.user.email);
      localStorage.setItem('userPassword', this.user.password);
    } else {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPassword');
    }

    // Aquí puedes agregar la lógica para autenticar al usuario
    console.log('Iniciar sesión', this.user);
    this.router.navigate(['/home']); // Redirigir a la página de inicio
  }

  ionViewWillEnter() {
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');
    if (savedEmail && savedPassword) {
      this.user.email = savedEmail;
      this.user.password = savedPassword;
      this.user.rememberMe = true;
    }
  }
}
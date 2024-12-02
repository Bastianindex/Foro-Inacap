import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  // Define el objeto usuario con propiedades para el correo electrónico y la contraseña
  user = {
    email: '',
    password: ''
  };

  // Inyecta los servicios necesarios en el constructor
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  // Método para iniciar sesión de manera asíncrona
  async login() {
    try {
      // Intenta iniciar sesión con el correo electrónico y la contraseña del usuario
      await this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
      // Si la sesión se inicia correctamente, redirige al usuario a la ruta '/home'
      this.router.navigate(['/home']);
    } catch (error) {
      // Si ocurre un error al intentar iniciar sesión, muestra el error en la consola y alerta al usuario
      console.error('Error al iniciar sesión', error);
      this.showError('Error al iniciar sesión');
    }
  }

  // Método privado para mostrar un mensaje de error al usuario
  private showError(message: string) {
    alert(message);
  }
}

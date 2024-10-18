import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
      console.log('Iniciar sesión', userCredential);
      this.router.navigate(['/home']); // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      let errorMessage = 'Error desconocido al iniciar sesión';
      
      // Asegurarse de que error es de tipo FirebaseError
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'El correo electrónico no es válido.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'El usuario está deshabilitado.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'El usuario no fue encontrado.';
            break;
          // Agrega más casos según sea necesario
        }
      }
      
      // Mostrar el mensaje de error al usuario
      this.showError(errorMessage);
    }
  }

  private showError(message: string) {
    alert(message);
  }
}
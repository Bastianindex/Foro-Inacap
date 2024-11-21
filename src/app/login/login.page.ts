import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
      await this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      this.showError('Error al iniciar sesión');
    }
  }

  private showError(message: string) {
    alert(message);
  }
}

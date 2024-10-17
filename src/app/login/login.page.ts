import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: User = {
    email: '',
    password: ''
  };

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async login() {
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere por Favor"
      });
      await loader.present();

      try {
        const data = await this.afAuth.signInWithEmailAndPassword(this.user.email, this.user.password);
        console.log(data);
        await loader.dismiss();
        this.navCtrl.navigateRoot("home"); // Redirigir a la página principal
      } catch (error: any) {
        await loader.dismiss();
        console.error(error);
        let errorMessage = 'Error al iniciar sesión';
        if (error.code) {
          switch (error.code) {
            case 'auth/user-not-found':
              errorMessage = 'Usuario no encontrado';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Contraseña incorrecta';
              break;
            case 'auth/invalid-email':
              errorMessage = 'El correo electrónico no es válido';
              break;
          }
        }
        const toast = await this.toastCtrl.create({
          message: errorMessage,
          duration: 2000
        });
        toast.present();
      }
    }
  }

  formValidation() {
    // Implementa la validación del formulario aquí
    return true;
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('register');
  }
}
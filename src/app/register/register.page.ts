/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
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

  async register() { // Método register
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere por Favor"
      });
      await loader.present();

      try {
        const data = await this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
        console.log(data);
        await loader.dismiss();
        this.navCtrl.navigateRoot("login"); // Redirigir a la página de inicio de sesión
      } catch (error: any) {
        await loader.dismiss();
        console.error(error);
        let errorMessage = 'Error al registrar usuario';
        if (error.code) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'El correo electrónico ya está en uso';
              break;
            case 'auth/invalid-email':
              errorMessage = 'El correo electrónico no es válido';
              break;
            case 'auth/weak-password':
              errorMessage = 'La contraseña es demasiado débil';
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
}
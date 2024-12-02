import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Esta clase es un servicio que se encarga de la autenticación de usuarios en la aplicación.
@Injectable({
  providedIn: 'root' // Esto indica que el servicio está disponible en toda la aplicación.
})
export class AuthService {
  // El constructor inyecta AngularFireAuth, que es un servicio de Firebase para la autenticación.
  constructor(private afAuth: AngularFireAuth) {}

  // Este método permite a los usuarios iniciar sesión en la aplicación.
  async login(email: string, password: string) {
    // Utiliza el método signInWithEmailAndPassword de AngularFireAuth para iniciar sesión.
    // Este método devuelve una promesa que se resuelve cuando la autenticación es exitosa.
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }
}

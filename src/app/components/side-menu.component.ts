import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnDestroy {
  // Inicializa el nombre de usuario como 'Usuario'
  username: string = 'Usuario';
  // Variable para almacenar la suscripción al estado de autenticación
  private authSubscription: Subscription;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    // Suscribe al estado de autenticación para escuchar cambios en el usuario autenticado
    this.authSubscription = this.afAuth.authState.subscribe(user => {
      // Si hay un usuario autenticado, actualiza el nombre de usuario
      if (user) {
        this.username = user.displayName || 'Usuario';
      }
    });
  }

  // Método para limpiar la suscripción al estado de autenticación cuando el componente se destruye
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // Método asincrónico para cerrar sesión
  async logout() {
    // Cierra la sesión del usuario
    await this.afAuth.signOut();
    // Redirige al usuario a la página de login después de cerrar sesión
    this.router.navigate(['/login']);
  }
}

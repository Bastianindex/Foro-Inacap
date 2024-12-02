import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Esta clase se encarga de proteger las rutas de la aplicación, asegurándose de que solo los usuarios autenticados puedan acceder a ellas.
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // El constructor inyecta los servicios necesarios para la autenticación y el routing.
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Este método es llamado por el router para determinar si una ruta puede ser activada.
  canActivate(): Observable<boolean> {
    // Se suscribe al estado de autenticación del usuario, tomando solo el primer valor emitido.
    return this.afAuth.authState.pipe(
      take(1),
      // Se mapea el estado del usuario a un booleano que indica si está autenticado.
      map(user => {
        // Si el usuario está autenticado, se permite el acceso a la ruta.
        if (user) {
          return true;
        } else {
          // Si el usuario no está autenticado, se redirige a la página de login y se deniega el acceso a la ruta.
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

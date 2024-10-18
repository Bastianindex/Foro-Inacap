import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar el almacenamiento local, etc.
    console.log('Cerrar sesión');
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}

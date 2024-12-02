import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir el módulo
import { Routes, RouterModule } from '@angular/router'; // Importa los módulos necesarios para definir las rutas

import { LoginPage } from './login.page'; // Importa la página de inicio de sesión para ser utilizada en las rutas

// Define las rutas para el módulo de inicio de sesión
const routes: Routes = [
  {
    path: '', // Ruta raíz del módulo
    component: LoginPage // Componente asociado a la ruta raíz
  }
];

// Define el módulo de rutas para la página de inicio de sesión
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa las rutas definidas para este módulo
  exports: [RouterModule], // Exporta el módulo RouterModule para que sea disponible en otros módulos
})
export class LoginPageRoutingModule {}

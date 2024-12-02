import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { RouterModule, Routes } from '@angular/router'; // Importa los módulos necesarios para definir las rutas de la aplicación

import { CommentsPage } from './comments.page'; // Importa la página de comentarios para asociarla a una ruta

// Define las rutas de la aplicación
const routes: Routes = [
  {
    path: ':postId', // Define una ruta que acepta un parámetro 'postId'
    component: CommentsPage // Asocia la página de comentarios a esta ruta
  }
];

// Define el módulo de rutas para la página de comentarios
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa las rutas definidas para este módulo
  exports: [RouterModule], // Exporta el módulo de rutas para que sea accesible desde otros módulos
})
export class CommentsPageRoutingModule {}

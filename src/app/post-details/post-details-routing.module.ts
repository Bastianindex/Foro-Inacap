import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular.
import { Routes, RouterModule } from '@angular/router'; // Importa los módulos necesarios para definir las rutas de la aplicación.

import { PostDetailsPage } from './post-details.page'; // Importa la página de detalles del post para asociarla a una ruta.

// Define las rutas de la aplicación. En este caso, solo hay una ruta que apunta a la página de detalles del post.
const routes: Routes = [
  {
    path: '', // La ruta raíz.
    component: PostDetailsPage // El componente asociado a esta ruta.
  }
];

// Define el módulo de rutas para la página de detalles del post.
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa las rutas definidas para este módulo.
  exports: [RouterModule], // Exporta el módulo de rutas para que pueda ser utilizado en otros módulos.
})
export class PostDetailsPageRoutingModule {}

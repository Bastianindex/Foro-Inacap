import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { Routes, RouterModule } from '@angular/router'; // Importa los módulos necesarios para definir las rutas de la aplicación

import { AddPostPage } from './add-post.page'; // Importa la página de agregar post para asociarla a una ruta

// Define las rutas de la aplicación
const routes: Routes = [
  {
    path: '', // Define una ruta vacía que se refiere a la raíz de este módulo
    component: AddPostPage // Asocia la página de agregar post a esta ruta
  }
];

// Define el módulo de rutas para la página de agregar post
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa las rutas definidas para este módulo
  exports: [RouterModule], // Exporta el módulo de rutas para que sea accesible desde otros módulos
})
export class AddPostPageRoutingModule {}

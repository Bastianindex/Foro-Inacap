import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { CommonModule } from '@angular/common'; // Importa el módulo común de Angular para usar sus directivas y pipes
import { AddPostPage } from './add-post.page'; // Importa la página de agregar post para asociarla a este módulo
import { AddPostPageRoutingModule } from './add-post-routing.module'; // Importa el módulo de rutas de la página de agregar post

// Define el módulo de la página de agregar post
@NgModule({
  imports: [ // Importa los módulos necesarios para este módulo
    CommonModule, // Importa el módulo común de Angular
    AddPostPageRoutingModule // Importa el módulo de rutas de la página de agregar post
  ],
  declarations: [AddPostPage] // Define las declaraciones de este módulo, que incluyen la página de agregar post
})
export class AddPostPageModule {} // Exporta el módulo de la página de agregar post

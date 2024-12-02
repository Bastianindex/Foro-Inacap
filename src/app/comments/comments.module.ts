import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { CommonModule } from '@angular/common'; // Importa el módulo común de Angular para usar sus directivas y pipes
import { FormsModule } from '@angular/forms'; // Importa el módulo de formularios de Angular para usar formularios

import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic para usar componentes de Ionic

import { CommentsPageRoutingModule } from './comments-routing.module'; // Importa el módulo de rutas de la página de comentarios

import { CommentsPage } from './comments.page'; // Importa la página de comentarios para asociarla a este módulo

// Define el módulo de la página de comentarios
@NgModule({
  imports: [ // Importa los módulos necesarios para este módulo
    CommonModule, // Importa el módulo común de Angular
    FormsModule, // Importa el módulo de formularios de Angular
    IonicModule, // Importa el módulo de Ionic
    CommentsPageRoutingModule // Importa el módulo de rutas de la página de comentarios
  ],
  declarations: [CommentsPage] // Define las declaraciones de este módulo, que incluyen la página de comentarios
})
export class CommentsPageModule {} // Exporta el módulo de la página de comentarios

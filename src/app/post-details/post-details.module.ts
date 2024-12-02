// Este módulo define la página de detalles de un post en la aplicación.
// Importa los módulos y componentes necesarios, define las rutas y exporta el módulo.
import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular.
import { CommonModule } from '@angular/common'; // Importa el módulo común de Angular.
import { FormsModule } from '@angular/forms'; // Importa el módulo de formularios de Angular.
import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic para la interfaz de usuario.
import { PostDetailsPageRoutingModule } from './post-details-routing.module'; // Importa el módulo de rutas de la página de detalles del post.
import { PostDetailsPage } from './post-details.page'; // Importa la página de detalles del post.

// Define el módulo de la página de detalles del post.
@NgModule({
  imports: [
    CommonModule, // Importa el módulo común de Angular.
    FormsModule, // Importa el módulo de formularios de Angular.
    IonicModule, // Importa el módulo de Ionic para la interfaz de usuario.
    PostDetailsPageRoutingModule // Importa el módulo de rutas de la página de detalles del post.
  ],
  declarations: [PostDetailsPage] // Define las declaraciones del módulo, en este caso, solo la página de detalles del post.
})
export class PostDetailsPageModule {} // Exporta el módulo de la página de detalles del post.

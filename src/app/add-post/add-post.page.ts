import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage {
  // Inicializa un nuevo post con campos vacíos
  newPost: Post = {
    title: '',
    content: '',
    detail: '',
    userId: '',
    username: '',
    timestamp: 0
  };
  // Inicializa un mensaje de error vacío
  errorMessage: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  // Método asincrónico para agregar un nuevo post
  async addPost() {
    // Limpia el mensaje de error antes de intentar agregar el post
    this.errorMessage = '';

    // Verifica si el post es válido (título y contenido no vacíos)
    if (this.validatePost()) {
      // Intenta obtener el usuario actual
      const user = await this.afAuth.currentUser;
      // Si hay un usuario autenticado
      if (user) {
        // Asigna el id y el nombre del usuario al nuevo post
        this.newPost.userId = user.uid;
        this.newPost.username = user.displayName || user.email || 'Usuario anónimo';
        // Asigna la marca de tiempo actual al nuevo post
        this.newPost.timestamp = Date.now();

        // Intenta agregar el post al servicio de posts
        try {
          await this.postService.addPost(this.newPost);
          console.log('Post agregado con éxito');
          // Redirige al usuario a la página de inicio después de agregar el post
          this.router.navigate(['/home']);
        } catch (error) {
          console.error('Error al agregar post:', error);
          // Si falla al agregar el post, muestra un mensaje de error
          this.errorMessage = 'Ocurrió un error al agregar el post. Inténtalo de nuevo más tarde.';
        }
      } else {
        console.error('Usuario no autenticado');
        // Si no hay un usuario autenticado, muestra un mensaje de error
        this.errorMessage = 'Debes estar autenticado para agregar un post.';
      }
    }
  }

  // Método para validar si el post es válido (título y contenido no vacíos)
  validatePost(): boolean {
    return this.newPost.title.trim() !== '' && this.newPost.content.trim() !== '';
  }
}

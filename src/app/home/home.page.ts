import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts: Post[] = [];
  newPostContent: string = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.loadPosts(); // Carga los posts al iniciar el componente
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts; // Asigna los posts cargados a la propiedad posts
      },
      error => {
        console.error('Error al cargar posts:', error); // Muestra un error en la consola si falla la carga de posts
      }
    );
  }

  goToPostDetails(postId: string | undefined) {
    if (postId) {
      this.router.navigate(['/post-details', postId]); // Navega a la página de detalles del post si el ID es válido
    } else {
      console.error('ID de post no válido'); // Muestra un error en la consola si el ID de post es inválido
    }
  }

  async addPost() {
    if (this.newPostContent.trim() !== '') {
      const user = await this.afAuth.currentUser; // Obtiene el usuario actual
      if (user) {
        const newPost: Post = {
          title: 'Nuevo Post',
          content: this.newPostContent,
          detail: '',
          userId: user.uid,
          username: user.displayName || user.email || 'Usuario anónimo',
          timestamp: Date.now()
        };
        this.postService.addPost(newPost).then(() => {
          console.log('Post agregado con éxito'); // Muestra un mensaje de éxito en la consola
          this.newPostContent = ''; // Limpia el contenido del nuevo post
          this.loadPosts(); // Vuelve a cargar los posts para incluir el nuevo
        }).catch(error => {
          console.error('Error al agregar post:', error); // Muestra un error en la consola si falla la adición del post
        });
      } else {
        console.error('Usuario no autenticado'); // Muestra un error en la consola si el usuario no está autenticado
      }
    }
  }
}

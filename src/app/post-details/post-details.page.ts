import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  // Variable para almacenar el post actual, inicialmente nula
  post: Post | null = null;
  // Array para almacenar los comentarios del post
  comments: Comment[] = [];
  // Texto del nuevo comentario a agregar
  newCommentText: string = '';
  // Identificador del post actual
  postId: string = '';
  isEditing: boolean = false; // Variable para controlar el modo de edición

  // Constructor de la clase, inyecta los servicios necesarios
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
    private afAuth: AngularFireAuth
  ) {}

  // Método que se ejecuta al inicializar la página
  ngOnInit() {
    // Obtener el identificador del post de la ruta
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      // Asignar el identificador del post a la variable postId
      this.postId = postId;
      // Cargar el post correspondiente al identificador
      this.loadPost(postId);
      // Cargar los comentarios del post correspondiente al identificador
      this.loadComments(postId);
    } else {
      // Mostrar error si el identificador del post no es válido
      console.error('ID de post no válido');
    }
  }

  // Método para cargar un post por su identificador
  loadPost(postId: string) {
    // Llamada al servicio de posts para obtener el post
    this.postService.getPost(postId).subscribe(
      (post: Post | null) => {
        // Asignar el post obtenido a la variable post
        this.post = post;
      },
      error => {
        // Mostrar error si falla la carga del post
        console.error('Error al cargar el post:', error);
      }
    );
  }

  // Método para cargar los comentarios de un post por su identificador
  loadComments(postId: string) {
    // Mostrar mensaje de carga de comentarios
    console.log('Cargando comentarios para el post ID:', postId);
    // Llamada al servicio de comentarios para obtener los comentarios
    this.commentService.getComments(postId).subscribe(
      (comments: Comment[]) => {
        // Asignar los comentarios obtenidos al array comments
        this.comments = comments;
      },
      error => {
        // Mostrar error si falla la carga de comentarios
        console.error('Error al cargar comentarios:', error);
      }
    );
  }

  // Método para agregar un nuevo comentario
  async addComment() {
    // Verificar si el identificador del post está definido
    if (!this.postId) {
      // Mostrar error si el identificador del post no está definido
      console.error('El post ID no está definido');
      return;
    }
    // Verificar si el post existe y el texto del comentario no está vacío
    if (this.post && this.newCommentText.trim() !== '') {
      // Obtener el usuario actual
      const user = await this.afAuth.currentUser;
      if (user) {
        // Crear un nuevo comentario con los datos del usuario y el texto del comentario
        const comment: Comment = {
          id: '',
          userId: user.uid,
          username: user.displayName || user.email || 'Usuario anónimo',
          profilePicture: user.photoURL || 'assets/default-avatar.png',
          text: this.newCommentText,
          timestamp: Date.now(),
          upvotes: 0,
          downvotes: 0
        };
        
        // Llamada al servicio de comentarios para agregar el nuevo comentario
        this.commentService.addComment(this.post.id || '', comment).then(() => {
          // Limpiar el texto del comentario después de agregarlo
          this.newCommentText = '';
          // Recargar los comentarios después de agregar uno nuevo
          this.loadComments(this.post?.id || '');
        }).catch(error => {
          // Mostrar error si falla la adición del comentario
          console.error('Error al agregar comentario:', error);
        });
      } else {
        // Mostrar error si el usuario no está autenticado
        console.error('Usuario no autenticado');
      }
    }
  }

  async updatePost(updatedData: Partial<Post>) {
    if (!this.postId) {
      console.error('El post ID no está definido');
      return;
    }
    const user = await this.afAuth.currentUser;
    if (user && this.post?.userId === user.uid) {
      try {
        await this.postService.updatePost(this.postId, updatedData);
        console.log('Post actualizado con éxito');
        this.loadPost(this.postId); // Recargar el post después de la actualización
      } catch (error) {
        console.error('Error al actualizar el post:', error);
      }
    } else {
      console.error('No tienes permiso para actualizar este post');
    }
  }

  async deletePost() {
    if (!this.postId) {
      console.error('El post ID no está definido');
      return;
    }
    const user = await this.afAuth.currentUser;
    if (user && this.post?.userId === user.uid) {
      try {
        await this.postService.deletePost(this.postId);
        console.log('Post eliminado con éxito');
        this.router.navigate(['/home']); // Redirigir a la página de inicio después de eliminar
      } catch (error) {
        console.error('Error al eliminar el post:', error);
      }
    } else {
      console.error('No tienes permiso para eliminar este post');
    }
  }

  enableEdit() {
    this.isEditing = true;
  }

  async saveEdit() {
    if (!this.postId) {
      console.error('El post ID no está definido');
      return;
    }
    const user = await this.afAuth.currentUser;
    if (user && this.post?.userId === user.uid) {
      try {
        await this.postService.updatePost(this.postId, { content: this.post.content, detail: this.post.detail });
        console.log('Post actualizado con éxito');
        this.isEditing = false; // Salir del modo de edición
        this.loadPost(this.postId); // Recargar el post después de la actualización
      } catch (error) {
        console.error('Error al actualizar el post:', error);
      }
    } else {
      console.error('No tienes permiso para actualizar este post');
    }
  }
}

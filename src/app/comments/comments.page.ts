import { Component, OnInit } from '@angular/core'; // Importa el decorador Component y OnInit de Angular
import { ActivatedRoute, Router } from '@angular/router'; // Importa los módulos de rutas de Angular
import { CommentService } from '../services/comment.service'; // Importa el servicio de comentarios
import { Comment } from '../models/comment.model'; // Importa el modelo de comentario
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa el módulo de autenticación de Firebase

@Component({ // Define el componente CommentsPage
  selector: 'app-comments', // Define el selector del componente
  templateUrl: './comments.page.html', // Define la plantilla HTML del componente
  styleUrls: ['./comments.page.scss'], // Define los estilos del componente
})
export class CommentsPage implements OnInit { // Define la clase CommentsPage e implementa la interfaz OnInit
  comments: Comment[] = []; // Inicializa la lista de comentarios como un array vacío
  newCommentText: string = ''; // Inicializa el texto del nuevo comentario como una cadena vacía
  postId: string = ''; // Inicializa el ID del post como una cadena vacía
  errorMessage: string = ''; // Inicializa el mensaje de error como una cadena vacía

  constructor( // Define el constructor del componente
    private route: ActivatedRoute, // Inyecta el módulo de rutas de Angular
    private router: Router, // Inyecta el módulo de rutas de Angular
    private commentService: CommentService, // Inyecta el servicio de comentarios
    private afAuth: AngularFireAuth // Inyecta el módulo de autenticación de Firebase
  ) {}

  ngOnInit() { // Método que se ejecuta cuando el componente se inicializa
    this.route.paramMap.subscribe(params => { // Suscribe el componente a los cambios en los parámetros de la URL
      this.postId = params.get('postId') || ''; // Obtiene el ID del post de los parámetros de la URL
      this.loadComments(); // Carga los comentarios del post
    });
  }

  loadComments() { // Método para cargar los comentarios del post
    if (this.postId) { // Verifica si hay un ID de post
      this.commentService.getComments(this.postId).subscribe( // Obtiene los comentarios del post a través del servicio de comentarios
        (comments: Comment[]) => { // Maneja la respuesta exitosa del servicio
          console.log('Comentarios cargados:', comments); // Registra los comentarios cargados en la consola
          this.comments = comments; // Asigna los comentarios cargados a la lista de comentarios
        },
        error => { // Maneja el error del servicio
          console.error('Error al cargar comentarios:', error); // Registra el error en la consola
          this.errorMessage = 'Error al cargar comentarios'; // Asigna un mensaje de error
        }
      );
    }
  }

  async addComment() { // Método asincrónico para agregar un nuevo comentario
    if (this.newCommentText.trim() === '') { // Verifica si el texto del nuevo comentario está vacío
      console.log('El comentario no puede estar vacío'); // Registra un mensaje en la consola
      return; // Sale del método
    }

    const user = await this.afAuth.currentUser; // Obtiene el usuario actual
    if (!user) { // Verifica si hay un usuario autenticado
      console.error('Usuario no autenticado'); // Registra un mensaje de error en la consola
      return; // Sale del método
    }

    console.log('Usuario actual:', user.uid); // Registra el ID del usuario actual en la consola

    const comment: Comment = {
      id: '', // El id será asignado por el servicio
      userId: user.uid,
      username: user.displayName || user.email || 'Usuario anónimo',
      profilePicture: user.photoURL || 'assets/default-avatar.png',
      text: this.newCommentText,
      timestamp: Date.now(),
      upvotes: 0,
      downvotes: 0
    };
    
    this.commentService.addComment(this.postId, comment).then(() => { // Agrega el comentario al servicio de comentarios
      console.log('Comentario agregado con éxito'); // Registra un mensaje en la consola
      this.newCommentText = ''; // Limpia el texto del nuevo comentario
      this.loadComments(); // Vuelve a cargar los comentarios
    }).catch(error => { // Maneja el error al agregar el comentario
      console.error('Error al agregar comentario:', error); // Registra un mensaje de error en la consola
    });
  }

  loadMoreComments(event: any) { // Método para cargar más comentarios
    // Lógica para cargar más comentarios
    event.target.complete(); // Marca el evento como completado
  }

  // Método para actualizar un comentario
  async updateComment(commentId: string, updatedData: Partial<Comment>) {
    if (!this.postId) {
      console.error('El post ID no está definido');
      return;
    }
    try {
      await this.commentService.updateComment(this.postId, commentId, updatedData);
      console.log('Comentario actualizado con éxito');
      this.loadComments(); // Recargar los comentarios después de la actualización
    } catch (error) {
      console.error('Error al actualizar el comentario:', error);
    }
  }

  // Método para eliminar un comentario
  async deleteComment(commentId: string) {
    if (!this.postId) {
      console.error('El post ID no está definido');
      return;
    }
    try {
      await this.commentService.deleteComment(this.postId, commentId);
      console.log('Comentario eliminado con éxito');
      this.loadComments(); // Recargar los comentarios después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
    }
  }

  enableEdit(comment: Comment) {
    comment.isEditing = true;
    comment.newText = comment.text;
  }
}

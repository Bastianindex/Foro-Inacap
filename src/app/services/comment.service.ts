import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from '../models/comment.model';

// Esta clase es un servicio que se encarga de manejar los comentarios en la aplicación.
@Injectable({
  providedIn: 'root' // Esto indica que el servicio está disponible en toda la aplicación.
})
export class CommentService {
  constructor(private firestore: AngularFirestore) {}

  // Este método obtiene los comentarios de un post específico, ordenados por timestamp y limitados por un número específico.
  // También permite especificar un comentario después del cual comenzar a obtener los comentarios.
  getComments(postId: string, startAfter?: string, limit: number = 10): Observable<Comment[]> {
    let query = this.firestore.collection<Comment>(`posts/${postId}/comments`, ref => {
        let queryRef = ref.orderBy('timestamp').limit(limit);
        if (startAfter) {
            queryRef = queryRef.startAfter(startAfter);
        }
        return queryRef;
    });
    return query.valueChanges();
  }

  // Este método agrega un nuevo comentario a un post específico.
  addComment(postId: string, comment: Comment): Promise<void> {
    return this.firestore.collection(`posts/${postId}/comments`).add(comment).then(() => {
      console.log('Comentario agregado con éxito');
    }).catch((error) => {
      console.error('Error al agregar comentario: ', error);
      throw new Error('Error al agregar comentario');
    });
  }

  // Este método actualiza un comentario específico de un post.
  updateComment(postId: string, commentId: string, comment: Partial<Comment>) {
    return this.firestore.doc(`posts/${postId}/comments/${commentId}`).update(comment).catch(error => {
      console.error('Error al actualizar el comentario:', error);
      throw new Error('Error al actualizar el comentario');
    });
  }

  // Este método elimina un comentario específico de un post.
  deleteComment(postId: string, commentId: string) {
    return this.firestore.doc(`posts/${postId}/comments/${commentId}`).delete().catch(error => {
      console.error('Error al eliminar el comentario:', error);
      throw new Error('Error al eliminar el comentario');
    });
  }
}

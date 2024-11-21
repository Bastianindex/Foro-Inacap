import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private firestore: AngularFirestore) {}

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

  addComment(postId: string, comment: Comment): Promise<void> {
    return this.firestore.collection(`posts/${postId}/comments`).add(comment).then(() => {
      console.log('Comentario agregado con éxito');
    }).catch((error) => {
      console.error('Error al agregar comentario: ', error);
      throw new Error('Error al agregar comentario');
    });
  }
}

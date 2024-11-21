import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private firestore: AngularFirestore) {}

  getPosts(): Observable<Post[]> {
    return this.firestore.collection<Post>('posts').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { ...data, id };
      })),
      catchError(error => {
        console.error('Error al cargar posts:', error);
        return throwError(() => new Error('Error al cargar posts'));
      })
    );
  }

  getPost(id: string): Observable<Post | null> {
    return this.firestore.doc<Post>(`posts/${id}`).valueChanges().pipe(
      map(post => post ? { ...post, id } : null),
      catchError(error => {
        console.error('Error al cargar el post:', error);
        return throwError(() => new Error('Error al cargar el post'));
      })
    );
  }

  addPost(post: Post): Promise<void> {
    return this.firestore.collection('posts').add(post).then(() => {
      console.log('Post added successfully');
    }).catch((error) => {
      console.error('Error adding post: ', error);
      throw new Error('Error al agregar post');
    });
  }

  updatePost(id: string, post: Partial<Post>) {
    return this.firestore.doc(`posts/${id}`).update(post).catch(error => {
      console.error('Error al actualizar el post:', error);
      throw new Error('Error al actualizar el post');
    });
  }

  deletePost(id: string) {
    return this.firestore.doc(`posts/${id}`).delete().catch(error => {
      console.error('Error al eliminar el post:', error);
      throw new Error('Error al eliminar el post');
    });
  }
}

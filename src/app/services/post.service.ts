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

  // Obtiene todos los posts de la colección 'posts'
  getPosts(): Observable<Post[]> {
    return this.firestore.collection<Post>('posts').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        // Retorna cada post con su id
        return { ...data, id };
      })),
      catchError(error => {
        console.error('Error al cargar posts:', error);
        // Maneja errores y retorna un observable de error
        return throwError(() => new Error('Error al cargar posts'));
      })
    );
  }

  // Obtiene un post específico por su id
  getPost(id: string): Observable<Post | null> {
    return this.firestore.doc<Post>(`posts/${id}`).valueChanges().pipe(
      map(post => post ? { ...post, id } : null),
      catchError(error => {
        console.error('Error al cargar el post:', error);
        // Maneja errores y retorna un observable de error
        return throwError(() => new Error('Error al cargar el post'));
      })
    );
  }

  // Agrega un nuevo post a la colección 'posts'
  addPost(post: Post): Promise<void> {
    return this.firestore.collection('posts').add(post).then(() => {
      console.log('Post added successfully');
    }).catch((error) => {
      console.error('Error adding post: ', error);
      // Lanza un error si falla al agregar el post
      throw new Error('Error al agregar post');
    });
  }

  // Actualiza un post existente por su id
  updatePost(id: string, post: Partial<Post>) {
    return this.firestore.doc(`posts/${id}`).update(post).catch(error => {
      console.error('Error al actualizar el post:', error);
      // Lanza un error si falla al actualizar el post
      throw new Error('Error al actualizar el post');
    });
  }

  // Elimina un post por su id
  deletePost(id: string) {
    return this.firestore.doc(`posts/${id}`).delete().catch(error => {
      console.error('Error al eliminar el post:', error);
      // Lanza un error si falla al eliminar el post
      throw new Error('Error al eliminar el post');
    });
  }
}

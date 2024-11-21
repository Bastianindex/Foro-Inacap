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
  newPost: Post = {
    title: '',
    content: '',
    detail: '',
    userId: '',
    username: '',
    timestamp: 0
  };
  errorMessage: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  async addPost() {
    this.errorMessage = '';

    if (this.validatePost()) {
      const user = await this.afAuth.currentUser;
      if (user) {
        this.newPost.userId = user.uid;
        this.newPost.username = user.displayName || user.email || 'Usuario anónimo';
        this.newPost.timestamp = Date.now();

        try {
          await this.postService.addPost(this.newPost);
          console.log('Post agregado con éxito');
          this.router.navigate(['/home']);
        } catch (error) {
          console.error('Error al agregar post:', error);
          this.errorMessage = 'Ocurrió un error al agregar el post. Inténtalo de nuevo más tarde.';
        }
      } else {
        console.error('Usuario no autenticado');
        this.errorMessage = 'Debes estar autenticado para agregar un post.';
      }
    }
  }

  validatePost(): boolean {
    return this.newPost.title.trim() !== '' && this.newPost.content.trim() !== '';
  }
}

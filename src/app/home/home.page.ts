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
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      error => {
        console.error('Error al cargar posts:', error);
      }
    );
  }

  goToPostDetails(postId: string | undefined) {
    if (postId) {
      this.router.navigate(['/post-details', postId]);
    } else {
      console.error('ID de post no válido');
    }
  }

  async addPost() {
    if (this.newPostContent.trim() !== '') {
      const user = await this.afAuth.currentUser;
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
          console.log('Post agregado con éxito');
          this.newPostContent = '';
          this.loadPosts();
        }).catch(error => {
          console.error('Error al agregar post:', error);
        });
      } else {
        console.error('Usuario no autenticado');
      }
    }
  }
}

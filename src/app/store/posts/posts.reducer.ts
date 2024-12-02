import { createReducer, on } from '@ngrx/store';
import { Post } from '../../models/post.model';
import * as PostsActions from './posts.actions';

// Definición del estado inicial de la aplicación
export interface PostsState {
  posts: Post[]; // Arreglo de publicaciones
  loading: boolean; // Indicador de carga
  error: any; // Error en caso de falla
}

// Estado inicial de la aplicación
export const initialState: PostsState = {
  posts: [], // No hay publicaciones al inicio
  loading: false, // No hay carga al inicio
  error: null // No hay error al inicio
};

// Reductor de publicaciones
export const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state): PostsState => ({ ...state, loading: true })), // Cuando se inicia la carga de publicaciones
  on(PostsActions.loadPostsSuccess, (state, { posts }): PostsState => ({ ...state, posts, loading: false })), // Cuando la carga de publicaciones es exitosa
  on(PostsActions.loadPostsFailure, (state, { error }): PostsState => ({ ...state, error, loading: false })) // Cuando la carga de publicaciones falla
);

import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post.model';

// Esta acción se lanza cuando se inicia la carga de publicaciones.
export const loadPosts = createAction('[Posts] Load Posts');

// Esta acción se lanza cuando la carga de publicaciones es exitosa, llevando el arreglo de publicaciones cargadas.
export const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: Post[] }>());

// Esta acción se lanza cuando la carga de publicaciones falla, llevando el error ocurrido.
export const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: any }>());

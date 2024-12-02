import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PostsActions from './posts.actions';
import { PostService } from '../../services/post.service';

// Esta clase es un efecto de NgRx que se encarga de manejar la carga de publicaciones.
@Injectable()
export class PostsEffects {
  // Este efecto se activa cuando se lanza la acción de cargar publicaciones.
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      // Se filtran las acciones para solo escuchar la acción de cargar publicaciones.
      ofType(PostsActions.loadPosts),
      // Se utiliza switchMap para cambiar el flujo de acciones a un flujo de carga de publicaciones.
      switchMap(() => {
        // Se llama al servicio de publicaciones para obtener las publicaciones.
        return this.postService.getPosts().pipe(
          // Si la carga es exitosa, se mapea a una acción de éxito con las publicaciones cargadas.
          map(posts => PostsActions.loadPostsSuccess({ posts })),
          // Si ocurre un error, se captura y se mapea a una acción de falla con el error.
          catchError(error => of(PostsActions.loadPostsFailure({ error })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private postService: PostService) {}
}

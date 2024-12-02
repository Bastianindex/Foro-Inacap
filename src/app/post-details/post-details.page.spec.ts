import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailsPage } from './post-details.page';

// Esta prueba unitaria verifica si la página de detalles del post se crea correctamente.
describe('PostDetailsPage', () => {
  let component: PostDetailsPage;
  let fixture: ComponentFixture<PostDetailsPage>;

  // Antes de cada prueba, se crea una instancia de la página de detalles del post y se actualiza la vista.
  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // La prueba verifica si la página de detalles del post se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

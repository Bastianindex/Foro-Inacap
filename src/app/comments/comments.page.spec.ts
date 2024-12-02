import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsPage } from './comments.page';

// Describe el componente CommentsPage para probarlo
describe('CommentsPage', () => {
  let component: CommentsPage;
  let fixture: ComponentFixture<CommentsPage>;

  // Configura el entorno de prueba antes de cada it
  beforeEach(() => {
    // Crea un componente de CommentsPage para probarlo
    fixture = TestBed.createComponent(CommentsPage);
    component = fixture.componentInstance;
    // Detecta los cambios en el componente
    fixture.detectChanges();
  });

  // Prueba que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

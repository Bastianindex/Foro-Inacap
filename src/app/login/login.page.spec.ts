import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

// Este archivo contiene las pruebas unitarias para la página de inicio de sesión

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // Antes de cada prueba, se crea una instancia de la página de inicio de sesión
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // La primera prueba verifica que la página de inicio de sesión se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

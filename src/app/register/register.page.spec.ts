import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Esta función describe el conjunto de pruebas para la página de registro.
describe('RegisterPage', () => {
  let component: RegisterPage; // Componente a probar.
  let fixture: ComponentFixture<RegisterPage>; // Fixture para crear el componente.
  let afAuthSpy: jasmine.SpyObj<AngularFireAuth>; // Espía para AngularFireAuth.
  let routerSpy: jasmine.SpyObj<Router>; // Espía para Router.

  // Antes de cada prueba, se configura el entorno de prueba.
  beforeEach(() => {
    // Se crean espías para AngularFireAuth y Router.
    afAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['createUserWithEmailAndPassword']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Se configura el módulo de prueba.
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Se importa ReactiveFormsModule para el formulario.
      declarations: [RegisterPage], // Se declara el componente RegisterPage.
      providers: [
        { provide: AngularFireAuth, useValue: afAuthSpy }, // Se proporciona el espía de AngularFireAuth.
        { provide: Router, useValue: routerSpy } // Se proporciona el espía de Router.
      ]
    }).compileComponents(); // Se compilan los componentes.

    // Se crea el componente RegisterPage.
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance; // Se obtiene la instancia del componente.
  });
});
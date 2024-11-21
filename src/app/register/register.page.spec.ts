import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';


describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let afAuthSpy: jasmine.SpyObj<AngularFireAuth>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    afAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['createUserWithEmailAndPassword']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterPage],
      providers: [
        { provide: AngularFireAuth, useValue: afAuthSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
  });
});
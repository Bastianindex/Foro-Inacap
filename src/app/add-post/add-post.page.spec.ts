import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPostPage } from './add-post.page';
import { PostService } from '../services/post.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

// Describe el componente AddPostPage para probarlo
describe('AddPostPage', () => {
    let component: AddPostPage;
    let fixture: ComponentFixture<AddPostPage>;
    let postServiceSpy: jasmine.SpyObj<PostService>;
    let afAuthSpy: jasmine.SpyObj<AngularFireAuth>;
    let routerSpy: jasmine.SpyObj<Router>;

    // Configura el entorno de prueba antes de cada it
    beforeEach(() => {
        // Crea espías para los servicios y el router para simular su comportamiento
        postServiceSpy = jasmine.createSpyObj('PostService', ['addPost']);
        afAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['currentUser']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        // Configura el módulo de prueba con las declaraciones y proveedores necesarios
        TestBed.configureTestingModule({
            declarations: [AddPostPage],
            providers: [
                { provide: PostService, useValue: postServiceSpy },
                { provide: AngularFireAuth, useValue: afAuthSpy },
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        // Crea un componente de AddPostPage para probarlo
        fixture = TestBed.createComponent(AddPostPage);
        component = fixture.componentInstance;
    });

    // Prueba que el componente se cree correctamente
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Prueba que se muestre un mensaje de error si el título es demasiado corto
    it('should show error message if title is too short', async () => {
        component.newPost.title = '123';
        component.newPost.content = 'Valid content';
        await component.addPost();
        expect(component.errorMessage).toBe('El título debe tener al menos 5 caracteres.');
    });

    // Prueba que se muestre un mensaje de error si el contenido es demasiado corto
    it('should show error message if content is too short', async () => {
        component.newPost.title = 'Valid Title';
        component.newPost.content = '123';
        await component.addPost();
        expect(component.errorMessage).toBe('El contenido debe tener al menos 10 caracteres.');
    });

    // Prueba que se llame a addPost del servicio PostService cuando el post es válido
    it('should call addPost on PostService when post is valid', async () => {
        const mockUser: any = {
            uid: '123',
            email: 'test@example.com',
            displayName: 'Test User',
        };

        afAuthSpy.currentUser = Promise.resolve(mockUser);
        component.newPost.title = 'Test Title';
        component.newPost.content = 'Test Content';

        postServiceSpy.addPost.and.returnValue(Promise.resolve());

        await component.addPost();

        expect(postServiceSpy.addPost).toHaveBeenCalledWith(component.newPost);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });

    // Prueba que se muestre un mensaje de error cuando falla la adición del post
    it('should show error message when post addition fails', async () => {
        const mockUser: any = {
            uid: '123',
            email: 'test@example.com',
            displayName: 'Test User',
        };

        afAuthSpy.currentUser = Promise.resolve(mockUser);
        component.newPost.title = 'Test Title';
        component.newPost.content = 'Test Content';

        postServiceSpy.addPost.and.returnValue(Promise.reject(new Error('Error al agregar post')));

        await component.addPost();

        expect(component.errorMessage).toBe('Ocurrió un error al agregar el post. Inténtalo de nuevo más tarde.');
    });
});
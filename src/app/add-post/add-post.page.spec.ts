import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPostPage } from './add-post.page';
import { PostService } from '../services/post.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

describe('AddPostPage', () => {
    let component: AddPostPage;
    let fixture: ComponentFixture<AddPostPage>;
    let postServiceSpy: jasmine.SpyObj<PostService>;
    let afAuthSpy: jasmine.SpyObj<AngularFireAuth>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        postServiceSpy = jasmine.createSpyObj('PostService', ['addPost']);
        afAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['currentUser']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            declarations: [AddPostPage],
            providers: [
                { provide: PostService, useValue: postServiceSpy },
                { provide: AngularFireAuth, useValue: afAuthSpy },
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddPostPage);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show error message if title is too short', async () => {
        component.newPost.title = '123';
        component.newPost.content = 'Valid content';
        await component.addPost();
        expect(component.errorMessage).toBe('El título debe tener al menos 5 caracteres.');
    });

    it('should show error message if content is too short', async () => {
        component.newPost.title = 'Valid Title';
        component.newPost.content = '123';
        await component.addPost();
        expect(component.errorMessage).toBe('El contenido debe tener al menos 10 caracteres.');
    });

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
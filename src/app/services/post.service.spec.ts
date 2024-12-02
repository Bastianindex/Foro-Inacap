import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostService } from './post.service';
import { of } from 'rxjs';

// Esta función describe describe el comportamiento del servicio de posts
describe('PostService', () => {
  let service: PostService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;

  // Se ejecuta antes de cada prueba para configurar el entorno de prueba
  beforeEach(() => {
    // Crea un espía para AngularFirestore para simular su comportamiento
    const firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    // Configura el espía para que cuando se llame a 'collection', devuelva un objeto que simula el comportamiento de snapshotChanges y add
    firestoreMock.collection.and.returnValue({
      snapshotChanges: () => of([]), // Simula que no hay cambios en los documentos
      add: () => Promise.resolve() // Simula que el documento se agrega correctamente
    } as any);

    // Configura el módulo de prueba para incluir el servicio de posts y el espía de AngularFirestore
    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });

    // Obtiene la instancia del servicio de posts y el espía de AngularFirestore
    service = TestBed.inject(PostService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
  });

  // Prueba para verificar si el servicio de posts se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Espera que el servicio sea verdadero, es decir, que se haya creado correctamente
  });

  // Prueba para verificar si el servicio de posts obtiene los posts correctamente
  it('should get posts', (done: DoneFn) => {
    service.getPosts().subscribe(posts => {
      expect(posts).toEqual([]); // Espera que los posts sean un arreglo vacío, ya que el espía devuelve un arreglo vacío
      done(); // Indica que la prueba ha terminado
    });
  });

  // Prueba para verificar si el servicio de posts agrega un post correctamente
  it('should add a post', async () => {
    // Llamada asincrónica para agregar un post
    await service.addPost({ title: 'Test', content: 'Test content', detail: '', userId: '', username: '', timestamp: 0 });
    // Espera que el método 'collection' del espía de AngularFirestore haya sido llamado
    expect(firestoreSpy.collection).toHaveBeenCalled();
  });
});


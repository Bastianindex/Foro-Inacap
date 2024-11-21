import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostService } from './post.service';
import { of } from 'rxjs';

describe('PostService', () => {
  let service: PostService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    firestoreMock.collection.and.returnValue({
      snapshotChanges: () => of([]),
      add: () => Promise.resolve()
    } as any);

    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });

    service = TestBed.inject(PostService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', (done: DoneFn) => {
    service.getPosts().subscribe(posts => {
      expect(posts).toEqual([]);
      done();
    });
  });

  it('should add a post', async () => {
    await service.addPost({ title: 'Test', content: 'Test content', detail: '', userId: '', username: '', timestamp: 0 });
    expect(firestoreSpy.collection).toHaveBeenCalled();
  });
});


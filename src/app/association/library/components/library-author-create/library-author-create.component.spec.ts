import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAuthorCreateComponent } from './library-author-create.component';
import { AuthorService } from '../../services/author.service';

describe('LibraryAuthorCreateComponent', () => {
  let component: LibraryAuthorCreateComponent;
  let fixture: ComponentFixture<LibraryAuthorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAuthorCreateComponent
      ],
      providers: [
        AuthorService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

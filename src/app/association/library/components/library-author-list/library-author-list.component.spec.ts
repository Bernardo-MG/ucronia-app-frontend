import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorService } from '../../services/author.service';
import { LibraryAuthorListComponent } from './library-author-list.component';

describe('LibraryAuthorListComponent', () => {
  let component: LibraryAuthorListComponent;
  let fixture: ComponentFixture<LibraryAuthorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAuthorListComponent
      ],
      providers: [
        AuthorService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

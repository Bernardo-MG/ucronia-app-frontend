import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorService } from '../../services/author.service';
import { BookTypeService } from '../../services/book-type.service';
import { BookService } from '../../services/book.service';
import { GameSystemService } from '../../services/game-system.service';
import { PublisherService } from '../../services/publisher.service';
import { LibraryBookCreateComponent } from './library-book-create.component';

describe('LibraryBookCreateComponent', () => {
  let component: LibraryBookCreateComponent;
  let fixture: ComponentFixture<LibraryBookCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryBookCreateComponent
      ],
      providers: [
        BookService,
        BookTypeService,
        GameSystemService,
        AuthorService,
        PublisherService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

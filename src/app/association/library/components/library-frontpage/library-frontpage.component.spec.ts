import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorService } from '../../services/author.service';
import { BookTypeService } from '../../services/book-type.service';
import { BookService } from '../../services/book.service';
import { GameSystemService } from '../../services/game-system.service';
import { PublisherService } from '../../services/publisher.service';
import { LibraryFrontpageComponent } from './library-frontpage.component';

describe('LibraryFrontpageComponent', () => {
  let component: LibraryFrontpageComponent;
  let fixture: ComponentFixture<LibraryFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LibraryFrontpageComponent
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

    fixture = TestBed.createComponent(LibraryFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorService } from '../../services/author.service';
import { BookTypeService } from '../../services/book-type.service';
import { BookService } from '../../services/book.service';
import { GameSystemService } from '../../services/game-system.service';
import { PublisherService } from '../../services/publisher.service';
import { LibraryAdminFrontpageComponent } from './library-admin-frontpage.component';

describe('LibraryAdminFrontpageComponent', () => {
  let component: LibraryAdminFrontpageComponent;
  let fixture: ComponentFixture<LibraryAdminFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LibraryAdminFrontpageComponent
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
    
    fixture = TestBed.createComponent(LibraryAdminFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorAdminService } from '../../services/author-admin.service';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { BookAdminService } from '../../services/book-admin.service';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { PublisherAdminService } from '../../services/publisher-admin.service';
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
        BookAdminService,
        BookTypeAdminService,
        GameSystemAdminService,
        AuthorAdminService,
        PublisherAdminService
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

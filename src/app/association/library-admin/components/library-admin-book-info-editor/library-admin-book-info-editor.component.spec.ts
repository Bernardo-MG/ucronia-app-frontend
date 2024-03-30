import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorAdminService } from '../../services/author-admin.service';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { BookAdminService } from '../../services/book-admin.service';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminBookInfoEditorComponent } from './library-admin-book-info-editor.component';

describe('LibraryAdminBookInfoEditorComponent', () => {
  let component: LibraryAdminBookInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAdminBookInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryAdminBookInfoEditorComponent
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

    fixture = TestBed.createComponent(LibraryAdminBookInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

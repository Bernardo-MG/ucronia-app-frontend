import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorAdminService } from '@app/association-admin/library-admin/author/services/author-admin.service';
import { BookTypeAdminService } from '@app/association-admin/library-admin/book-type/services/book-type-admin.service';
import { GameSystemAdminService } from '@app/association-admin/library-admin/game-system/services/game-system-admin.service';
import { PublisherAdminService } from '@app/association-admin/library-admin/publisher/services/publisher-admin.service';
import { BookAdminService } from '../../services/book-admin.service';
import { LibraryAdminBookInfoEditorContainer } from './library-admin-book-edition.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminBookInfoEditorContainer', () => {
  let component: LibraryAdminBookInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminBookInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LibraryAdminBookInfoEditorContainer],
    providers: [
        BookAdminService,
        BookTypeAdminService,
        GameSystemAdminService,
        AuthorAdminService,
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

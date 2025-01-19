import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorInfoEditorContainer } from './library-admin-author-edition.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminAuthorInfoEditorContainer', () => {
  let component: LibraryAdminAuthorInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminAuthorInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LibraryAdminAuthorInfoEditorContainer],
    providers: [
        AuthorAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

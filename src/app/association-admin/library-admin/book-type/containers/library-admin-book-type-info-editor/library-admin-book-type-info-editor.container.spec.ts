import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeInfoEditorContainer } from './library-admin-book-type-info-editor.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminBookTypeInfoEditorContainer', () => {
  let component: LibraryAdminBookTypeInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LibraryAdminBookTypeInfoEditorContainer],
    providers: [
        BookTypeAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookTypeInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

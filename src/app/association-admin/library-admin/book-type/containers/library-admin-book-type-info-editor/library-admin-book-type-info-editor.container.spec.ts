import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeInfoEditorContainer } from './library-admin-book-type-info-editor.container';

describe('LibraryAdminBookTypeInfoEditorContainer', () => {
  let component: LibraryAdminBookTypeInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryAdminBookTypeInfoEditorContainer
      ],
      providers: [
        BookTypeAdminService
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

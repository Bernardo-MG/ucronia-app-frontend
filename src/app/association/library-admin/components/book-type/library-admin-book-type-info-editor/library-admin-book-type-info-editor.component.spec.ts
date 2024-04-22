import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryAdminBookTypeInfoEditorComponent } from './library-admin-book-type-info-editor.component';
import { BookTypeAdminService } from '../../services/book-type-admin.service';

describe('LibraryAdminBookTypeInfoEditorComponent', () => {
  let component: LibraryAdminBookTypeInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAdminBookTypeInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryAdminBookTypeInfoEditorComponent
      ],
      providers: [
        BookTypeAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminBookTypeInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

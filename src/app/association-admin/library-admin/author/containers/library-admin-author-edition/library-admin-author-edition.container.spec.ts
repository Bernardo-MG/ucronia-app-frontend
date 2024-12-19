import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryAdminAuthorInfoEditorComponent } from './library-admin-author-edition.container';
import { AuthorAdminService } from '../../../services/author-admin.service';

describe('LibraryAdminAuthorInfoEditorComponent', () => {
  let component: LibraryAdminAuthorInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAdminAuthorInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryAdminAuthorInfoEditorComponent
      ],
      providers: [
        AuthorAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

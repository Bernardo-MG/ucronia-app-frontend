import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorAdminService } from '../../../services/author-admin.service';
import { LibraryAdminAuthorCreateComponent } from './library-admin-author-create.component';

describe('LibraryAdminAuthorCreateComponent', () => {
  let component: LibraryAdminAuthorCreateComponent;
  let fixture: ComponentFixture<LibraryAdminAuthorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LibraryAdminAuthorCreateComponent
      ],
      providers: [
        AuthorAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

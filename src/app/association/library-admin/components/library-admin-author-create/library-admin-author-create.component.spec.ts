import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminAuthorCreateComponent } from './library-admin-author-create.component';
import { AuthorAdminService } from '../../services/author-admin.service';

describe('LibraryAdminAuthorCreateComponent', () => {
  let component: LibraryAdminAuthorCreateComponent;
  let fixture: ComponentFixture<LibraryAdminAuthorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
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

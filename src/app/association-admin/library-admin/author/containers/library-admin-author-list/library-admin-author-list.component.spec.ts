import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorListComponent } from './library-admin-author-list.component';

describe('LibraryAdminAuthorListComponent', () => {
  let component: LibraryAdminAuthorListComponent;
  let fixture: ComponentFixture<LibraryAdminAuthorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminAuthorListComponent
      ],
      providers: [
        AuthorAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

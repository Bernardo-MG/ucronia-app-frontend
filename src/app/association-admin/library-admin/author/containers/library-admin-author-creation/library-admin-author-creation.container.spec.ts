import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorCreateContainer } from './library-admin-author-creation.container';

describe('LibraryAdminAuthorCreateContainer', () => {
  let component: LibraryAdminAuthorCreateContainer;
  let fixture: ComponentFixture<LibraryAdminAuthorCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LibraryAdminAuthorCreateContainer
      ],
      providers: [
        AuthorAdminService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

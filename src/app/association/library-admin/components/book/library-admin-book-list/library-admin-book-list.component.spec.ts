import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookListComponent } from './library-admin-book-list.component';
import { BookAdminService } from '../../../services/book-admin.service';

describe('LibraryAdminBookListComponent', () => {
  let component: LibraryAdminBookListComponent;
  let fixture: ComponentFixture<LibraryAdminBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminBookListComponent
      ],
      providers: [
        BookAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

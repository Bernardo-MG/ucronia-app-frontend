import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminFictionBookDonorsFormComponent } from './library-admin-fiction-book-donors-form.component';

describe('LibraryAdminBookDonorsFormComponent', () => {
  let component: LibraryAdminFictionBookDonorsFormComponent;
  let fixture: ComponentFixture<LibraryAdminFictionBookDonorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminFictionBookDonorsFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminFictionBookDonorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

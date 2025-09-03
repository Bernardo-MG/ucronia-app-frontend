import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookDonorsFormComponent } from './library-admin-book-authors-form.component';

describe('LibraryAdminBookDonorsFormComponent', () => {
  let component: LibraryAdminBookDonorsFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookDonorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookDonorsFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookDonorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

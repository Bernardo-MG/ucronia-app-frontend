import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookDonorsForm } from './library-admin-book-donors-form';

describe('LibraryAdminBookDonorsForm', () => {
  let component: LibraryAdminBookDonorsForm;
  let fixture: ComponentFixture<LibraryAdminBookDonorsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookDonorsForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookDonorsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

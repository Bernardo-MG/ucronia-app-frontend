import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookLendingForm } from './library-admin-book-lending-form';

describe('LibraryAdminBookLendingForm', () => {
  let component: LibraryAdminBookLendingForm;
  let fixture: ComponentFixture<LibraryAdminBookLendingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookLendingForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookLendingForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

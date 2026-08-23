import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookLendingForm } from './library-book-lending-form';

describe('LibraryBookLendingForm', () => {
  let component: LibraryBookLendingForm;
  let fixture: ComponentFixture<LibraryBookLendingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookLendingForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookLendingForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

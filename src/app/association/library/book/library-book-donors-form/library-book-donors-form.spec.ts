import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookDonorsForm } from './library-book-donors-form';

describe('LibraryBookDonorsForm', () => {
  let component: LibraryBookDonorsForm;
  let fixture: ComponentFixture<LibraryBookDonorsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookDonorsForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookDonorsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookReturnForm } from './library-book-return-form';

describe('LibraryBookReturnForm', () => {
  let component: LibraryBookReturnForm;
  let fixture: ComponentFixture<LibraryBookReturnForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookReturnForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookReturnForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

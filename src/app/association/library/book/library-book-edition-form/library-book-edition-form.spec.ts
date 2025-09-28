import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookEditionForm } from './library-book-edition-form';

describe('LibraryBookEditionForm', () => {
  let component: LibraryBookEditionForm;
  let fixture: ComponentFixture<LibraryBookEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookEditionForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

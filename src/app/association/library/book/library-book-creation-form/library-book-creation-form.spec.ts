import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookCreationForm } from './library-book-creation-form';

describe('LibraryBookCreationForm', () => {
  let component: LibraryBookCreationForm;
  let fixture: ComponentFixture<LibraryBookCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryBookCreationForm
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

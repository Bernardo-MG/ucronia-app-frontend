import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LibraryAdminBookCreationForm } from './library-admin-book-creation-form';

describe('LibraryAdminBookCreationForm', () => {
  let component: LibraryAdminBookCreationForm;
  let fixture: ComponentFixture<LibraryAdminBookCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookCreationForm
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

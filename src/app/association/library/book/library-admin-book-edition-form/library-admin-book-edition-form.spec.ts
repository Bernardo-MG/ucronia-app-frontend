import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookEditionForm } from './library-admin-book-edition-form';

describe('LibraryAdminBookEditionForm', () => {
  let component: LibraryAdminBookEditionForm;
  let fixture: ComponentFixture<LibraryAdminBookEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookEditionForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

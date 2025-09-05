import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookInfoEditionForm } from './library-admin-book-info-edition-form';

describe('LibraryAdminBookInfoEditionForm', () => {
  let component: LibraryAdminBookInfoEditionForm;
  let fixture: ComponentFixture<LibraryAdminBookInfoEditionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookInfoEditionForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookInfoEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookReturnForm } from './library-admin-book-return-form';

describe('LibraryAdminBookReturnForm', () => {
  let component: LibraryAdminBookReturnForm;
  let fixture: ComponentFixture<LibraryAdminBookReturnForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookReturnForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookReturnForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

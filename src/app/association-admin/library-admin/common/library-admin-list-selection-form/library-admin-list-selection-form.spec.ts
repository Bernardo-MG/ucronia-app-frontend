import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminListSelectionForm } from './library-admin-list-selection-form';

describe('LibraryAdminListSelectionForm', () => {
  let component: LibraryAdminListSelectionForm;
  let fixture: ComponentFixture<LibraryAdminListSelectionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminListSelectionForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminListSelectionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

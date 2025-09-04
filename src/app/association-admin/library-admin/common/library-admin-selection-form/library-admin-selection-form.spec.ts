import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminSelectionForm } from './library-admin-selection-form';

describe('LibraryAdminSelectionForm', () => {
  let component: LibraryAdminSelectionForm;
  let fixture: ComponentFixture<LibraryAdminSelectionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminSelectionForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminSelectionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

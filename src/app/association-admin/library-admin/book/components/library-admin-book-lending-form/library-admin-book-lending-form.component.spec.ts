import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookLendingFormComponent } from './library-admin-book-lending-form.component';

describe('LibraryAdminBookLendingFormComponent', () => {
  let component: LibraryAdminBookLendingFormComponent;
  let fixture: ComponentFixture<LibraryAdminBookLendingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookLendingFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookLendingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

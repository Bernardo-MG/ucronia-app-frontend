import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminBookLendingMemberSelectionComponent } from './library-admin-book-lending-member-selection.component';

describe('LibraryAdminBookLendingMemberSelectionComponent', () => {
  let component: LibraryAdminBookLendingMemberSelectionComponent;
  let fixture: ComponentFixture<LibraryAdminBookLendingMemberSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminBookLendingMemberSelectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookLendingMemberSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

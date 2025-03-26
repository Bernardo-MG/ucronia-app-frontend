import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameBookLendingMemberSelectionComponent } from './library-admin-game-book-lending-member-selection.component';

describe('LibraryAdminGameBookLendingMemberSelectionComponent', () => {
  let component: LibraryAdminGameBookLendingMemberSelectionComponent;
  let fixture: ComponentFixture<LibraryAdminGameBookLendingMemberSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameBookLendingMemberSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameBookLendingMemberSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

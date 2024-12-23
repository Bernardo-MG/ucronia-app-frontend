import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLendingMemberSelectionComponent } from './book-lending-member-selection.component';

describe('BookLendingMemberSelectionComponent', () => {
  let component: BookLendingMemberSelectionComponent;
  let fixture: ComponentFixture<BookLendingMemberSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLendingMemberSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingMemberSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

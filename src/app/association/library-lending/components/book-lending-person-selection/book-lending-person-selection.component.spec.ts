import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLendingPersonSelectionComponent } from './book-lending-person-selection.component';

describe('BookLendingPersonSelectionComponent', () => {
  let component: BookLendingPersonSelectionComponent;
  let fixture: ComponentFixture<BookLendingPersonSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLendingPersonSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingPersonSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

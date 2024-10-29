import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLendingLendComponent } from './book-lending-lend.component';

describe('BookLendingLendComponent', () => {
  let component: BookLendingLendComponent;
  let fixture: ComponentFixture<BookLendingLendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLendingLendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingLendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

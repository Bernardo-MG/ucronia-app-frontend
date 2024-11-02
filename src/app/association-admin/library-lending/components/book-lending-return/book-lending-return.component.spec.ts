import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLendingReturnComponent } from './book-lending-return.component';

describe('BookLendingReturnComponent', () => {
  let component: BookLendingReturnComponent;
  let fixture: ComponentFixture<BookLendingReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLendingReturnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

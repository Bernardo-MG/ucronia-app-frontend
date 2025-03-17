import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLendingFormComponent } from './book-lending-form.component';

describe('BookLendingFormComponent', () => {
  let component: BookLendingFormComponent;
  let fixture: ComponentFixture<BookLendingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLendingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

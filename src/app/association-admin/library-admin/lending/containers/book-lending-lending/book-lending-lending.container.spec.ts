import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookLendingLendContainer } from './book-lending-lending.container';

describe('BookLendingLendContainer', () => {
  let component: BookLendingLendContainer;
  let fixture: ComponentFixture<BookLendingLendContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BookLendingLendContainer
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingLendContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

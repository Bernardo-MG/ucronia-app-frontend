import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookLendingReturnContainer } from './book-lending-returning.component';

describe('BookLendingReturnContainer', () => {
  let component: BookLendingReturnContainer;
  let fixture: ComponentFixture<BookLendingReturnContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BookLendingReturnContainer
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookLendingReturnContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

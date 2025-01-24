import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookLendingReturnContainer } from './book-lending-returning.component';

describe('BookLendingReturnContainer', () => {
  let component: BookLendingReturnContainer;
  let fixture: ComponentFixture<BookLendingReturnContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BookLendingReturnContainer
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
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

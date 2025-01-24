import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookLendingLendContainer } from './book-lending-lending.container';

describe('BookLendingLendContainer', () => {
  let component: BookLendingLendContainer;
  let fixture: ComponentFixture<BookLendingLendContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BookLendingLendContainer
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
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

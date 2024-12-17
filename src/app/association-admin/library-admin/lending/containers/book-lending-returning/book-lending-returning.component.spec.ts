import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookLendingReturnComponent } from './book-lending-returning.component';

describe('BookLendingReturnComponent', () => {
  let component: BookLendingReturnComponent;
  let fixture: ComponentFixture<BookLendingReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BookLendingReturnComponent
      ]
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

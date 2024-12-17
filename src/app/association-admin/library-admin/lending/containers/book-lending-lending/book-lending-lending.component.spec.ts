import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookLendingLendComponent } from './book-lending-lending.component';

describe('BookLendingLendComponent', () => {
  let component: BookLendingLendComponent;
  let fixture: ComponentFixture<BookLendingLendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BookLendingLendComponent
      ]
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

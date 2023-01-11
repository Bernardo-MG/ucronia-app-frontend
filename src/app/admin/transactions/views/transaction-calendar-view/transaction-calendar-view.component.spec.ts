import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionService } from '../../service/transaction.service';

import { TransactionCalendarViewComponent } from './transaction-calendar-view.component';

describe('TransactionCalendarViewComponent', () => {
  let component: TransactionCalendarViewComponent;
  let fixture: ComponentFixture<TransactionCalendarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        TransactionCalendarViewComponent
      ],
      providers: [
        TransactionService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

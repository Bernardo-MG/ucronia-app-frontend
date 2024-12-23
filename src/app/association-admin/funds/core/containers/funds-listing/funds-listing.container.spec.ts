import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionBalanceService } from '@app/association-admin/funds/balance/services/transaction-balance.service';
import { TransactionCalendarService } from '@app/association-admin/funds/calendar/services/transaction-calendar.service';
import { FundsListingComponent } from './funds-listing.container';

describe('FundsListingComponent', () => {
  let component: FundsListingComponent;
  let fixture: ComponentFixture<FundsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FundsListingComponent
      ],
      providers: [
        TransactionCalendarService,
        TransactionBalanceService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FundsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

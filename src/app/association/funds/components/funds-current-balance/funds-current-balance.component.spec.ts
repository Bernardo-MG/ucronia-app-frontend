import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { BalanceService } from '../../service/balance.service';
import { FundsCurrentBalanceComponent } from './funds-current-balance.component';

describe('FundsCurrentBalanceComponent', () => {
  let component: FundsCurrentBalanceComponent;
  let fixture: ComponentFixture<FundsCurrentBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LayoutModule
      ],
      declarations: [
        FundsCurrentBalanceComponent
      ],
      providers: [
        BalanceService
      ]
    });
    fixture = TestBed.createComponent(FundsCurrentBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

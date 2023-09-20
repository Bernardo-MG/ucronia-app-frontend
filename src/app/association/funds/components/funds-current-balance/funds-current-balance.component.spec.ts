import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsCurrentBalanceComponent } from './funds-current-balance.component';

describe('FundsCurrentBalanceComponent', () => {
  let component: FundsCurrentBalanceComponent;
  let fixture: ComponentFixture<FundsCurrentBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundsCurrentBalanceComponent]
    });
    fixture = TestBed.createComponent(FundsCurrentBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

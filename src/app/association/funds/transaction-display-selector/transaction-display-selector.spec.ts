import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDisplaySelector } from './transaction-display-selector';

describe('TransactionDisplaySelector', () => {
  let component: TransactionDisplaySelector;
  let fixture: ComponentFixture<TransactionDisplaySelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDisplaySelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDisplaySelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

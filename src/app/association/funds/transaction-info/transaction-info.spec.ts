import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionInfo } from './transaction-info';

describe('TransactionInfo', () => {
  let component: TransactionInfo;
  let fixture: ComponentFixture<TransactionInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionInfo
      ],
      providers: [
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreateViewComponent } from './transaction-create-view.component';

describe('TransactionCreateViewComponent', () => {
  let component: TransactionCreateViewComponent;
  let fixture: ComponentFixture<TransactionCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCreateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

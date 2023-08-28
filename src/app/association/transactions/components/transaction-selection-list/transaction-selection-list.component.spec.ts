import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSelectionListComponent } from './transaction-selection-list.component';

describe('TransactionSelectionListComponent', () => {
  let component: TransactionSelectionListComponent;
  let fixture: ComponentFixture<TransactionSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionSelectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

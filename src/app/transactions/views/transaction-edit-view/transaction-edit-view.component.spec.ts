import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionEditViewComponent } from './transaction-edit-view.component';

describe('TransactionEditViewComponent', () => {
  let component: TransactionEditViewComponent;
  let fixture: ComponentFixture<TransactionEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

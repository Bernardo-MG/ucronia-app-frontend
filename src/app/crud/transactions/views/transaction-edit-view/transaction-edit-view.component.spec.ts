import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TransactionEditViewComponent } from './transaction-edit-view.component';

describe('TransactionEditViewComponent', () => {
  let component: TransactionEditViewComponent;
  let fixture: ComponentFixture<TransactionEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        TransactionEditViewComponent
      ]
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

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/core/components/data-form/data-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionService } from '../../service/transaction.service';

import { TransactionEditViewComponent } from './transaction-edit-view.component';

describe('TransactionEditViewComponent', () => {
  let component: TransactionEditViewComponent;
  let fixture: ComponentFixture<TransactionEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        TransactionEditViewComponent,
        DataFormComponent,
        TransactionFormComponent
      ],
      providers: [
        TransactionService
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

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { TransactionService } from '../../service/transaction.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionInfoComponent } from '../transaction-info/transaction-info.component';
import { TransactionDetailsComponent } from './transaction-details.component';

describe('TransactionDetailsComponent', () => {
  let component: TransactionDetailsComponent;
  let fixture: ComponentFixture<TransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        TransactionDetailsComponent,
        TransactionFormComponent,
        TransactionInfoComponent
      ],
      providers: [
        TransactionService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

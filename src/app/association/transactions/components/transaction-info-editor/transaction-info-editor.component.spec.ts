import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { TransactionService } from '../../service/transaction.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionInfoComponent } from '../transaction-info/transaction-info.component';
import { TransactionInfoEditorComponent } from './transaction-info-editor.component';

describe('TransactionDetailsComponent', () => {
  let component: TransactionInfoEditorComponent;
  let fixture: ComponentFixture<TransactionInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        LayoutModule,
        TransactionInfoEditorComponent,
        TransactionFormComponent,
        TransactionInfoComponent
      ],
      providers: [
        TransactionService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

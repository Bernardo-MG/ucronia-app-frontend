import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { TransactionTabsComponent } from '../../components/transaction-tabs/transaction-tabs.component';
import { TransactionService } from '../../service/transaction.service';
import { TransactionListViewComponent } from './transaction-list-view.component';

describe('TransactionListViewComponent', () => {
  let component: TransactionListViewComponent;
  let fixture: ComponentFixture<TransactionListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonsModule,
        PaginationModule,
        CoreModule
      ],
      declarations: [
        TransactionListViewComponent,
        TransactionTabsComponent
      ],
      providers: [
        TransactionService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

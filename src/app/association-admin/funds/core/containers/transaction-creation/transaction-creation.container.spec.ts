import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';
import { TransactionCreationComponent } from './transaction-creation.container';

describe('TransactionCreationComponent', () => {
  let component: TransactionCreationComponent;
  let fixture: ComponentFixture<TransactionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionCreationComponent
      ],
      providers: [
        TransactionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

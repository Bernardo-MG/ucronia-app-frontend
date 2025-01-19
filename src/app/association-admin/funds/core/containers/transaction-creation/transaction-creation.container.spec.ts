import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';
import { TransactionCreationComponent } from './transaction-creation.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionCreationComponent', () => {
  let component: TransactionCreationComponent;
  let fixture: ComponentFixture<TransactionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        TransactionCreationComponent],
    providers: [
        TransactionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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

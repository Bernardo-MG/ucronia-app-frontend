import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionService } from '@app/association-admin/funds/core/service/transaction.service';
import { TransactionEditionComponent } from './transaction-edition.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionEditionComponent', () => {
  let component: TransactionEditionComponent;
  let fixture: ComponentFixture<TransactionEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        TransactionEditionComponent],
    providers: [
        TransactionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(TransactionEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

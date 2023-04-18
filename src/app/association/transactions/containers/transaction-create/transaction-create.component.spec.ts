import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFrameComponent } from '@app/shared/layout/components/form-frame/form-frame.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionService } from '../../service/transaction.service';
import { TransactionCreateComponent } from './transaction-create.component';
import { LayoutModule } from '@app/shared/layout/layout.module';

describe('TransactionCreateComponent', () => {
  let component: TransactionCreateComponent;
  let fixture: ComponentFixture<TransactionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        IconsModule,
        LayoutModule
      ],
      declarations: [
        TransactionCreateComponent,
        FormFrameComponent
      ],
      providers: [
        TransactionService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

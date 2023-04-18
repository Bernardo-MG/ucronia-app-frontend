import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFrameComponent } from '@app/shared/layout/components/form-frame/form-frame.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionService } from '../../service/transaction.service';
import { TransactionEditComponent } from './transaction-edit.component';
import { LayoutModule } from '@app/shared/layout/layout.module';

describe('TransactionEditComponent', () => {
  let component: TransactionEditComponent;
  let fixture: ComponentFixture<TransactionEditComponent>;

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
        TransactionEditComponent,
        FormFrameComponent
      ],
      providers: [
        TransactionService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

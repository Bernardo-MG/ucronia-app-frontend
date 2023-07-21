import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuModule } from '@app/shared/menu/menu.module';
import { TransactionLayoutComponent } from './transaction-layout.component';

describe('TransactionLayoutComponent', () => {
  let component: TransactionLayoutComponent;
  let fixture: ComponentFixture<TransactionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuModule,
        RouterTestingModule
      ],
      declarations: [
        TransactionLayoutComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

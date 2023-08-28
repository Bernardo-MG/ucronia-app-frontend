import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { TransactionSelectionListComponent } from './transaction-selection-list.component';

describe('TransactionSelectionListComponent', () => {
  let component: TransactionSelectionListComponent;
  let fixture: ComponentFixture<TransactionSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [
        TransactionSelectionListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

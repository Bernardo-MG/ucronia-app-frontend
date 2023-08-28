import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FeeSelectionListComponent } from './fee-selection-list.component';

describe('FeeSelectionListComponent', () => {
  let component: FeeSelectionListComponent;
  let fixture: ComponentFixture<FeeSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [
        FeeSelectionListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

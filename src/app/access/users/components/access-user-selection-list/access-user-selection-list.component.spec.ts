import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessUserSelectionListComponent } from './access-user-selection-list.component';

describe('AccessUserSelectionListComponent', () => {
  let component: AccessUserSelectionListComponent;
  let fixture: ComponentFixture<AccessUserSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [
        AccessUserSelectionListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

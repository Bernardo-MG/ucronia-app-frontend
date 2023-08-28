import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRoleSelectionListComponent } from './access-role-selection-list.component';

describe('AccessRoleSelectionListComponent', () => {
  let component: AccessRoleSelectionListComponent;
  let fixture: ComponentFixture<AccessRoleSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [
        AccessRoleSelectionListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

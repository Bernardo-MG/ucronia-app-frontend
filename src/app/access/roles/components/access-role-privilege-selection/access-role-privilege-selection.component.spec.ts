import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@app/core/core.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRolePrivilegeSelectionComponent } from './access-role-privilege-selection.component';

describe('AccessRolePrivilegeSelectionComponent', () => {
  let component: AccessRolePrivilegeSelectionComponent;
  let fixture: ComponentFixture<AccessRolePrivilegeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        PaginationModule
      ],
      declarations: [
        AccessRolePrivilegeSelectionComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRolePrivilegeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

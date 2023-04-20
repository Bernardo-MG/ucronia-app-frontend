import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@app/core/core.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessUserRoleSelectionComponent } from './access-user-role-selection.component';

describe('AccessUserRoleSelectionComponent', () => {
  let component: AccessUserRoleSelectionComponent;
  let fixture: ComponentFixture<AccessUserRoleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        PaginationModule
      ],
      declarations: [
        AccessUserRoleSelectionComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserRoleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

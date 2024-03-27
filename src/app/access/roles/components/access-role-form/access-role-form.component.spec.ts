import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessRoleFormComponent } from './access-role-form.component';

describe('AccessRoleFormComponent', () => {
  let component: AccessRoleFormComponent;
  let fixture: ComponentFixture<AccessRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule,
        AccessRoleFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

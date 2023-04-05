import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SecurityUserRoleFormComponent } from './security-user-role-form.component';

describe('SecurityUserRoleFormComponent', () => {
  let component: SecurityUserRoleFormComponent;
  let fixture: ComponentFixture<SecurityUserRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ButtonsModule,
        CoreModule,
        PaginationModule
      ],
      declarations: [
        SecurityUserRoleFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityUserRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

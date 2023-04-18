import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessUserRoleFormComponent } from './access-user-role-form.component';

describe('AccessUserRoleFormComponent', () => {
  let component: AccessUserRoleFormComponent;
  let fixture: ComponentFixture<AccessUserRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        CoreModule,
        PaginationModule
      ],
      declarations: [
        AccessUserRoleFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

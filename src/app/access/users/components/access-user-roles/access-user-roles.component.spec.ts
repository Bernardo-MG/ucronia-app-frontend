import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@app/core/core.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserRoleFormComponent } from './access-user-roles.component';

describe('AccessUserRoleFormComponent', () => {
  let component: AccessUserRoleFormComponent;
  let fixture: ComponentFixture<AccessUserRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreModule,
        LayoutModule,
        AccessUserRoleFormComponent
      ],
      providers: [
        AccessUserService
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

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserRolesComponent } from './access-user-roles.component';

describe('AccessUserRolesComponent', () => {
  let component: AccessUserRolesComponent;
  let fixture: ComponentFixture<AccessUserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccessUserRolesComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

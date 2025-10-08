import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessUserRolesInfo } from './access-user-roles-info';

describe('AccessUserRolesInfo', () => {
  let component: AccessUserRolesInfo;
  let fixture: ComponentFixture<AccessUserRolesInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AccessUserRolesInfo
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserRolesInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

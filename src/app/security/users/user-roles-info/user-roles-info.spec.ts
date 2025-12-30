import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRolesInfo } from './user-roles-info';

describe('UserRolesInfo', () => {
  let component: UserRolesInfo;
  let fixture: ComponentFixture<UserRolesInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        UserRolesInfo
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRolesInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

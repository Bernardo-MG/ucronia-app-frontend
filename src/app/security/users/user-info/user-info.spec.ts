import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessUserInfo } from './user-info';

describe('AccessUserForm', () => {
  let component: AccessUserInfo;
  let fixture: ComponentFixture<AccessUserInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AccessUserInfo
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

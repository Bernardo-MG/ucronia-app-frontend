import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivateUserComponent } from './user-activate-user.component';

describe('UserActivateUserComponent', () => {
  let component: UserActivateUserComponent;
  let fixture: ComponentFixture<UserActivateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActivateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

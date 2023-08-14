import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserActivateUserComponent } from './access-user-activate-user.component';

describe('AccessUserActivateUserComponent', () => {
  let component: AccessUserActivateUserComponent;
  let fixture: ComponentFixture<AccessUserActivateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessUserActivateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessUserActivateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

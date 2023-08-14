import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserActivateUserFormComponent } from './access-user-activate-user-form.component';

describe('AccessUserActivateUserFormComponent', () => {
  let component: AccessUserActivateUserFormComponent;
  let fixture: ComponentFixture<AccessUserActivateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessUserActivateUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessUserActivateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

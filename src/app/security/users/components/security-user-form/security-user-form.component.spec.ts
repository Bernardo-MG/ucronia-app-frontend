import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityUserFormComponent } from './security-user-form.component';

describe('SecurityUserFormComponent', () => {
  let component: SecurityUserFormComponent;
  let fixture: ComponentFixture<SecurityUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

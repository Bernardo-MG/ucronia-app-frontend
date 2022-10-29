import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRegisterViewComponent } from './security-register-view.component';

describe('SecurityRegisterViewComponent', () => {
  let component: SecurityRegisterViewComponent;
  let fixture: ComponentFixture<SecurityRegisterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRegisterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

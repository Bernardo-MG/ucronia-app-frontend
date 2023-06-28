import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserInfoComponent } from './access-user-info.component';

describe('AccessUserInfoComponent', () => {
  let component: AccessUserInfoComponent;
  let fixture: ComponentFixture<AccessUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

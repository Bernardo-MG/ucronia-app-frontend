import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityUserCreateViewComponent } from './security-user-create-view.component';

describe('SecurityUserCreateViewComponent', () => {
  let component: SecurityUserCreateViewComponent;
  let fixture: ComponentFixture<SecurityUserCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityUserCreateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityUserCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

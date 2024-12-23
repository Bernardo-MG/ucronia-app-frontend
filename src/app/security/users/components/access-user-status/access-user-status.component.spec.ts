import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUserStatusComponent } from './access-user-status.component';

describe('AccessUserStatusComponent', () => {
  let component: AccessUserStatusComponent;
  let fixture: ComponentFixture<AccessUserStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

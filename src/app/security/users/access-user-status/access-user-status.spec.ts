import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserStatus } from './access-user-status';

describe('AccessUserStatus', () => {
  let component: AccessUserStatus;
  let fixture: ComponentFixture<AccessUserStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserStatus]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

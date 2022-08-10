import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemberCreateViewComponent } from './admin-member-create-view.component';

describe('AdminMemberCreateViewComponent', () => {
  let component: AdminMemberCreateViewComponent;
  let fixture: ComponentFixture<AdminMemberCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMemberCreateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMemberCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

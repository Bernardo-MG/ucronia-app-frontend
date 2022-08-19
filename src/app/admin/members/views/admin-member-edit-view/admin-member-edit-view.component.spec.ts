import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminMemberInfoViewComponent } from './admin-member-edit-view.component';

describe('AdminMemberInfoViewComponent', () => {
  let component: AdminMemberInfoViewComponent;
  let fixture: ComponentFixture<AdminMemberInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AdminMemberInfoViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminMemberInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

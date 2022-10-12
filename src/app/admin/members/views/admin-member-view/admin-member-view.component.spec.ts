import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemberViewComponent } from './admin-member-view.component';

describe('AdminMemberViewComponent', () => {
  let component: AdminMemberViewComponent;
  let fixture: ComponentFixture<AdminMemberViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AdminMemberViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminMemberViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

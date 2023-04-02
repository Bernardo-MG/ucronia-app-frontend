import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTabsComponent } from './member-tabs.component';

describe('MemberTabsComponent', () => {
  let component: MemberTabsComponent;
  let fixture: ComponentFixture<MemberTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

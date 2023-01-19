import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatsViewComponent } from './member-stats-view.component';

describe('MemberStatsViewComponent', () => {
  let component: MemberStatsViewComponent;
  let fixture: ComponentFixture<MemberStatsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberStatsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberStatsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

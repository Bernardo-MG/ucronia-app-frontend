import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberTabsComponent } from '../../components/member-tabs/member-tabs.component';
import { MemberService } from '../../services/member.service';

import { MemberStatsViewComponent } from './member-stats-view.component';

describe('MemberStatsViewComponent', () => {
  let component: MemberStatsViewComponent;
  let fixture: ComponentFixture<MemberStatsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        MemberStatsViewComponent,
        MemberTabsComponent
      ],
      providers: [
        MemberService
      ]
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

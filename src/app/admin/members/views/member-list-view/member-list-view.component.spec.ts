import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { LayoutModule } from '@app/layout/layout.module';
import { MemberTabsComponent } from '../../components/member-tabs/member-tabs.component';
import { MemberService } from '../../services/member.service';

import { MemberListViewComponent } from './member-list-view.component';

describe('MemberListViewComponent', () => {
  let component: MemberListViewComponent;
  let fixture: ComponentFixture<MemberListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LayoutModule,
        ApiUiModule
      ],
      declarations: [
        MemberListViewComponent,
        MemberTabsComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

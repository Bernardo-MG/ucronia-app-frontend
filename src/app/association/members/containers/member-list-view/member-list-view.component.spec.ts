import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
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
        CoreModule
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

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { MemberTabsComponent } from '../../components/member-tabs/member-tabs.component';
import { MemberService } from '../../services/member.service';
import { MemberListViewComponent } from './member-list.component';

describe('MemberListViewComponent', () => {
  let component: MemberListViewComponent;
  let fixture: ComponentFixture<MemberListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        PaginationModule,
        CoreModule,
        IconsModule
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

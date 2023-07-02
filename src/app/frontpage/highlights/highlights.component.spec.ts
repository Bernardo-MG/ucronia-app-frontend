import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveMembersListComponent } from '@app/association/stats/components/active-members-list/active-members-list.component';
import { MemberStatsComponent } from '@app/association/stats/components/member-stats/member-stats.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { HighlightsComponent } from './highlights.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';

describe('HighlightsComponent', () => {
  let component: HighlightsComponent;
  let fixture: ComponentFixture<HighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [
        HighlightsComponent,
        ArticleComponent,
        MemberStatsComponent,
        ActiveMembersListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

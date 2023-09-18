import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceInfoComponent } from '@app/association/stats/components/balance-info/balance-info.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { HighlightsComponent } from './highlights.component';

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
        BalanceInfoComponent
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

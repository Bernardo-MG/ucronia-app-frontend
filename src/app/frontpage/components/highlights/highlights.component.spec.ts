import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontpageService } from '@app/frontpage/service/frontpage.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { HighlightsComponent } from './highlights.component';

describe('HighlightsComponent', () => {
  let component: HighlightsComponent;
  let fixture: ComponentFixture<HighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ArticleComponent,
        HighlightsComponent
      ],
      providers: [
        FrontpageService
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

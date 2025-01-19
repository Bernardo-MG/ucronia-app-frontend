import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FrontpageComponent } from './frontpage.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FrontpageComponent', () => {
  let component: FrontpageComponent;
  let fixture: ComponentFixture<FrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ArticleComponent,
        FrontpageComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();

    fixture = TestBed.createComponent(FrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

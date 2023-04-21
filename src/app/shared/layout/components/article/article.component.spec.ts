import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitingWrapperComponent } from '../waiting-wrapper/waiting-wrapper.component';
import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ArticleComponent,
        WaitingWrapperComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

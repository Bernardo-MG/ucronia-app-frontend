import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ArticleComponent
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

  it('should render title in header', () => {
    const title = 'Test Title';

    component.title = title;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('h1').textContent).toContain(title);
  });

  it('should not render header if title is not provided', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('header')).toBeNull();
  });

  it('should render content inside the component', () => {
    const compiled = fixture.nativeElement;
    const content = 'Test Content';

    component.title = 'Title';
    fixture.detectChanges();
    component.title = content;
    fixture.detectChanges();

    expect(compiled.textContent).toContain(content);
  });
});

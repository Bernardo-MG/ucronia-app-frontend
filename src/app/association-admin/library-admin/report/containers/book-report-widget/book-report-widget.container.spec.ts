import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookReportWidgetContainer } from './book-report-widget.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BookReportWidgetContainer', () => {
  let component: BookReportWidgetContainer;
  let fixture: ComponentFixture<BookReportWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BookReportWidgetContainer],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();

    fixture = TestBed.createComponent(BookReportWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

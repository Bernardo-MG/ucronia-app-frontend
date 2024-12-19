import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReportWidgetComponent } from './book-report-widget.component';

describe('BookReportWidgetComponent', () => {
  let component: BookReportWidgetComponent;
  let fixture: ComponentFixture<BookReportWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookReportWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookReportWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

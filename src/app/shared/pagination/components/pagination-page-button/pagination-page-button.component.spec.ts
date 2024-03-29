import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageButtonComponent } from './pagination-page-button.component';

describe('PaginationButtonComponent', () => {
  let component: PageButtonComponent;
  let fixture: ComponentFixture<PageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

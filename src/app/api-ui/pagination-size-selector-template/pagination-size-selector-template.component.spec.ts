import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationSizeSelectorTemplateComponent } from './pagination-size-selector-template.component';

describe('PaginationSizeSelectorTemplateComponent', () => {
  let component: PaginationSizeSelectorTemplateComponent;
  let fixture: ComponentFixture<PaginationSizeSelectorTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationSizeSelectorTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationSizeSelectorTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationNavigationTemplateComponent } from './pagination-navigation-template.component';

describe('PaginationNavigationTemplateComponent', () => {
  let component: PaginationNavigationTemplateComponent;
  let fixture: ComponentFixture<PaginationNavigationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationNavigationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationNavigationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

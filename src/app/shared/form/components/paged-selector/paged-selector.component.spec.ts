import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedSelectorComponent } from './paged-selector.component';

describe('PagedSelectorComponent', () => {
  let component: PagedSelectorComponent;
  let fixture: ComponentFixture<PagedSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagedSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

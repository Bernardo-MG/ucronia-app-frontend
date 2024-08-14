import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationNavigationInfoComponent } from './pagination-navigation-info.component';

describe('PaginationNavigationInfoComponent', () => {
  let component: PaginationNavigationInfoComponent;
  let fixture: ComponentFixture<PaginationNavigationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationNavigationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationNavigationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

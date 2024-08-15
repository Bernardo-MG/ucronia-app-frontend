import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationInfoWrapperComponent } from './pagination-info-wrapper.component';

describe('PaginationInfoWrapperComponent', () => {
  let component: PaginationInfoWrapperComponent;
  let fixture: ComponentFixture<PaginationInfoWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationInfoWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationInfoWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

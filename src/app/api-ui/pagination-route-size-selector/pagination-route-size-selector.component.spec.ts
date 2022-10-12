import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutePaginationSizeSelectorComponent } from './pagination-route-size-selector.component';

describe('RoutePaginationSizeSelectorComponent', () => {
  let component: RoutePaginationSizeSelectorComponent;
  let fixture: ComponentFixture<RoutePaginationSizeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RoutePaginationSizeSelectorComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoutePaginationSizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

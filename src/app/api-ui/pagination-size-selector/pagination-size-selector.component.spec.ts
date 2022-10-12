import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PaginationSizeSelectorComponent } from './pagination-size-selector.component';

describe('PaginationSizeSelectorComponent', () => {
  let component: PaginationSizeSelectorComponent;
  let fixture: ComponentFixture<PaginationSizeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PaginationSizeSelectorComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationSizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

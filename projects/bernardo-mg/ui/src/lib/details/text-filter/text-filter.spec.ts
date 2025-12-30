import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFilter } from './text-filter';

describe('TextFilter', () => {
  let component: TextFilter;
  let fixture: ComponentFixture<TextFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

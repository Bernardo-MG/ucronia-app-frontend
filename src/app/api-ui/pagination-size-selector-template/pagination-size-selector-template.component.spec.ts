import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

import { PaginationSizeSelectorTemplateComponent } from './pagination-size-selector-template.component';

describe('PaginationSizeSelectorTemplateComponent', () => {
  let component: PaginationSizeSelectorTemplateComponent;
  let fixture: ComponentFixture<PaginationSizeSelectorTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationSizeSelectorTemplateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationSizeSelectorTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one option for each size received', () => {
    component.sizes = [1, 2, 3];
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options.length).toEqual(3);
  });

  it('should select the selected value', () => {
    component.sizes = [1, 2, 3];
    component.selected = 2;
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options[0].selected).toEqual(false);
    expect(options[1].selected).toEqual(true);
    expect(options[2].selected).toEqual(false);
  });

  it('should send an event to change size when selecting a value', () => {
    component.sizes = [1, 2, 3];
    component.selected = 2;
    fixture.detectChanges();

    let size: number | undefined;
    component.selectSize.pipe(first()).subscribe((p: number) => size = p);

    const select = fixture.nativeElement.querySelector('select');
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));

    expect(size).toEqual(2);
  });

});

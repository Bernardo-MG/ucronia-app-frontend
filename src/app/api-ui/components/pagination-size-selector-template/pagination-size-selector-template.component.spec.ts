import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should create no option when no values were received', () => {
    component.sizes = [];
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options.length).toEqual(0);
  });

  it('should create one option for each size value received', () => {
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

  it('should select the default value for a selected value outside the list', () => {
    component.sizes = [1, 2, 3];
    component.selected = 100;
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options[0].selected).toEqual(true);
    expect(options[1].selected).toEqual(false);
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

  it('should disable the input when the component is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select');
    expect(select.disabled).toEqual(true);
  });

  it('should enable the input when the component is enabled', () => {
    component.disabled = false;
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('select');
    expect(select.disabled).toEqual(false);
  });

});

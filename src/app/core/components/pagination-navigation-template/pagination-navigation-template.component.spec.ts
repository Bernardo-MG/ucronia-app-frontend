import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { first } from 'rxjs';
import { PaginationNavigationTemplateComponent } from './pagination-navigation-template.component';

describe('PaginationNavigationTemplateComponent', () => {
  let component: PaginationNavigationTemplateComponent;
  let fixture: ComponentFixture<PaginationNavigationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        PaginationNavigationTemplateComponent
      ]
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

  // Display info

  it('should show total pages', () => {
    component.totalPages = 10;
    fixture.detectChanges();

    const total = fixture.nativeElement.querySelector('#total_pages');
    expect(total.textContent).toEqual('10');
  });

  // Disable based on status flags

  it('should disable the previous button by default', () => {
    const button = fixture.nativeElement.querySelector('#go_to_previous_page');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the next button by default', () => {
    const button = fixture.nativeElement.querySelector('#go_to_next_page');
    expect(button.disabled).toEqual(true);
  });

  it('should disable the previous button when it is the first page', () => {
    component.first = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_previous_page');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the previous button when it is not the first page', () => {
    component.first = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_previous_page');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the next button when it is the last page', () => {
    component.last = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_next_page');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the next button when it is not the last page', () => {
    component.last = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_next_page');
    expect(button.disabled).toEqual(false);
  });

  // Disable status

  it('should disable the backward button when the component is disabled', () => {
    component.first = false;
    component.last = false;
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_previous_page');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the backward button when the component is enabled', () => {
    component.first = false;
    component.last = false;
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_previous_page');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the forward button when the component is disabled', () => {
    component.first = false;
    component.last = false;
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_next_page');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the forward button when the component is enabled', () => {
    component.first = false;
    component.last = false;
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_next_page');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the go to page input when the component is disabled', () => {
    component.first = false;
    component.last = false;
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_page');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the go to page input when the component is enabled', () => {
    component.first = false;
    component.last = false;
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_page');
    expect(button.disabled).toEqual(false);
  });

  // Event handling

  it('should send an event to go to the previous page when clicking the previous button', () => {
    component.page = 2;
    fixture.detectChanges();

    let page: number | undefined;
    component.goTo.pipe(first()).subscribe((p: number) => page = p);

    const button = fixture.debugElement.query(By.css('#go_to_previous_page'));
    button.triggerEventHandler('click');

    expect(page).toEqual(1);
  });

  it('should send an event to go to the next page when clicking the next button', () => {
    component.page = 2;
    fixture.detectChanges();

    let page: number | undefined;
    component.goTo.pipe(first()).subscribe((p: number) => page = p);

    const button = fixture.debugElement.query(By.css('#go_to_next_page'));
    button.triggerEventHandler('click');

    expect(page).toEqual(3);
  });

  it('should send an event to go to the chosen page when writing in the page input', () => {
    let page: number | undefined;
    component.goTo.pipe(first()).subscribe((p: number) => page = p);

    const input = fixture.nativeElement.querySelector('#go_to_page');
    input.value = '1';
    input.dispatchEvent(new Event('input'));

    // The index starts on 0, so it should be one value less than the input
    expect(page).toEqual(0);
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

import { PaginationNavigationTemplateComponent } from './pagination-navigation-template.component';

describe('PaginationNavigationTemplateComponent', () => {
  let component: PaginationNavigationTemplateComponent;
  let fixture: ComponentFixture<PaginationNavigationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationNavigationTemplateComponent]
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

  it('should show total pages', () => {
    component.pageInfo.totalPages = 10;
    fixture.detectChanges();

    const total = fixture.nativeElement.querySelector('#total_pages');
    expect(total.textContent).toEqual('10');
  });

  it('should disable the previous button when it is the first page', () => {
    component.pageInfo.first = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_previous_page');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the previous button when it is not the first page', () => {
    component.pageInfo.first = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_previous_page');
    expect(button.disabled).toEqual(false);
  });

  it('should disable the next button when it is the last page', () => {
    component.pageInfo.last = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_next_page');
    expect(button.disabled).toEqual(true);
  });

  it('should enable the next button when it is not the last page', () => {
    component.pageInfo.last = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('#go_to_next_page');
    expect(button.disabled).toEqual(false);
  });

  it('should send an event to go to the previous page when clicking the previous button', () => {
    component.pageInfo.page = 2;
    fixture.detectChanges();

    let page: number | undefined;
    component.goTo.pipe(first()).subscribe((p: number) => page = p);

    const button = fixture.debugElement.query(By.css('#go_to_previous_page'));
    button.triggerEventHandler('click');

    expect(page).toEqual(1);
  });

  it('should send an event to go to the next page when clicking the next button', () => {
    component.pageInfo.page = 2;
    fixture.detectChanges();

    let page: number | undefined;
    component.goTo.pipe(first()).subscribe((p: number) => page = p);

    const button = fixture.debugElement.query(By.css('#go_to_next_page'));
    button.triggerEventHandler('click');

    expect(page).toEqual(3);
  });

  it('should send an event to go to the chosen page when writing in the page input', () => {
    component.pageInfo.page = 2;
    fixture.detectChanges();

    let page: number | undefined;
    component.goTo.pipe(first()).subscribe((p: number) => page = p);

    const input = fixture.debugElement.query(By.css('#go_to_page'));
    input.triggerEventHandler('keyup');

    expect(page).toEqual(3);
  });

});

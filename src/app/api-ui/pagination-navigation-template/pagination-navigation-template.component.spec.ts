import { ComponentFixture, TestBed } from '@angular/core/testing';

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

  it('should disable the back button when it is the first page', () => {
    component.pageInfo.first = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[0];
    expect(button.disabled).toEqual(true);
  });

  it('should enable the back button when it is not the first page', () => {
    component.pageInfo.first = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[0];
    expect(button.disabled).toEqual(false);
  });

  it('should disable the forward button when it is the last page', () => {
    component.pageInfo.last = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button.disabled).toEqual(true);
  });

  it('should enable the forward button when it is not the last page', () => {
    component.pageInfo.last = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button.disabled).toEqual(false);
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackwardIconComponent } from '@app/shared/icons/icon-backward/icon-backward.component';
import { ForwardIconComponent } from '@app/shared/icons/icon-forward/icon-forward.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageButtonComponent } from '../page-button/page-button.component';
import { PaginationTemplateComponent } from './pagination-template.component';

describe('PaginationTemplateComponent', () => {
  let component: PaginationTemplateComponent;
  let fixture: ComponentFixture<PaginationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        IconsModule
      ],
      declarations: [
        PaginationTemplateComponent,
        PageButtonComponent,
        BackwardIconComponent,
        ForwardIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // **************************************************************************
  // List structure
  // **************************************************************************

  it('by default only the backward and forward list items exist', () => {
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(4);
  });

  it('should add a list item when receiving a page for the left range', () => {
    component.left = [1];
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(5);
  });

  it('should add no list items when receiving a page for the right range when there is no left range', () => {
    component.right = [5];
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(4);
  });

  it('should add list items, including separator, when receiving a page for the right range and there is a left range', () => {
    component.left = [1];
    component.right = [5];
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(7);
  });

  it('should add no list items when receiving a page for the center range when there is no left range', () => {
    component.center = [5];
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(4);
  });

  it('should add list items, including separator, when receiving a page for the center range and there is a left range', () => {
    component.left = [1];
    component.center = [5];
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(7);
  });

  it('should add no list items when receiving a page for the center and right ranges when there is no left range', () => {
    component.center = [5];
    component.right = [10];
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(4);
  });

  it('should add list items, including separator, when receiving a page for the center and right ranges and there is a left range', () => {
    component.left = [1];
    component.center = [5];
    component.right = [10];
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toEqual(9);
  });

  // **************************************************************************
  // Page buttons
  // **************************************************************************

  it('should add a page button when receiving a page for the left range', () => {
    component.left = [1];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(1);
  });

  it('should add multiple page buttons when receiving multiple pages for the left range', () => {
    component.left = [1, 2, 3];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(3);
  });

  it('should add no page button when receiving a page for the right range when there is no left range', () => {
    component.right = [5];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(0);
  });

  it('should add a page button when receiving a page for the right range and there is a left range', () => {
    component.left = [1];
    component.right = [5];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(2);
  });

  it('should add multiple page buttons when receiving multiple pages for left and right ranges', () => {
    component.left = [1, 2, 3];
    component.right = [5, 6, 7];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(6);
  });

  it('should add no page button when receiving a page for the center range when there is no left range', () => {
    component.center = [5];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(0);
  });

  it('should add a page button when receiving a page for the center range and there is a left range', () => {
    component.left = [1];
    component.center = [5];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(2);
  });

  it('should add multiple page buttons when receiving multiple pages for left and center ranges', () => {
    component.left = [1, 2, 3];
    component.center = [5, 6, 7];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(6);
  });

  it('should add no page button when receiving pages for the center and right ranges when there is no left range', () => {
    component.center = [5];
    component.right = [10];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(0);
  });

  it('should add multiple page buttons when receiving a page for each range', () => {
    component.left = [1];
    component.center = [5];
    component.right = [10];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(3);
  });

  it('should add multiple page buttons when receiving multiple pages for each range', () => {
    component.left = [1, 2, 3];
    component.center = [5, 6, 7];
    component.right = [10, 11, 12];
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('dnd5-page-button button');
    expect(button.length).toEqual(9);
  });

  // **************************************************************************
  // Disable based on first and last flags
  // **************************************************************************

  it('should disable the go to first button by default', () => {
    const button = fixture.nativeElement.querySelectorAll('button')[0];
    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button by default', () => {
    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button.disabled).toEqual(true);
  });

  it('should disable the forward button by default', () => {
    const button = fixture.nativeElement.querySelectorAll('button')[2];
    expect(button.disabled).toEqual(true);
  });

  it('should disable the go to last button by default', () => {
    const button = fixture.nativeElement.querySelectorAll('button')[3];
    expect(button.disabled).toEqual(true);
  });

  it('should disable the go to first button when its disable flag is set', () => {
    component.disableBackward = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[0];
    expect(button.disabled).toEqual(true);
  });

  it('should disable the backward button when its disable flag is set', () => {
    component.disableBackward = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button.disabled).toEqual(true);
  });

  it('should enable the go to first button when its disable flag is not set', () => {
    component.disableBackward = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[0];
    expect(button.disabled).toEqual(false);
  });

  it('should enable the backward button when its disable flag is not set', () => {
    component.disableBackward = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button.disabled).toEqual(false);
  });

  it('should disable the forward button when its disable flag is set', () => {
    component.disableForward = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[2];
    expect(button.disabled).toEqual(true);
  });

  it('should disable the go to last button when its disable flag is set', () => {
    component.disableForward = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[3];
    expect(button.disabled).toEqual(true);
  });

  it('should enable the forward button when its disable flag is not set', () => {
    component.disableForward = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[2];
    expect(button.disabled).toEqual(false);
  });

  it('should enable the go to last button when its disable flag is not set', () => {
    component.disableForward = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[3];
    expect(button.disabled).toEqual(false);
  });

  // **************************************************************************
  // Disable based on disable flag
  // **************************************************************************

  it('should disable the backward button when the component is disabled', () => {
    component.disableBackward = false;
    component.disableForward = false;
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[0];
    expect(button.disabled).toEqual(true);
  });

  it('should enable the backward button when the component is enabled', () => {
    component.disableBackward = false;
    component.disableForward = false;
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[0];
    expect(button.disabled).toEqual(false);
  });

  it('should disable the forward button when the component is disabled', () => {
    component.disableBackward = false;
    component.disableForward = false;
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button.disabled).toEqual(true);
  });

  it('should enable the forward button when the component is enabled', () => {
    component.disableBackward = false;
    component.disableForward = false;
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button.disabled).toEqual(false);
  });

  it('should disable the page buttons when the component is disabled', () => {
    component.disableBackward = false;
    component.disableForward = false;
    component.disabled = true;
    component.left = [1];
    component.center = [3];
    component.right = [5];
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('dnd5-page-button button.disabled');
    expect(buttons.length).toEqual(3);
  });

});

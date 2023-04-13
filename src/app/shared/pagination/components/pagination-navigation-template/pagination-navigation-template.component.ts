import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Pagination component template.
 * 
 * Contains only the display logic, and will draw a pagination navigation based on three page ranges: one for the
 * left, center and right.
 * 
 * These are split by ellipsis, so having a left range as [1, 2, 3], center as [5, 6, 7] and right as [9, 10 ,11]
 * this will show a list of pages like "1, 2, 3 ... 5, 6, 7 ... 9, 10, 11".
 */
@Component({
  selector: 'shared-pagination-navigation-template',
  templateUrl: './pagination-navigation-template.component.html',
  styleUrls: ['./pagination-navigation-template.component.sass']
})
export class PaginationNavigationTemplateComponent {

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * First page number.
   */
  @Input() public first = 1;

  /**
   * Last page number.
   */
  @Input() public last = 1;

  /**
   * Disabled flag. To disable all the inner components.
   */
  @Input() public disabled = false;

  /**
   * Disabled backward flag. To disable the backward button.
   */
  @Input() public disableBackward = true;

  /**
   * Disabled forward flag. To disable the forward button.
   */
  @Input() public disableForward = true;

  /**
   * Left page range.
   */
  @Input() public left: number[] = [];

  /**
   * Center page range.
   */
  @Input() public center: number[] = [];

  /**
   * Right page range.
   */
  @Input() public right: number[] = [];

  /**
   * "Go to page" event emitter.
   */
  @Output() public goTo = new EventEmitter<number>();

  /**
   * Sends a "go to page" event for the first page.
   */
  public onGoToFirst() {
    this.goTo.emit(this.first);
  }

  /**
   * Sends a "go to page" event for the previous page.
   */
  public onBackward() {
    this.goTo.emit(this.current - 1);
  }

  /**
   * Sends a "go to page" event for the last page.
   */
  public onGoToLast() {
    this.goTo.emit(this.last);
  }

  /**
   * Sends a "go to page" event for the next page.
   */
  public onForward() {
    this.goTo.emit(this.current + 1);
  }

  /**
   * Sends a "go to page" event for selected page.
   */
  public onGoTo(page: number) {
    this.goTo.emit(page);
  }

  /**
   * Indicates if the backward button should be disabled.
   * 
   * @returns true if the backward button should be disabled, false otherwise
   */
  public isBackwardDisabled(): boolean {
    return ((this.disableBackward) || (this.disabled));
  }

  /**
   * Indicates if the forward button should be disabled.
   * 
   * @returns true if the forward button should be disabled, false otherwise
   */
  public isForwardDisabled(): boolean {
    return ((this.disableForward) || (this.disabled));
  }

  /**
   * Indicates if the center range should be drawn. This depends on both the left and center range having values.
   * 
   * @returns true if the center range should be drawn, false otherwise
   */
  public isAbleToDrawCenterRange() {
    return ((this.left.length > 0) && (this.center.length > 0));
  }

  /**
   * Indicates if the right range should be drawn. This depends on both the left and right range having values.
   * 
   * @returns true if the right range should be drawn, false otherwise
   */
  public isAbleToDrawRightRange() {
    return ((this.left.length > 0) && (this.right.length > 0));
  }

  /**
   * Indicates if the received page is the current page.
   * 
   * @param page page to check
   * @returns true if the page matches the current page, false otherwise
   */
  public isCurrent(page: number) {
    return page === this.current;
  }

  /**
   * Returns the current page aria label, if the received page is the current one.
   * 
   * @param page page to check
   * @returns the current page aria label
   */
  public getCurrentLabel(page: number) {
    let label;

    if (this.isCurrent(page)) {
      // Current page
      label = 'page';
    } else {
      // Any other page
      label = '';
    }

    return label;
  }

}

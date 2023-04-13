import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginationRanges } from '../../models/range/pagination-ranges';

/**
 * Pagination component. Wraps the generic pagination template, and makes use of PaginationRanges to build the ranges.
 */
@Component({
  selector: 'shared-pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent implements OnChanges {

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  /**
   * Disabled flag. To disable all the inner components.
   */
  @Input() public disabled = false;

  /**
   * "Go to page" event emitter. Repeats the wrapped component event.
   */
  @Output() public goTo = new EventEmitter<number>();

  /**
   * Left page range.
   */
  public left: number[] = [];

  /**
   * Center page range.
   */
  public center: number[] = [];

  /**
   * Right page range.
   */
  public right: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const ranges = new PaginationRanges(this.current, this.pages);
    this.left = ranges.left;
    this.center = ranges.center;
    this.right = ranges.right;
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
    return this.current === 1;
  }

  /**
   * Indicates if the forward button should be disabled.
   * 
   * @returns true if the forward button should be disabled, false otherwise
   */
  public isForwardDisabled(): boolean {
    return this.current === this.pages;
  }

}

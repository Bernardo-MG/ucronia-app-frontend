import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginationRanges } from '../../models/range/pagination-ranges';
import { PaginationNavigationTemplateComponent } from '../pagination-navigation-template/pagination-navigation-template.component';

/**
 * Pagination component. Wraps the generic pagination template, and makes use of PaginationRanges to build the ranges.
 */
@Component({
  selector: 'pagination-navigation',
  standalone: true,
  imports: [PaginationNavigationTemplateComponent],
  templateUrl: './pagination-navigation.component.html'
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

  /**
   * Invalid status flag. Disables the component if the inputs are incoherent.
   */
  public invalid = false;

  /**
   * Indicates if the backward button should be disabled.
   * 
   * @returns true if the backward button should be disabled, false otherwise
   */
  public get disableBackward(): boolean {
    return ((this.invalid) || (this.current <= 1));
  }

  /**
   * Indicates if the forward button should be disabled.
   * 
   * @returns true if the forward button should be disabled, false otherwise
   */
  public get disableForward(): boolean {
    return ((this.invalid) || (this.current >= this.pages));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['current']) || (changes['pages'])) {
      this.invalid = ((this.current < 1) || (this.current > this.pages));

      if (this.invalid) {
        // Invalid inputs
        // Can't show meaningful ranges
        this.left = [];
        this.center = [];
        this.right = [];
      } else {
        const ranges = new PaginationRanges(this.current, this.pages);
        this.left = ranges.left;
        this.center = ranges.center;
        this.right = ranges.right;
      }
    }
  }

  /**
   * Sends a "go to page" event for selected page.
   */
  public onGoTo(page: number) {
    this.goTo.emit(page);
  }

}

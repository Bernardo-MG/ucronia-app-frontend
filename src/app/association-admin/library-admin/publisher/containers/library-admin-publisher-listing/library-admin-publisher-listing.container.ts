import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Publisher } from '@app/models/library/publisher';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, BlockUiDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { PublisherAdminService } from '../../services/publisher-admin.service';

@Component({
  selector: 'assoc-library-admin-publisher-listing',
  imports: [CommonModule, RouterModule, ArticleComponent, PaginationInfoComponent, IconAddComponent, SortingButtonComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, BlockUiDirective],
  templateUrl: './library-admin-publisher-listing.container.html'
})
export class LibraryAdminPublisherListingContainer implements OnInit, OnChanges {

  private authContainer = inject(AuthContainer);

  private service = inject(PublisherAdminService);

  @Input() public pageNumber = 0;

  @Output() public wait = new EventEmitter<boolean>();

  @Output() public changePage = new EventEmitter<PaginatedResponse<any>>();

  public data = new PaginatedResponse<Publisher>();

  /**
   * Loading flag.
   */
  public reading = false;

  public createPermission = false;

  private sort = new Sorting();

  public ngOnInit(): void {
    // Load books
    this.load(0)
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_publisher", "create");
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageNumber']) {
      this.load(this.pageNumber);
    }
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.pageNumber);
  }

  public load(page: number) {
    this.reading = true;
    this.wait.emit(this.reading);

    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;
        this.changePage.emit(response);

        // Reactivate view
        this.reading = false;
        this.wait.emit(this.reading);
      },
      error: error => {
        // Reactivate view
        this.reading = false;
        this.wait.emit(this.reading);
      }
    });
  }

}

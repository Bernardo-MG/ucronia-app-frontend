import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryAdminBookLendingLendComponent } from '@app/association-admin/library-admin/book/components/library-admin-book-lending/library-admin-book-lending.component';
import { BookInfo } from '@app/models/library/book-info';
import { BookLent } from '@app/models/library/book-lent';
import { Member } from '@app/models/members/member';
import { Active } from '@app/models/person/active';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ArticleComponent } from '@bernardo-mg/layout';
import { PaginatedResponse } from '@bernardo-mg/request';
import { Observable } from 'rxjs';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-book-lending-lending',
  imports: [CommonModule, ArticleComponent, LibraryAdminBookLendingLendComponent],
  templateUrl: './library-admin-book-lending-lending.container.html'
})
export class LibraryAdminBookLendingLendContainer extends CreateComponent<BookLent> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(BookAdminService);

  public source: 'games' | 'fiction' = 'games';

  public book = new BookInfo();

  public readingMembers = false;

  public readonly createPermission;

  public members = new PaginatedResponse<Member>();

  public activeFilter = Active.Active;

  private index = -1;

  constructor(
    authContainer: AuthContainer
  ) {
    super();
    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('number');
      if (indexParam) {
        this.index = Number(indexParam);
      }

      const urlSegments = this.route.snapshot.url;
      const sourceSegment = urlSegments.length > 0 ? urlSegments[0].path : '';
      this.source = sourceSegment as 'games' | 'fiction';

      this.load();
    });
    // Check permissions
    this.createPermission = authContainer.hasPermission("library_lending", "create");
    this.onGoToMembersPage(0);
  }

  public onSaved() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private load() {
    if (this.source === 'games') {
      this.service.getOneGameBook(this.index).subscribe({
        next: response => {
          this.book = response;
        },
        error: error => {
        }
      });
    } else {
      this.service.getOneFictionBook(this.index).subscribe({
        next: response => {
          this.book = response;
        },
        error: error => {
        }
      });
    }
  }

  public onChangeActiveFilter(active: Active) {
    this.activeFilter = active;
    this.onGoToMembersPage(0);
  }

  public onGoToMembersPage(page: number) {
    this.readingMembers = true;
    // TODO: The page correction should be done automatically
    this.service.getMembers(page, this.activeFilter).subscribe({
      next: response => {
        this.members = response;

        // Reactivate view
        this.readingMembers = false;
      },
      error: error => {
        // Reactivate view
        this.readingMembers = false;
      }
    });
  }

  protected override save(toSave: BookLent): Observable<BookLent> {
    return this.service.lend(toSave);
  }

  protected override handleSaveSuccess(saved: BookLent) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}

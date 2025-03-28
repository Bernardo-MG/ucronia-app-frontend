import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryAdminBookLendingLendComponent } from '@app/association-admin/library-admin/shared/components/library-admin-book-lending/library-admin-book-lending.component';
import { Book } from '@app/models/library/book';
import { BookLent } from '@app/models/library/book-lent';
import { Member } from '@app/models/members/member';
import { Active } from '@app/models/person/active';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { ArticleComponent } from '@bernardo-mg/layout';
import { PaginatedResponse } from '@bernardo-mg/request';
import { Observable } from 'rxjs';
import { FictionBookAdminService } from '../../services/fiction-book-admin.service';

@Component({
  selector: 'assoc-library-admin-fiction-book-lending-lending',
  imports: [CommonModule, ArticleComponent, LibraryAdminBookLendingLendComponent],
  templateUrl: './library-admin-fiction-book-lending-lending.container.html'
})
export class LibraryAdminFictionBookLendingLendContainer extends CreateComponent<BookLent> implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private service = inject(FictionBookAdminService);

  private authContainer = inject(AuthContainer);

  public book = new Book();

  public readingMembers = false;

  public createPermission = false;

  public members = new PaginatedResponse<Member>();

  public activeFilter = Active.Active;

  private index = -1;

  public ngOnInit(): void {
    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('number');
      if (indexParam) {
        this.index = Number(indexParam);
      }
      this.load();
    });
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_lending", "create");
    this.onGoToMembersPage(0);
  }

  public onSaved() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private load() {
    this.service.getOne(this.index).subscribe({
      next: response => {
        this.book = response;
      },
      error: error => {
      }
    });
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

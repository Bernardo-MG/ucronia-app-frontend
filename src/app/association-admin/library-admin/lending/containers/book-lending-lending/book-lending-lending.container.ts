import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAdminService } from '@app/association-admin/library-admin/book/services/book-admin.service';
import { Active } from '@app/association/members/model/active';
import { MemberStatusSelectComponent } from '@app/association/members/shared/components/member-status-select/member-status-select.component';
import { Book } from '@app/models/library/book';
import { BookLent } from '@app/models/library/book-lent';
import { Member } from '@app/models/members/member';
import { AuthContainer } from '@bernardo-mg/authentication';
import { CreateComponent } from '@bernardo-mg/form';
import { IconBackwardComponent } from '@bernardo-mg/icons';
import { ArticleComponent, BlockUiDirective, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { PaginatedResponse } from '@bernardo-mg/request';
import { Observable } from 'rxjs';
import { BookLendingFormComponent } from '../../components/book-lending-form/book-lending-form.component';
import { BookLendingMemberSelectionComponent } from '../../components/book-lending-member-selection/book-lending-member-selection.component';
import { LibraryLendingService } from '../../services/library-lending.service';

@Component({
    selector: 'assoc-book-lending-lending',
    imports: [CommonModule, BookLendingMemberSelectionComponent, MemberStatusSelectComponent, BookLendingFormComponent, ArticleComponent, IconBackwardComponent, ResponsiveShortColumnsDirective, BlockUiDirective],
    templateUrl: './book-lending-lending.container.html'
})
export class BookLendingLendContainer extends CreateComponent<BookLent> implements OnInit {

  public book = new Book();

  public filled_bar = 0;

  public readingMembers = false;

  public selectedMember = false;

  public createPermission = false;

  public members = new PaginatedResponse<Member>();

  public member = new Member();

  public activeFilter = Active.Active;

  private index = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookAdminService,
    private service: LibraryLendingService,
    private authContainer: AuthContainer
  ) {
    super();
  }

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
    this.bookService.getOne(this.index).subscribe({
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

  public onReturnToMembers() {
    this.selectedMember = false;
    this.filled_bar = 0;
  }

  public onSelectMember(member: Member) {
    this.member = member;
    this.selectedMember = true;
    this.filled_bar = 50;
  }

  protected override save(toSave: BookLent): Observable<BookLent> {
    return this.service.lend(toSave);
  }

  protected override handleSaveSuccess(saved: BookLent) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}

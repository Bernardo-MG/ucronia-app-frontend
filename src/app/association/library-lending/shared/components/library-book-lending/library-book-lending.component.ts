import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberStatusSelectComponent } from '@app/association-admin/members/shared/components/member-status-select/member-status-select.component';
import { BookLendingFormComponent } from '@app/association/library-lending/core/components/book-lending-form/book-lending-form.component';
import { BookLendingMemberSelectionComponent } from '@app/association/library-lending/core/components/book-lending-member-selection/book-lending-member-selection.component';
import { LibraryLendingService } from '@app/association/library-lending/core/services/library-lending.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Book } from '@app/models/library/book';
import { BookLent } from '@app/models/library/book-lent';
import { Active } from '@app/models/members/active';
import { Member } from '@app/models/members/member';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'assoc-library-book-lending',
  standalone: true,
  imports: [CommonModule, IconsModule, BookLendingMemberSelectionComponent, MemberStatusSelectComponent, BookLendingFormComponent, BlockUiDirective],
  templateUrl: './library-book-lending.component.html'
})
export class LibraryBookLendingComponent extends CreateComponent<BookLent> implements OnInit {

  @Input() public book = new Book();

  @Output() public saved = new EventEmitter<void>();

  public filled_bar = 0;

  public readingMembers = false;

  public selectedMember = false;

  public createPermission = false;

  public memberPage = new PaginatedResponse<Member[]>([]);

  public member = new Member();

  public activeFilter = Active.Active;

  constructor(
    private service: LibraryLendingService,
    private authContainer: AuthContainer,
    rtr: Router,
    rt: ActivatedRoute
  ) {
    super(rtr, rt);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_lending", "create");
    this.onGoToMembersPage(0);
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
        this.memberPage = response;

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

  protected override getReturnRoute(saved: BookLent): string {
    return '';
  }

  protected override handleSaveSuccess(response: BookLent) {
    super.handleSaveSuccess(response);
    this.saved.emit();
  }

}

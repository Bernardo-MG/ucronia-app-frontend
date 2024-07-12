import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryLendingService } from '@app/association/library-lending/services/library-lending.service';
import { BookLent } from '@app/association/library/models/book-lent';
import { MemberStatusSelectComponent } from '@app/association/members/components/select/member-status-select/member-status-select.component';
import { Active } from '@app/association/members/models/active';
import { Member } from '@app/association/members/models/member';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { Observable } from 'rxjs';
import { BookLendingMemberSelectionComponent } from '../../book-lending-member-selection/book-lending-member-selection.component';
import { BookLendingFormComponent } from '../../data/book-lending-form/book-lending-form.component';

@Component({
  selector: 'assoc-library-book-lending',
  standalone: true,
  imports: [CommonModule, IconsModule, WaitingOverlayComponent, BookLendingMemberSelectionComponent, MemberStatusSelectComponent, BookLendingFormComponent],
  templateUrl: './library-book-lending.component.html'
})
export class LibraryBookLendingComponent extends CreateComponent<BookLent> implements OnInit {

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
    rt: Router
  ) {
    super(rt);
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

  protected override save(toSave: BookLent): Observable<BookLent> {
    return this.service.lend(toSave);
  }
  protected override getReturnRoute(saved: BookLent): string {
    return '';
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

}

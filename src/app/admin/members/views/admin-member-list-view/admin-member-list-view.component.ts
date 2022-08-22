import { Component } from '@angular/core';
import { Member } from '@app/models/member';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'admin-member-list-view',
  templateUrl: './admin-member-list-view.component.html',
  styleUrls: ['./admin-member-list-view.component.sass']
})
export class AdminMemberListViewComponent {

  public members: Member[] = [];

  public addIcon = faCirclePlus;
  public editIcon = faPenToSquare;
  public deleteIcon = faTrashCan;

  constructor(
    private service: AdminMemberService
  ) {
    this.service.getAll().subscribe(d => this.members = d);
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.service.getAll().subscribe(d => this.members = d);
    });
  }

}

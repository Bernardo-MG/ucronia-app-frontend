import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Member } from '@app/models/member';
import { faArrowLeftLong, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-member-create-view',
  templateUrl: './admin-member-create-view.component.html',
  styleUrls: ['./admin-member-create-view.component.sass']
})
export class AdminMemberCreateViewComponent {

  public data: Member = new Member();

  public backIcon = faArrowLeftLong;
  public saveIcon = faFloppyDisk;

  constructor(
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  save(): void {
  }

}

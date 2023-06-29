import { Component, Input, OnInit } from '@angular/core';
import { Member } from '@app/association/models/member';
import { AssociationStatsService } from '../../services/association-stats.service';

@Component({
  selector: 'app-active-members-list',
  templateUrl: './active-members-list.component.html',
  styleUrls: ['./active-members-list.component.sass']
})
export class ActiveMembersListComponent implements OnInit {

  @Input() public members: Member[] = [];

  constructor(
    private service: AssociationStatsService
  ) { }

  ngOnInit(): void {
    this.service.getActiveMembers(undefined).subscribe(m => this.members = m.content);
  }

}

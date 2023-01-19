import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'admin-member-stats-view',
  templateUrl: './member-stats-view.component.html',
  styleUrls: ['./member-stats-view.component.sass']
})
export class MemberStatsViewComponent implements OnInit {

  public activeCount = 0;

  constructor(
    private service: MemberService
  ) { }

  ngOnInit(): void {
    this.service.countActive().subscribe(r => this.activeCount = r);
  }

}

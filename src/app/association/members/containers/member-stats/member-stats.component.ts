import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-stats',
  templateUrl: './member-stats.component.html',
  styleUrls: ['./member-stats.component.sass']
})
export class MemberStatsComponent implements OnInit {

  public activeCount = 0;

  constructor(
    private service: MemberService
  ) { }

  ngOnInit(): void {
    this.service.countActive().subscribe(r => this.activeCount = r);
  }

}

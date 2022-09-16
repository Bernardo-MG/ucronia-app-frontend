import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeService } from '@app/crud/fees/services/fee.service';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-fee-edit-view',
  templateUrl: './fee-edit-view.component.html',
  styleUrls: ['./fee-edit-view.component.sass']
})
export class FeeEditViewComponent implements OnInit {

  public members: Member[] = [];

  public member = new Member();

  public fee: Fee = new Fee();

  public selectingMember = false;

  constructor(
    private route: ActivatedRoute,
    private service: FeeService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.service.getAllMembers().subscribe(d => this.members = d);
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Fee): void {
    this.service.update(data.id, data).subscribe(d => {
      this.router.navigate(['/fees']);
    });
  }

  public onDelete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.router.navigate(['/fees']);
    });
  }

  public onRequestMember(){
    this.selectingMember = true;
  }

  public onSelectMember(member: Member) {
    this.member = member;
    this.selectingMember = false;
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getOne(identifier)
        .subscribe(d => {
          this.fee = d;
        });
    }
  }

}

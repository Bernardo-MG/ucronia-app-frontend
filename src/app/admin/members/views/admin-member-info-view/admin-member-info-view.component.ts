import { Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '@app/models/member';
import { faArrowLeftLong, faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AdminMemberService } from '../../services/admin-member.service';

@Component({
  selector: 'app-member-info-view',
  templateUrl: './admin-member-info-view.component.html',
  styleUrls: ['./admin-member-info-view.component.sass']
})
export class AdminMemberInfoViewComponent {

  @Output() back = new EventEmitter<void>();

  public data: Member = new Member();

  public backIcon = faArrowLeftLong;
  public saveIcon = faFloppyDisk;
  public deleteIcon = faTrashCan;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private service: AdminMemberService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
  }

  delete(): void {
  }

  private load(id: string | null): void {
    if (id) {
      const identifier: number = Number(id);
      this.service.getMember(identifier)
        .subscribe(d => {
          if (d) {
            this.data = d
          } else {
            this.data = new Member();
          }
        });
    }
  }

}

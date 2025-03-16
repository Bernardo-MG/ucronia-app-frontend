import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '@app/association/members/services/member.service';
import { Member } from '@app/models/members/member';
import { ArticleComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { MemberDetailsComponent } from '../../components/member-details/member-details.component';

@Component({
  selector: 'assoc-member-info',
  imports: [CommonModule, ArticleComponent, MemberDetailsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './member-info.container.html'
})
export class MemberInfoContainer implements OnInit {

  public data = new Member();

  public view: string = 'details';

  public reading = false;

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private service: MemberService
  ) { }

  public ngOnInit(): void {
    // Get id
    this.route.paramMap.subscribe(params => {
      const numParam = params.get('number');
      if (numParam) {
        this.number = Number(numParam);
      }
      this.load();
    });
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

  private load(): void {
    this.reading = true;
    this.service.getOne(this.number)
      .subscribe({
        next: response => {
          this.data = response;
          this.reading = false;
        },
        error: error => {
          this.reading = false;
        }
      });
  }

}

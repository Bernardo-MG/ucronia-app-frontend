import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  private route = inject(ActivatedRoute);

  private service = inject(MemberService);

  public data = new Member();

  public view: string = 'details';

  public reading = false;

  public ngOnInit(): void {
    // Get id
    this.route.paramMap.subscribe(params => {
      const numParam = params.get('number');
      if (numParam) {
        this.load(Number(numParam));
      }
    });
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

  private load(id: number): void {
    this.reading = true;
    this.service.getOne(id)
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

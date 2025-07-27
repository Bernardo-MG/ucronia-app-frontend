import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '@app/association/members/services/member.service';
import { Member } from '@app/models/members/member';
import { ArticleComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { MemberDetailsComponent } from '../../components/member-details/member-details.component';

@Component({
  selector: 'assoc-member-info',
  imports: [CommonModule, ArticleComponent, MemberDetailsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './member-info.container.html'
})
export class MemberInfoContainer {

  private readonly service = inject(MemberService);

  public data = new Member();

  public view: string = 'details';

  public reading = false;

  constructor() {
    const route = inject(ActivatedRoute);

    // Get id
    route.paramMap.subscribe(params => {
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

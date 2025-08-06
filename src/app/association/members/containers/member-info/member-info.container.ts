
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '@app/association/members/services/member.service';
import { Member } from '@app/models/members/member';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-member-info',
  imports: [CardModule, SkeletonModule, ResponsiveShortColumnsDirective],
  templateUrl: './member-info.container.html'
})
export class MemberInfoContainer {

  private readonly service = inject(MemberService);

  public data = new Member();

  public view: string = 'details';

  public loading = false;

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
    this.loading = true;
    this.service.getOne(id)
      .subscribe({
        next: response => {
          this.data = response;
          this.loading = false;
        },
        error: error => {
          this.loading = false;
        }
      });
  }

}

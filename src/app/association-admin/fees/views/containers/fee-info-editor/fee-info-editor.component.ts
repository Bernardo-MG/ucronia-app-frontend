import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeEditFormComponent } from '@app/association-admin/fees/core/components/fee-edit-form/fee-edit-form.component';
import { FeeInfoComponent } from '@app/association-admin/fees/core/components/fee-info/fee-info.component';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { FeeService } from '../../../core/services/fee.service';
import { Fee } from '../../../../../models/fees/fee';

@Component({
  selector: 'assoc-fee-info-editor',
  standalone: true,
  imports: [CardModule, CommonModule, FeeEditFormComponent, FeeInfoComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './fee-info-editor.component.html'
})
export class FeeInfoEditorComponent extends InfoEditorStatusComponent<Fee> implements OnInit, AfterContentInit {

  private date: string = "";

  private memberNumber = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FeeService,
    private cdRef: ChangeDetectorRef,
    private authContainer: AuthContainer
  ) {
    super(new Fee());
  }

  public ngAfterContentInit(): void {
    // TODO: What is this for?
    this.cdRef.detectChanges();
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("fee", "update");
    this.deletable = this.authContainer.hasPermission("fee", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const dateParam = params.get('date');
      if(dateParam){
        this.date = dateParam;
      } else {
        this.date = '';
      }
      const memberNumberParam = params.get('memberNumber');
      if(memberNumberParam){
        this.memberNumber = Number(memberNumberParam);
      }
      this.load();
    });
  }

  public goToTransaction(index: number) {
    this.router.navigate([`association/adminfunds/transaction/${index}`]);
  }

  protected override delete(): void {
    this.service.delete(this.data.date, this.data.person.number).subscribe(r => {
      this.router.navigate([`../..`], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Fee> {
    return this.service.getOne(this.date, this.memberNumber);
  }

  protected override save(toSave: Fee): Observable<Fee> {
    return this.service.update(this.data.date, this.data.person.number, toSave);
  }

}

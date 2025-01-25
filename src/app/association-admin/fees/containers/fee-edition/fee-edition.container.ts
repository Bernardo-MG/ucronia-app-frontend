import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeEditionFormComponent } from '@app/association-admin/fees/components/fee-edition-form/fee-edition-form.component';
import { FeeInfoComponent } from '@app/association-admin/fees/components/fee-info/fee-info.component';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { RouterBreadcrumbComponent } from '@app/core/layout/components/router-breadcrumb/router-breadcrumb.component';
import { BreadcrumbLink } from '@app/core/layout/model/breadcrumb-link';
import { Fee } from '@app/models/fees/fee';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { FeeService } from '../../services/fee.service';

@Component({
    selector: 'assoc-fee-edition',
    imports: [CommonModule, FeeEditionFormComponent, FeeInfoComponent, ArticleComponent, CardComponent, CardBodyComponent, RouterBreadcrumbComponent, ResponsiveShortColumnsDirective],
    templateUrl: './fee-edition.container.html'
})
export class FeeEditionContainer extends InfoEditorStatusComponent<Fee> implements OnInit, AfterContentInit {

  private date: string = "";

  private memberNumber = -1;

  public levels = [new BreadcrumbLink('Cuotas', '../../'), new BreadcrumbLink('Editar', '')];

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
    this.router.navigate([`association/admin/funds/transaction/${index}`]);
  }

  protected override delete(): void {
    this.service.delete(this.data.month, this.data.person.number).subscribe(r => {
      this.router.navigate([`../..`], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Fee> {
    return this.service.getOne(this.date, this.memberNumber);
  }

  protected override save(toSave: Fee): Observable<Fee> {
    return this.service.update(this.data.month, this.data.person.number, toSave);
  }

}

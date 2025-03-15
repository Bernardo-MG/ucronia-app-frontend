import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeEditionFormComponent } from '@app/association-admin/fees/components/fee-edition-form/fee-edition-form.component';
import { FeeInfoComponent } from '@app/association-admin/fees/components/fee-info/fee-info.component';
import { Fee } from '@app/models/fees/fee';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ArticleComponent, BreadcrumbLink, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'assoc-fee-edition',
  imports: [CommonModule, FeeEditionFormComponent, FeeInfoComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './fee-edition.container.html'
})
export class FeeEditionContainer extends InfoEditorStatusComponent<Fee> implements OnInit, AfterContentInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private service = inject(FeeService);

  private cdRef = inject(ChangeDetectorRef);

  private authContainer = inject(AuthContainer);

  private date: string = "";

  private memberNumber = -1;

  public readonly levels = [new BreadcrumbLink('Cuotas', '../../'), new BreadcrumbLink('Editar', '')];

  constructor() {
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
      if (dateParam) {
        this.date = dateParam;
      } else {
        this.date = '';
      }
      const memberNumberParam = params.get('memberNumber');
      if (memberNumberParam) {
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

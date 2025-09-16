
import { AfterContentInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeEditionForm } from '@app/association-admin/fees/components/fee-edition-form/fee-edition-form';
import { Fee, FeeTransaction } from '@app/domain/fees/fee';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ControlButtonsComponent, InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { FeeService } from '../../services/fee-service';

@Component({
  selector: 'assoc-fee-edition',
  imports: [CardModule, SkeletonModule, FeeEditionForm, ControlButtonsComponent, ResponsiveShortColumnsDirective],
  templateUrl: './fee-edition.html'
})
export class FeeEdition extends InfoEditorStatusComponent<Fee> implements AfterContentInit {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(FeeService);

  private readonly cdRef = inject(ChangeDetectorRef);

  private date: string = "";

  private memberNumber = -1;

  constructor() {
    super(new Fee());

    const authContainer = inject(AuthContainer);

    // Check permissions
    this.editable = authContainer.hasPermission("fee", "update");
    this.deletable = authContainer.hasPermission("fee", "delete");

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

  public ngAfterContentInit(): void {
    // TODO: What is this for?
    this.cdRef.detectChanges();
  }

  public selectPayment() {
    if (this.data.transaction) {
      const payment = this.data.transaction as FeeTransaction
      this.router.navigate([`association/admin/funds/transaction/${payment.index}`]);
    }
  }

  public goToTransaction(index: number) {
    this.router.navigate([`association/admin/funds/transaction/${index}`]);
  }

  public isPaymentDisabled(): boolean {
    return (this.waiting) || (this.data.transaction === null);
  }

  protected override delete(): void {
    this.service.delete(this.data.month, this.data.member.number).subscribe(r => {
      this.router.navigate([`../..`], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Fee> {
    return this.service.getOne(this.date, this.memberNumber);
  }

  protected override save(toSave: Fee): Observable<Fee> {
    return this.service.update(this.data.month, this.data.member.number, toSave);
  }

}

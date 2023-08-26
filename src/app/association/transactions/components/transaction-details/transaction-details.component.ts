import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { Failure } from '@app/core/api/models/failure';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-details',
  templateUrl: './transaction-details.component.html'
})
export class TransactionDetailsComponent implements OnInit {

  /**
   * Reading flag.
   */
  public reading = false;

  /**
   * Saving flag.
   */
  public saving = false;

  public editing = false;

  public editPermission = false;

  public deletePermission = false;

  public error = false;

  public data = new Transaction();

  public failures: { [key: string]: Failure[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransactionService,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.editPermission = this.authService.hasPermission("transaction", "update");
    this.deletePermission = this.authService.hasPermission("transaction", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      this.load(params.get('id'));
    });
  }

  public onSave(data: Transaction): void {
    this.saving = true;
    this.service.update(data.id, data).subscribe({
      next: d => {
        this.failures = {};
        // Reactivate view
        this.saving = false;
        this.editing = false;
      },
      error: error => {
        if (error.failures) {
          this.failures = error.failures;
        } else {
          this.failures = {};
        }
        // Reactivate view
        this.saving = false;
        this.editing = false;
      }
    });
  }

  public onDelete(): void {
    this.service.delete(this.data.id).subscribe(r => {
      this.router.navigate([`/members/list`]);
    });
  }

  public onStartEditing(): void {
    this.editing = true;
  }

  private load(id: string | null): void {
    if (id) {
      this.reading = true;
      const identifier = Number(id);
      this.service.getOne(identifier)
        .subscribe({
          next: d => {
            this.data = d;
            this.reading = false;
          },
          error: error => {
            this.reading = false;
            this.error = true;
          }
        });
    }
  }

  public isEditable() {
    return this.editPermission && this.editing && (!this.error);
  }

  public isWaiting() {
    return this.reading || this.saving;
  }

}

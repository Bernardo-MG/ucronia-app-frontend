import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from '@app/association/models/transaction';
import { Failure } from '@app/core/api/models/failure';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'assoc-transaction-create',
  templateUrl: './transaction-create.component.html'
})
export class TransactionCreateComponent {

  /**
   * Loading flag.
   */
  public saving = false;

  public failures = new Map<string, Failure[]>();

  public form: FormGroup;

  public valid = false;

  constructor(
    private service: TransactionService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      description: ['', Validators.required],
      date: [null, Validators.required],
      amount: [0, Validators.required]
    });
  }

  public ngOnInit(): void {
    // Listen for status changes
    this.form.statusChanges.subscribe(status => {
      this.valid = (status === "VALID");
    });
  }

  public onSave(): void {
    const data: Transaction = this.form.value;
    this.saving = true;
    this.service.create(data).subscribe({
      next: d => {
        this.router.navigate([`/transactions/${d.id}`]);
        this.failures = new Map<string, Failure[]>();
        // Reactivate view
        this.saving = false;
      },
      error: error => {
        if(error.failures){
          this.failures = error.failures;
        } else {
          this.failures = new Map<string, Failure[]>();
        }
        // Reactivate view
        this.saving = false;
      }
    });
  }

  public isAbleToSave() {
    return ((this.valid) && (!this.saving));
  }

}

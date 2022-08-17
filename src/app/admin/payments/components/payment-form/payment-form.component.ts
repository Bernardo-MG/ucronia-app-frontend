import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from '@app/models/payment';

@Component({
  selector: 'admin-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.sass']
})
export class PaymentFormComponent {

  @Input() payment: FormGroup = this.fb.group({
    description: ['', Validators.required],
    day: [0, Validators.required],
    month: [0, Validators.required],
    year: [0, Validators.required],
    quantity: [0, Validators.required],
    type: ['', Validators.required]
  });

  @Output() save = new EventEmitter<Payment>();

  constructor(
    private fb: FormBuilder
  ) { }

  public saveData() {
    this.save.emit(this.payment.value);
  }

}

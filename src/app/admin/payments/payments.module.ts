import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsRoutingModule } from './payments-routing.module';
import { AdminPaymentCreateViewComponent } from './views/admin-payment-create-view/admin-payment-create-view.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ControlsModule } from '@app/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminPaymentCreateViewComponent,
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaymentsRoutingModule,
    ControlsModule
  ]
})
export class PaymentsModule { }

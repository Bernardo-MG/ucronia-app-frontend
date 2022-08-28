import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { BalanceRoutingModule } from './balance-routing.module';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { AdminBalanceTransactionCreateViewComponent } from './views/admin-balance-transaction-create-view/admin-balance-transaction-create-view.component';
import { AdminBalanceViewComponent } from './views/admin-balance-view/admin-balance-view.component';



@NgModule({
  declarations: [
    AdminBalanceViewComponent,
    AdminBalanceTransactionCreateViewComponent,
    TransactionFormComponent
  ],
  imports: [
    CommonModule,
    BalanceRoutingModule,
    ReactiveFormsModule,
    ControlsModule
  ]
})
export class BalanceModule { }

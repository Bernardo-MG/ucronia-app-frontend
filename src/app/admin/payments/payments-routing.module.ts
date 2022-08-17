import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPaymentCreateViewComponent } from './views/admin-payment-create-view/admin-payment-create-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'create', component: AdminPaymentCreateViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentsRoutingModule { }
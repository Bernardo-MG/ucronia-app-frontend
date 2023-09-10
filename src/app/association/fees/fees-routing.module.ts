import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeCalendarInfoComponent } from './components/fee-calendar-info/fee-calendar-info.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeeLayoutComponent } from './components/fee-layout/fee-layout.component';
import { FeePayComponent } from './components/fee-pay/fee-pay.component';


const routes: Routes = [
  {
    path: '',
    component: FeeLayoutComponent,
    children: [
      { path: '', component: FeeCalendarInfoComponent },
      { path: 'calendar', component: FeeCalendarInfoComponent },
      { path: 'pay', component: FeePayComponent },
      { path: ':id', component: FeeDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
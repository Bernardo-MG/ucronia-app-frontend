import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundsCreateComponent } from './components/funds-create/funds-create.component';
import { FundsDetailsComponent } from './components/funds-details/funds-details.component';
import { FundsFrontpageComponent } from './components/funds-frontpage/funds-frontpage.component';


const routes: Routes = [
  { path: '', component: FundsFrontpageComponent },
  { path: 'calendar', component: FundsFrontpageComponent },
  { path: 'add', component: FundsCreateComponent },
  { path: 'transaction/:id', component: FundsDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }

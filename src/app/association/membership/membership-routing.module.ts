import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeInfoEditorComponent } from '../fees/components/fee-info-editor/fee-info-editor.component';
import { FeePayComponent } from '../fees/components/fee-pay/fee-pay.component';
import { MembershipFrontpageComponent } from './components/membership-frontpage/membership-frontpage.component';


const routes: Routes = [
  { path: 'pay', component: FeePayComponent },
  { path: 'fee/:date/:memberNumber', component: FeeInfoEditorComponent },
  { path: '', component: MembershipFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }
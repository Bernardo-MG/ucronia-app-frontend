import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeFrontpageComponent } from './components/views/fee-frontpage/fee-frontpage.component';
import { FeeInfoEditorComponent } from './components/views/fee-info-editor/fee-info-editor.component';
import { FeePayComponent } from './components/views/fee-pay/fee-pay.component';


const routes: Routes = [
  { path: 'pay', component: FeePayComponent },
  { path: ':date/:memberNumber', component: FeeInfoEditorComponent },
  { path: '', component: FeeFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
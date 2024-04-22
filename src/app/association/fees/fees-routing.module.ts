import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { FeeFrontpageComponent } from './components/views/fee-frontpage/fee-frontpage.component';
import { FeeInfoEditorComponent } from './components/views/fee-info-editor/fee-info-editor.component';
import { FeePayComponent } from './components/views/fee-pay/fee-pay.component';


const routes: Routes = [
  { path: '', component: FeeFrontpageComponent },
  { path: 'pay', component: FeePayComponent, canActivate: [ResourceGuard("fee", "create")] },
  { path: ':date/:memberNumber', component: FeeInfoEditorComponent, canActivate: [ResourceGuard("fee", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
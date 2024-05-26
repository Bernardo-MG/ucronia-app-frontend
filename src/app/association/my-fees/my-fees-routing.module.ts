import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyFeesFrontpageComponent } from './components/views/my-fees-frontpage/my-fees-frontpage.component';


const routes: Routes = [
  { path: '', component: MyFeesFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFeesRoutingModule { }
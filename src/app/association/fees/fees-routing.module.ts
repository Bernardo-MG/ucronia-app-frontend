import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeCalendarInfoComponent } from './components/fee-calendar-info/fee-calendar-info.component';
import { FeeCreateComponent } from './components/fee-create/fee-create.component';
import { FeeDetailsComponent } from './components/fee-details/fee-details.component';
import { FeeLayoutComponent } from './components/fee-layout/fee-layout.component';
import { FeeListComponent } from './components/fee-list/fee-list.component';


const routes: Routes = [
  {
    path: '',
    component: FeeLayoutComponent,
    children: [
      { path: '', component: FeeCalendarInfoComponent },
      { path: 'list', component: FeeListComponent },
      { path: 'calendar', component: FeeCalendarInfoComponent },
      { path: 'create', component: FeeCreateComponent },
      { path: ':id', component: FeeDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
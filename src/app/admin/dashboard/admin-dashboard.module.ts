import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardViewComponent } from './views/admin-dashboard-view/admin-dashboard-view.component';



@NgModule({
  declarations: [
    AdminDashboardViewComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }

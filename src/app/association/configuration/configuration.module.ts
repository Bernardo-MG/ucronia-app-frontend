import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ConfigurationLayoutComponent } from './components/configuration-layout/configuration-layout.component';



@NgModule({
  declarations: [
    ConfigurationComponent,
    ConfigurationLayoutComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigurationInfoComponent } from './components/configuration-info/configuration-info.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';



@NgModule({
  declarations: [
    ConfigurationInfoComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }

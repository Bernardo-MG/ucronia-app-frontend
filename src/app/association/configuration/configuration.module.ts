import { NgModule } from '@angular/core';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AssociationConfigurationService } from './service/association-configuration.service';



@NgModule({
  imports: [
    ConfigurationRoutingModule
  ],
  providers: [
    AssociationConfigurationService
  ]
})
export class ConfigurationModule { }

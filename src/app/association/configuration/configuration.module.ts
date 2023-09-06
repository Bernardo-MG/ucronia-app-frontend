import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { ConfigurationDetailsComponent } from './components/configuration-details/configuration-details.component';
import { ConfigurationInfoComponent } from './components/configuration-info/configuration-info.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AssociationConfigurationService } from './service/association-configuration.service';



@NgModule({
  declarations: [
    ConfigurationInfoComponent,
    ConfigurationDetailsComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    LayoutModule
  ],
  providers: [
    AssociationConfigurationService
  ]
})
export class ConfigurationModule { }

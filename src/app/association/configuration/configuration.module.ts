import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { ConfigurationDetailsComponent } from './components/configuration-details/configuration-details.component';
import { ConfigurationFormComponent } from './components/configuration-form/configuration-form.component';
import { ConfigurationInfoComponent } from './components/configuration-info/configuration-info.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AssociationConfigurationService } from './service/association-configuration.service';



@NgModule({
  declarations: [
    ConfigurationInfoComponent,
    ConfigurationDetailsComponent,
    ConfigurationFormComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  providers: [
    AssociationConfigurationService
  ]
})
export class ConfigurationModule { }

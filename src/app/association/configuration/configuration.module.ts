import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AssociationConfigurationService } from './service/association-configuration.service';



@NgModule({
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

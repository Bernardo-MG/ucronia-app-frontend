import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRegisterRoutingModule } from './access-register-routing.module';
import { AcessRegisterFormComponent } from './components/access-register-form/access-register-form.component';
import { AccessRegisterViewComponent } from './components/access-register-view/access-register-view.component';
import { AccessRegisterService } from './services/access-register.service';



@NgModule({
  declarations: [
    AccessRegisterViewComponent,
    AcessRegisterFormComponent
  ],
  imports: [
    CommonModule,
    AccessRegisterRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule
  ],
  providers: [
    AccessRegisterService
  ]
})
export class AccessRegisterModule { }

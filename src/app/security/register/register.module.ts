import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ControlsModule } from '@app/controls/controls.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityRegisterFormComponent } from './components/security-register-form/security-register-form.component';
import { SecurityRegisterService } from './service/security-register.service';
import { SecurityRegisterViewComponent } from './views/security-register-view/security-register-view.component';



@NgModule({
  declarations: [
    SecurityRegisterViewComponent,
    SecurityRegisterFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ControlsModule,
    ApiUiModule
  ],
  providers: [
    SecurityRegisterService
  ]
})
export class RegisterModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityRegisterFormComponent } from './components/security-register-form/security-register-form.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SecurityRegisterViewComponent } from './views/security-register-view/security-register-view.component';



@NgModule({
  declarations: [
    SecurityRegisterViewComponent,
    SecurityRegisterFormComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule
  ]
})
export class RegisterModule { }

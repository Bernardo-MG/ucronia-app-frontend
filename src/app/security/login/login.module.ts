import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '@app/controls/controls.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationModule } from '../authentication/authentication.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LogoutButtonComponent } from './containers/logout-button/logout-button.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './service/login.service';
import { LoginViewComponent } from './view/login-view/login-view.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    LogoutButtonComponent,
    LoginViewComponent
  ],
  imports: [
    LoginRoutingModule,
    FontAwesomeModule,
    AuthenticationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule
  ],
  exports: [
    LogoutButtonComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginViewComponent } from './containers/login-view/login-view.component';
import { LogoutButtonComponent } from './containers/logout-button/logout-button.component';
import { LoginService } from './services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LogoutButtonComponent,
    LoginFormComponent,
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService
  ],
  exports: [
    LogoutButtonComponent,
    LoginViewComponent
  ]
})
export class AuthenticationModule { }

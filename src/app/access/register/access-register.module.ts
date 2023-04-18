import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AcessRegisterFormComponent } from './components/access-register-form/access-register-form.component';
import { AccessRegisterRoutingModule } from './access-register-routing.module';
import { AccessRegisterViewComponent } from './containers/access-register-view/access-register-view.component';
import { AccessRegisterService } from './services/access-register.service';



@NgModule({
  declarations: [
    AccessRegisterViewComponent,
    AcessRegisterFormComponent
  ],
  providers: [
    AccessRegisterService
  ],
  imports: [
    CommonModule,
    AccessRegisterRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CoreModule
  ]
})
export class AccessRegisterModule { }

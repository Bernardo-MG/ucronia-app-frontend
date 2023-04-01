import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountMenuComponent } from './components/account-menu-options/account-menu-options.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { AssociationLayoutComponent } from './views/association-layout/association-layout.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ButtonBackwardComponent } from './components/button-backward/button-backward.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { ButtonForwardComponent } from './components/button-forward/button-forward.component';
import { ButtonLinkCreateComponent } from './components/button-link-create/button-link-create.component';
import { ButtonLinkEditComponent } from './components/button-link-edit/button-link-edit.component';
import { ButtonSearchSecondaryComponent } from './components/button-search-secondary/button-search-secondary.component';
import { CueLoadingComponent } from './components/cue-waiting/cue-waiting.component';
import { FormControlsComponent } from './components/form-controls/form-controls.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogoutButtonComponent } from './containers/logout-button/logout-button.component';



@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent,
    AccountMenuComponent,
    DataFormComponent,
    AssociationLayoutComponent,
    DataListComponent,
    FormControlsComponent,
    ButtonLinkEditComponent,
    ButtonLinkCreateComponent,
    ButtonBackwardComponent,
    ButtonForwardComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent,
    CueLoadingComponent,
    LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ApiUiModule,
    FontAwesomeModule
  ],
  exports: [
    MenuComponent,
    DataFormComponent,
    AssociationLayoutComponent,
    DataListComponent,
    FormControlsComponent,
    ButtonLinkCreateComponent,
    ButtonLinkEditComponent,
    ButtonBackwardComponent,
    ButtonForwardComponent,
    ButtonSearchSecondaryComponent,
    ButtonDeleteComponent,
    CueLoadingComponent,
    LogoutButtonComponent
  ]
})
export class CoreModule { }

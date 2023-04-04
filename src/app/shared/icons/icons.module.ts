import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconAccountComponent } from './components/icon-account/icon-account.component';
import { IconAddComponent } from './components/icon-add/icon-add.component';
import { BackwardIconComponent } from './components/icon-backward/icon-backward.component';
import { IconCreateComponent } from './components/icon-create/icon-create.component';
import { DeleteIconComponent } from './components/icon-delete/icon-delete.component';
import { IconEditComponent } from './components/icon-edit/icon-edit.component';
import { FastBackwardIconComponent } from './components/icon-fast-backward/icon-fast-backward.component';
import { FastForwardIconComponent } from './components/icon-fast-forward/icon-fast-forward.component';
import { ForwardIconComponent } from './components/icon-forward/icon-forward.component';
import { LogoutIconComponent } from './components/icon-logout/icon-logout.component';
import { IconSaveComponent } from './components/icon-save/icon-save.component';
import { IconSearchComponent } from './components/icon-search/icon-search.component';
import { IconSettingsComponent } from './components/icon-settings/icon-settings.component';
import { CueLoadingComponent } from './components/icon-waiting/icon-waiting.component';



@NgModule({
  declarations: [
    BackwardIconComponent,
    ForwardIconComponent,
    FastBackwardIconComponent,
    FastForwardIconComponent,
    LogoutIconComponent,
    CueLoadingComponent,
    DeleteIconComponent,
    IconCreateComponent,
    IconEditComponent,
    IconSearchComponent,
    IconSettingsComponent,
    IconAccountComponent,
    IconSaveComponent,
    IconAddComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    BackwardIconComponent,
    ForwardIconComponent,
    FastBackwardIconComponent,
    FastForwardIconComponent,
    LogoutIconComponent,
    CueLoadingComponent,
    DeleteIconComponent,
    IconCreateComponent,
    IconEditComponent,
    IconSearchComponent,
    IconSettingsComponent,
    IconAccountComponent,
    IconSaveComponent,
    IconAddComponent
  ]
})
export class IconsModule { }

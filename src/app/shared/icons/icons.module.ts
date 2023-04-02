import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CueLoadingComponent } from './cue-waiting/cue-waiting.component';
import { BackwardIconComponent } from './icon-backward/icon-backward.component';
import { IconCreateComponent } from './icon-create/icon-create.component';
import { DeleteIconComponent } from './icon-delete/icon-delete.component';
import { IconEditComponent } from './icon-edit/icon-edit.component';
import { FastBackwardIconComponent } from './icon-fast-backward/icon-fast-backward.component';
import { FastForwardIconComponent } from './icon-fast-forward/icon-fast-forward.component';
import { ForwardIconComponent } from './icon-forward/icon-forward.component';
import { LogoutIconComponent } from './icon-logout/icon-logout.component';
import { IconSearchComponent } from './icon-search/icon-search.component';



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
    IconSearchComponent
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
    IconSearchComponent
  ]
})
export class IconsModule { }

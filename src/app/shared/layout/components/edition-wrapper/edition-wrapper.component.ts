import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'layout-edition-wrapper',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './edition-wrapper.component.html'
})
export class EditionWrapperComponent {

  @Input() public editable = false;

  @Input() public editing = false;

  @Input() public deletable = false;

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<void>();

  public onStartEditing(): void {
    this.startEditing.emit();
  }

  public onDelete(): void {
    this.delete.emit();
  }

  public showMenu() {
    return this.editable || this.deletable;
  }

}

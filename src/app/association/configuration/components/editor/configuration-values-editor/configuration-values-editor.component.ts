import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Configuration } from '@app/association/configuration/models/configuration';
import { Failure } from '@app/core/api/models/failure';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'assoc-configuration-values-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule],
  templateUrl: './configuration-values-editor.component.html'
})
export class ConfigurationValuesEditorComponent {

  @Input() public configurations: Configuration[] = [];

  public isFieldInvalid(property: string): boolean {
    return false;
  }

  public getFailures(property: string): Failure[] {
    return [];
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-excel',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './icon-excel.component.html'
})
export class IconExcelComponent {

  public icon = faFileExcel;

}

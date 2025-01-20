import { Component } from '@angular/core';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'icon-excel',
    templateUrl: './icon-excel.component.html',
    standalone: false
})
export class IconExcelComponent {

  public icon = faFileExcel;

}

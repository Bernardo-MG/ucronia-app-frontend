import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'access-role-change-permission',
  imports: [CommonModule, ButtonModule, PickListModule],
  templateUrl: './role-change-permission.html'
})
export class RoleChangePermission implements OnChanges {

  public readonly selection = input<ResourcePermission[]>([]);
  public readonly permissions = input<ResourcePermission[]>([]);

  public readonly save = output<ResourcePermission[]>();

  public selected: ResourcePermission[] = [];

  public ngOnChanges({ permissions }: SimpleChanges): void {
    if (permissions) {
      this.selected = [...permissions.currentValue];
    }
  }

}

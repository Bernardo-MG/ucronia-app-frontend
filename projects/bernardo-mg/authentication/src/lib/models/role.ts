import { ResourcePermission } from "./resource-permission";

export class Role {
  public name = '';
  public permissions: ResourcePermission[] = [];
}

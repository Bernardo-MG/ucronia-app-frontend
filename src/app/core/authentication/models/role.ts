import { ResourcePermission } from "./resource-permission";

export class Role {
  name = '';
  permissions: ResourcePermission[] = [];
}

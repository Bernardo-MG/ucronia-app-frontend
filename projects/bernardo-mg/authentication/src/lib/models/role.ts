import { ResourcePermission } from "./resource-permission";

export class Role {
  constructor(
    public name = '',
    public permissions: ResourcePermission[] = []
  ) { }
}

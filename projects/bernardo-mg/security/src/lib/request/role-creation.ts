
export class RoleCreation {
  constructor(
    public name = '',
    public permissions: ResourceCreationPermission[] = []
  ) { }
}

export class ResourceCreationPermission {
  constructor(
    public resource = '',
    public action = ''
  ) { }
}

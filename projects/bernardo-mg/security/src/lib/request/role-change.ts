
export class RoleChange {
  constructor(
    public name = '',
    public permissions: RoleChangePermission[] = []
  ) { }
}

export class RoleChangePermission {
  constructor(
    public resource = '',
    public action = ''
  ) { }
}

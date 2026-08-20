
export const SecurityPermissions = {
  loginRegister: {
    read: { resource: 'LOGIN_REGISTER', action: 'READ' },
    create: { resource: 'LOGIN_REGISTER', action: 'CREATE' },
    update: { resource: 'LOGIN_REGISTER', action: 'UPDATE' },
    delete: { resource: 'LOGIN_REGISTER', action: 'DELETE' }
  },
  role: {
    read: { resource: 'ROLE', action: 'READ' },
    create: { resource: 'ROLE', action: 'CREATE' },
    update: { resource: 'ROLE', action: 'UPDATE' },
    delete: { resource: 'ROLE', action: 'DELETE' }
  },
  user: {
    read: { resource: 'USER', action: 'READ' },
    create: { resource: 'USER', action: 'CREATE' },
    update: { resource: 'USER', action: 'UPDATE' },
    delete: { resource: 'USER', action: 'DELETE' }
  },
  userToken: {
    read: { resource: 'USER_TOKEN', action: 'READ' },
    create: { resource: 'USER_TOKEN', action: 'CREATE' },
    update: { resource: 'USER_TOKEN', action: 'UPDATE' },
    delete: { resource: 'USER_TOKEN', action: 'DELETE' }
  }
};
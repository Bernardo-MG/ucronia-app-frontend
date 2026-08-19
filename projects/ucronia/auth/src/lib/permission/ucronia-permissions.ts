export const UcroniaPermissions = {
  activity: {
    read: { resource: 'ACTIVITY', action: 'READ' },
    create: { resource: 'ACTIVITY', action: 'CREATE' },
    update: { resource: 'ACTIVITY', action: 'UPDATE' },
    delete: { resource: 'ACTIVITY', action: 'DELETE' }
  },
  associationSettings: {
    read: { resource: 'ASSOCIATION_SETTINGS', action: 'READ' },
    create: { resource: 'ASSOCIATION_SETTINGS', action: 'CREATE' },
    update: { resource: 'ASSOCIATION_SETTINGS', action: 'UPDATE' },
    delete: { resource: 'ASSOCIATION_SETTINGS', action: 'DELETE' }
  },
  fee: {
    read: { resource: 'FEE', action: 'READ' },
    create: { resource: 'FEE', action: 'CREATE' },
    update: { resource: 'FEE', action: 'UPDATE' },
    delete: { resource: 'FEE', action: 'DELETE' }
  },
  library: {
    book: {
      read: { resource: 'LIBRARY_BOOK', action: 'READ' },
      create: { resource: 'LIBRARY_BOOK', action: 'CREATE' },
      update: { resource: 'LIBRARY_BOOK', action: 'UPDATE' },
      delete: { resource: 'LIBRARY_BOOK', action: 'DELETE' }
    },
    author: {
      read: { resource: 'LIBRARY_AUTHOR', action: 'READ' },
      create: { resource: 'LIBRARY_AUTHOR', action: 'CREATE' },
      update: { resource: 'LIBRARY_AUTHOR', action: 'UPDATE' },
      delete: { resource: 'LIBRARY_AUTHOR', action: 'DELETE' }
    },
    publisher: {
      read: { resource: 'LIBRARY_PUBLISHER', action: 'READ' },
      create: { resource: 'LIBRARY_PUBLISHER', action: 'CREATE' },
      update: { resource: 'LIBRARY_PUBLISHER', action: 'UPDATE' },
      delete: { resource: 'LIBRARY_PUBLISHER', action: 'DELETE' }
    },
    type: {
      read: { resource: 'LIBRARY_BOOK_TYPE', action: 'READ' },
      create: { resource: 'LIBRARY_BOOK_TYPE', action: 'CREATE' },
      update: { resource: 'LIBRARY_BOOK_TYPE', action: 'UPDATE' },
      delete: { resource: 'LIBRARY_BOOK_TYPE', action: 'DELETE' }
    },
    system: {
      read: { resource: 'LIBRARY_GAME_SYSTEM', action: 'READ' },
      create: { resource: 'LIBRARY_GAME_SYSTEM', action: 'CREATE' },
      update: { resource: 'LIBRARY_GAME_SYSTEM', action: 'UPDATE' },
      delete: { resource: 'LIBRARY_GAME_SYSTEM', action: 'DELETE' }
    }
  },
  member: {
    read: { resource: 'MEMBER', action: 'READ' },
    create: { resource: 'MEMBER', action: 'CREATE' },
    update: { resource: 'MEMBER', action: 'UPDATE' },
    delete: { resource: 'MEMBER', action: 'DELETE' }
  },
  myFees: {
    read: { resource: 'MY_FEES', action: 'READ' },
    create: { resource: 'MY_FEES', action: 'CREATE' },
    update: { resource: 'MY_FEES', action: 'UPDATE' },
    delete: { resource: 'MY_FEES', action: 'DELETE' }
  },
  profile: {
    read: { resource: 'PROFILE', action: 'READ' },
    create: { resource: 'PROFILE', action: 'CREATE' },
    update: { resource: 'PROFILE', action: 'UPDATE' },
    delete: { resource: 'PROFILE', action: 'DELETE' }
  },
  scheduledGame: {
    read: { resource: 'SCHEDULED_GAME', action: 'READ' },
    create: { resource: 'SCHEDULED_GAME', action: 'CREATE' },
    update: { resource: 'SCHEDULED_GAME', action: 'UPDATE' },
    delete: { resource: 'SCHEDULED_GAME', action: 'DELETE' }
  },
  transaction: {
    read: { resource: 'TRANSACTION', action: 'READ' },
    create: { resource: 'TRANSACTION', action: 'CREATE' },
    update: { resource: 'TRANSACTION', action: 'UPDATE' },
    delete: { resource: 'TRANSACTION', action: 'DELETE' }
  }
};
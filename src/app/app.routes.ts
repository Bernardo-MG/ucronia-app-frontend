import { Routes } from '@angular/router';
import { LoggedInGuard, LoggedOutGuard, ResourceGuard } from '@bernardo-mg/authentication';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@app/core/layout/association-layout/association-layout')
        .then(m => m.AssociationLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./frontpage/frontpage/frontpage')
            .then(m => m.Frontpage)
      },
      {
        path: '',
        canActivateChild: [LoggedOutGuard],
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./access/login/login-view/login-view')
                .then(m => m.LoginView)
          },
          {
            path: 'password/reset',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./access/password-reset/password-reset-request-view/password-reset-request-view')
                    .then(m => m.PasswordResetRequestView)
              },
              {
                path: ':token',
                loadComponent: () =>
                  import('./access/password-reset/password-reset-view/password-reset-view')
                    .then(m => m.PasswordResetView)
              }
            ]
          },
          {
            path: 'users/activate',
            children: [
              {
                path: ':token',
                loadComponent: () =>
                  import('./access/user-activation/user-activation/user-activation')
                    .then(m => m.UserActivation)
              }
            ]
          }
        ]
      },
      {
        path: '',
        canActivateChild: [LoggedInGuard],
        children: [
          {
            path: 'account',
            loadComponent: () =>
              import('./account/account-layout/account-layout')
                .then(m => m.AccountLayout),
            children: [
              { path: '', redirectTo: 'profile', pathMatch: 'full' },
              {
                path: 'profile',
                loadComponent: () =>
                  import('./account/account-profile-frontpage/account-profile-frontpage')
                    .then(m => m.AccountProfileFrontpage)
              },
              {
                path: 'password',
                loadComponent: () =>
                  import('./account/account-password-change/account-password-change')
                    .then(m => m.AccountPasswordChange)
              }
            ]
          },
          {
            path: 'association',
            children: [
              {
                path: 'members',
                canActivate: [ResourceGuard("member", "view")],
                loadComponent: () => import('./association/members/member-view/member-view').then(m => m.MemberView)
              },
              {
                path: 'myFees',
                canActivate: [ResourceGuard("my_fees", "view")],
                loadComponent: () => import('./association/my-fees/my-fees-view/my-fees-view').then(m => m.MyFeesView)
              },
              {
                path: 'library',
                canActivate: [ResourceGuard("library", "view")],
                children: [
                  {
                    path: '',
                    redirectTo: 'books',
                    pathMatch: 'full'
                  },
                  {
                    path: 'authors',
                    children: [
                      {
                        path: '',
                        loadComponent: () => import('./association/library/data/library-author-list/library-author-list').then(m => m.LibraryAuthorList),
                        canActivate: [ResourceGuard("library_author", "view")]
                      }
                    ]
                  },
                  {
                    path: 'books',
                    children: [
                      {
                        path: '',
                        loadComponent: () => import('./association/library/book/library-view/library-view').then(m => m.LibraryView),
                        canActivate: [ResourceGuard("library_book", "view")]
                      }
                    ]
                  },
                  {
                    path: 'publishers',
                    children: [
                      {
                        path: '',
                        loadComponent: () => import('./association/library/data/library-publisher-list/library-publisher-list').then(m => m.LibraryPublisherList),
                        canActivate: [ResourceGuard("library_publisher", "view")]
                      }
                    ]
                  },
                  {
                    path: 'types',
                    children: [
                      {
                        path: '',
                        loadComponent: () => import('./association/library/data/library-book-type-list/library-book-type-list').then(m => m.LibraryBookTypeList),
                        canActivate: [ResourceGuard("library_book_type", "view")]
                      }
                    ]
                  },
                  {
                    path: 'systems',
                    children: [
                      {
                        path: '',
                        loadComponent: () => import('./association/library/data/library-game-system-list/library-game-system-list').then(m => m.LibraryGameSystemList),
                        canActivate: [ResourceGuard("library_game_system", "view")]
                      }
                    ]
                  }
                ]
              },
              {
                path: 'fees',
                canActivate: [ResourceGuard("fee", "view")],
                loadComponent: () => import('./association/fees/fee-view/fee-view').then(m => m.FeeView)
              },
              {
                path: 'directory',
                canActivate: [ResourceGuard("profile", "view")],
                loadComponent: () => import('./association/directory/directory-view/directory-view').then(m => m.DirectoryView)
              },
              {
                path: 'funds',
                canActivate: [ResourceGuard("funds", "view")],
                loadComponent: () => import('./association/funds/funds-view/funds-view').then(m => m.FundsView)
              }
            ]
          },
          {
            // Security
            path: 'security',
            canActivate: [LoggedInGuard],
            loadComponent: () => import('./security/layout/security-layout/security-layout').then(m => m.SecurityLayout),
            children: [
              {
                // Root
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
              },
              {
                // Roles
                path: 'roles',
                canActivate: [ResourceGuard("role", "view")],
                loadComponent: () => import('./security/roles/role-view/role-view').then(m => m.RoleView)
              },
              {
                // Users
                path: 'users',
                canActivate: [ResourceGuard("user", "view")],
                loadComponent: () => import('./security/users/user-view/user-view').then(m => m.UserView)
              },
              {
                // User tokens
                path: 'user-tokens',
                canActivate: [ResourceGuard("user_token", "view")],
                loadComponent: () => import('./security/user-tokens/user-token-view/user-token-view').then(m => m.UserTokenView)
              },
              {
                // Security audit
                path: 'audit',
                canActivate: [ResourceGuard("user", "view")],
                loadComponent: () => import('./security/audit/audit-view/audit-view').then(m => m.AccessAuditLogin)
              }
            ]
          },
          {
            path: 'settings',
            canActivate: [ResourceGuard('association_settings', 'view')],
            loadComponent: () =>
              import('./settings/settings-view/settings-view')
                .then(m => m.SettingsView)
          }
        ]
      }
    ]
  }
];


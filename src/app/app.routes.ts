import { Routes } from '@angular/router';
import { LoggedInGuard, LoggedOutGuard, ResourceGuard } from '@bernardo-mg/authentication';


export const routes: Routes = [
  // Main app
  {
    path: '',
    loadComponent: () => import('@app/core/layout/association-layout/association-layout').then(m => m.AssociationLayout),
    children: [
      // Public routes
      {
        // Frontpage
        path: '',
        loadComponent: () => import('./frontpage/frontpage/frontpage').then(m => m.Frontpage)
      },
      {
        // Log in form
        path: 'login',
        canActivate: [LoggedOutGuard],
        loadComponent: () => import('./access/login/login-view/login-view').then(m => m.LoginView)
      },
      {
        // Password reset form
        path: 'password/reset',
        canActivate: [LoggedOutGuard],
        children: [
          { path: '', loadComponent: () => import('./access/password-reset/password-reset-request/password-reset-request').then(m => m.PasswordResetRequest) },
          { path: ':token', loadComponent: () => import('./access/password-reset/password-reset/password-reset').then(m => m.PasswordReset) }
        ]
      },
      {
        // Activate user form
        path: 'users/activate',
        canActivate: [LoggedOutGuard],
        children: [
          { path: ':token', loadComponent: () => import('./access/user-activation/user-activation/user-activation').then(m => m.UserActivation) }
        ]
      },
      // Private routes
      // Security
      {
        // Account
        path: 'account',
        canActivate: [LoggedInGuard],
        loadComponent: () => import('./account/account-layout/account-layout').then(m => m.AccountLayout),
        children: [
          {
            path: '',
            redirectTo: 'profile',
            pathMatch: 'full'
          },
          {
            path: 'profile',
            loadComponent: () => import('./account/account-profile-frontpage/account-profile-frontpage').then(m => m.AccountProfileFrontpage)
          },
          {
            path: 'password',
            loadComponent: () => import('./account/account-password-change/account-password-change').then(m => m.AccountPasswordChange)
          }
        ]
      },
      {
        // Association
        path: 'association',
        canActivate: [LoggedInGuard],
        children: [
          {
            path: '',
            redirectTo: 'activity',
            pathMatch: 'prefix'
          },
          {
            path: 'activity',
            canActivate: [ResourceGuard("activity_calendar", "view")],
            loadComponent: () => import('./association/activity-calendar/activity-calendar/activity-calendar').then(m => m.ActivityCalendar)
          },
          {
            path: 'members',
            canActivate: [ResourceGuard("member", "view")],
            loadComponent: () => import('./association/members/member-view/member-view').then(m => m.MemberView)
          },
          {
            path: 'myFees',
            canActivate: [ResourceGuard("my_fees", "view")],
            loadComponent: () => import('./association/my-fees/my-fees-list/my-fees-list').then(m => m.MyFeesList)
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
            loadComponent: () => import('./association/fees/fee-list/fee-list').then(m => m.FeeList)
          },
          {
            path: 'contacts',
            canActivate: [ResourceGuard("contact", "view")],
            loadComponent: () => import('./association/contacts/contact-listing/contact-listing').then(m => m.ContactListing)
          },
          {
            path: 'funds',
            canActivate: [ResourceGuard("funds", "view")],
            loadComponent: () => import('./association/funds/funds/funds').then(m => m.Funds)
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
            loadComponent: () => import('./security/roles/access-role-list/access-role-list').then(m => m.AccessRoleList)
          },
          {
            // Users
            path: 'users',
            canActivate: [ResourceGuard("user", "view")],
            loadComponent: () => import('./security/users/access-user-list/access-user-list').then(m => m.AccessList)
          },
          {
            // User tokens
            path: 'user-tokens',
            canActivate: [ResourceGuard("user_token", "view")],
            loadComponent: () => import('./security/user-tokens/user-token-list/user-token-list').then(m => m.UserTokenList)
          },
          {
            // Security audit
            path: 'audit',
            canActivate: [ResourceGuard("user", "view")],
            loadComponent: () => import('./security/audit/access-audit-login/access-audit-login').then(m => m.AccessAuditLogin)
          }
        ]
      },
      {
        // Settings
        path: 'settings',
        canActivate: [LoggedInGuard, ResourceGuard("association_settings", "view")],
        loadComponent: () => import('./settings/settings-edition/settings-edition').then(m => m.SettingsInfoEditor)
      }
    ]
  }
];

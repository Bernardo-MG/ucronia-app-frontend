import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BreadcrumbLink } from '../../models/breadcrumb-link';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

/**
 * Breadcrumb which takes info from the router.
 */
@Component({
  selector: 'ui-router-breadcrumb',
  imports: [BreadcrumbComponent],
  templateUrl: './router-breadcrumb.component.html'
})
export class RouterBreadcrumbComponent {

  private readonly route = inject(ActivatedRoute);

  public breadcrumbs: BreadcrumbLink[] = [];

  constructor() {
    const router = inject(Router);

    // Handle initial load
    this.breadcrumbs = this.buildBreadcrumbs();

    // Build breadcrumbs on initialization and on route change
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs();
      });
  }

  private buildBreadcrumbs(): BreadcrumbLink[] {
    const breadcrumbs: BreadcrumbLink[] = [];
    let currentRoute: ActivatedRoute | null = this.route.root;
    let url = '';

    while (currentRoute) {
      if (currentRoute.snapshot) {
        // Process each level of the route tree
        // Build the relative URL for the current route
        const routeURL = currentRoute.snapshot.url.map((segment) => segment.path).join('/');
        if (routeURL) {
          url += `/${routeURL}`;
        }

        // Add breadcrumb if the route has 'breadcrumb' data
        if (currentRoute.snapshot.data['breadcrumb']) {
          breadcrumbs.push(new BreadcrumbLink(currentRoute.snapshot.data['breadcrumb'], url));
        }
      }

      // Move to the first child route, if any
      currentRoute = currentRoute.firstChild;
    }

    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].route = '';
    }
    return breadcrumbs;
  }

}

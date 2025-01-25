import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { BreadcrumbLink } from '../../model/breadcrumb-link';

@Component({
  selector: 'app-router-breadcrumb',
  imports: [BreadcrumbComponent],
  templateUrl: './router-breadcrumb.component.html'
})
export class RouterBreadcrumbComponent {

  breadcrumbs: BreadcrumbLink[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this.route.root))
      )
      .subscribe((breadcrumbs) => (this.breadcrumbs = breadcrumbs));
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbLink[] = []): BreadcrumbLink[] {
    const children = route.children;

    for (const child of children) {
      const routeURL = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (child.snapshot.data['breadcrumb']) {
        breadcrumbs.push(
          new BreadcrumbLink(child.snapshot.data['breadcrumb'], url)
        );
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

}

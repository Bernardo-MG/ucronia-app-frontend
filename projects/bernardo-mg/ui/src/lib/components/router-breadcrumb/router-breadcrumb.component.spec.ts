import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { RouterBreadcrumbComponent } from './router-breadcrumb.component';

describe('RouterBreadcrumbComponent', () => {
  let component: RouterBreadcrumbComponent;
  let fixture: ComponentFixture<RouterBreadcrumbComponent>;
  let routerEvents$: Subject<any>;

  const mockActivatedRoute: Partial<ActivatedRoute> = {
    root: {
      snapshot: {
        url: [],
        data: {}
      },
      firstChild: {
        snapshot: {
          url: [{ path: 'dashboard' }],
          data: { breadcrumb: 'Dashboard' }
        },
        firstChild: {
          snapshot: {
            url: [{ path: 'reports' }],
            data: { breadcrumb: 'Reports' }
          },
          firstChild: null
        }
      }
    } as any
  };

  beforeEach(async () => {
    routerEvents$ = new Subject();

    const mockRouter = {
      events: routerEvents$.asObservable(),
      createUrlTree: jasmine.createSpy('createUrlTree').and.callFake((commands: any[]) => commands),
      serializeUrl: jasmine.createSpy('serializeUrl').and.callFake((urlTree: any) => '/' + urlTree.join('/'))
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterBreadcrumbComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RouterBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should build breadcrumbs correctly from route data', () => {
    const breadcrumbs: MenuItem[] = component.breadcrumbs;

    expect(breadcrumbs.length).toBe(2);

    expect(breadcrumbs[0].label).toBe('Dashboard');
    expect(breadcrumbs[0].routerLink).toBe('/dashboard');
    expect(breadcrumbs[1].disabled).toBe(false);

    expect(breadcrumbs[1].label).toBe('Reports');
    expect(breadcrumbs[0].routerLink).toBe('/dashboard/reports');
    expect(breadcrumbs[1].disabled).toBe(true);
  });

});

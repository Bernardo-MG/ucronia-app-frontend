import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { Routes } from '@angular/router';
import { By } from '@angular/platform-browser';
import { BreadcrumbLink } from '../../models/breadcrumb-link';

// Dummy routes for testing purposes
const routes: Routes = [
  { path: '', component: BreadcrumbComponent },
  { path: 'library', component: BreadcrumbComponent },
  { path: 'dashboard', component: BreadcrumbComponent }
];

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
      providers: [provideRouter(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render breadcrumb links correctly', () => {
    component.levels = [
      new BreadcrumbLink('Home', '/'),
      new BreadcrumbLink('First level', '/library'),
      new BreadcrumbLink('Current Page')
    ];
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('li.breadcrumb-item'));
    expect(items.length).toBe(3);

    const firstLink = items[0].query(By.css('a'));
    expect(firstLink.nativeElement.textContent.trim()).toBe('Home');

    const secondLink = items[1].query(By.css('a'));
    expect(secondLink.nativeElement.textContent.trim()).toBe('First level');

    const thirdItem = items[2];
    const thirdLink = thirdItem.query(By.css('a'));
    expect(thirdLink).toBeNull();
    expect(thirdItem.nativeElement.textContent.trim()).toBe('Current Page');
    expect(thirdItem.nativeElement.classList).toContain('active');
  });
  
  it('should render breadcrumb links correctly when the a page route is empty', () => {
    component.levels = [
      new BreadcrumbLink('Home', '/'),
      new BreadcrumbLink('First level', '/library'),
      new BreadcrumbLink('Current Page', '')
    ];
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('li.breadcrumb-item'));
    expect(items.length).toBe(3);

    const firstLink = items[0].query(By.css('a'));
    expect(firstLink.nativeElement.textContent.trim()).toBe('Home');

    const secondLink = items[1].query(By.css('a'));
    expect(secondLink.nativeElement.textContent.trim()).toBe('First level');

    const thirdItem = items[2];
    const thirdLink = thirdItem.query(By.css('a'));
    expect(thirdLink).toBeNull();
    expect(thirdItem.nativeElement.textContent.trim()).toBe('Current Page');
    expect(thirdItem.nativeElement.classList).toContain('active');
  });

});

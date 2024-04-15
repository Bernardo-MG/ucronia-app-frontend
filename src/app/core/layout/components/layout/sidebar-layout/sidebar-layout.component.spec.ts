import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '@app/core/layout/components/header/navbar/navbar.component';
import { SidebarLayoutComponent } from './sidebar-layout.component';

describe('SidebarLayoutComponent', () => {
  let component: SidebarLayoutComponent;
  let fixture: ComponentFixture<SidebarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavbarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

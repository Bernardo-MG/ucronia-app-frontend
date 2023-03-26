import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsModule } from '@app/components/components.module';
import { NavbarComponent } from '../navbar/navbar.component';

import { HeaderLayoutComponent } from './header-layout.component';

describe('HeaderLayoutComponent', () => {
  let component: HeaderLayoutComponent;
  let fixture: ComponentFixture<HeaderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ComponentsModule
      ],
      declarations: [
        HeaderLayoutComponent,
        NavbarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '@app/core/layout/components/navbar/navbar.component';
import { CoreModule } from '@app/core/core.module';
import { MainFrameLayoutComponent } from './layout-main-frame.component';

describe('MainFrameLayoutComponent', () => {
  let component: MainFrameLayoutComponent;
  let fixture: ComponentFixture<MainFrameLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule
      ],
      declarations: [
        MainFrameLayoutComponent,
        NavbarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainFrameLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { SidenavFrameComponent } from './sidenav-frame.component';

describe('SidenavFrameComponent', () => {
  let component: SidenavFrameComponent;
  let fixture: ComponentFixture<SidenavFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        SidenavFrameComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SidenavFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

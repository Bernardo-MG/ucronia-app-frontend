import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderNavigationWrapperComponent } from './header-navigation-wrapper.component';

describe('HeaderNavigationWrapperComponent', () => {
  let component: HeaderNavigationWrapperComponent;
  let fixture: ComponentFixture<HeaderNavigationWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeaderNavigationWrapperComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderNavigationWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

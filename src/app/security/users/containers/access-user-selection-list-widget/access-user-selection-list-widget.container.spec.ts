import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserSelectionListWidgetContainer } from './access-user-selection-list-widget.container';

describe('AccessUserSelectionListWidgetContainer', () => {
  let component: AccessUserSelectionListWidgetContainer;
  let fixture: ComponentFixture<AccessUserSelectionListWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessUserSelectionListWidgetContainer
      ],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserSelectionListWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

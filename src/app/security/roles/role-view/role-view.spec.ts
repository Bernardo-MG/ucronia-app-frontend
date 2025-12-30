import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleService } from '../role-service';
import { RoleView } from './role-view';

describe('RoleView', () => {
  let component: RoleView;
  let fixture: ComponentFixture<RoleView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoleView
      ],
      providers: [
        RoleService,
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

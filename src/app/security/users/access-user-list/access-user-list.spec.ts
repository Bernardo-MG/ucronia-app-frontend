import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccessUserService } from '../access-user-service';
import { AccessList } from './access-user-list';

describe('AccessList', () => {
  let component: AccessList;
  let fixture: ComponentFixture<AccessList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessList
      ],
      providers: [
        AccessUserService,
        MessageService,
        ConfirmationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserSelectionListComponent } from './access-user-selection-list.component';

describe('AccessUserSelectionListComponent', () => {
  let component: AccessUserSelectionListComponent;
  let fixture: ComponentFixture<AccessUserSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessUserSelectionListComponent
      ],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

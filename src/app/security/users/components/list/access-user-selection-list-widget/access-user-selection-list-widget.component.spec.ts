import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessUserService } from '../../../services/access-user.service';
import { AccessUserSelectionListWidgetComponent } from './access-user-selection-list-widget.component';

describe('AccessUserSelectionListWidgetComponent', () => {
  let component: AccessUserSelectionListWidgetComponent;
  let fixture: ComponentFixture<AccessUserSelectionListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AccessUserSelectionListWidgetComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserSelectionListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenSelectionListComponent } from './user-token-selection-list.component';

describe('UserTokenSelectionListComponent', () => {
  let component: UserTokenSelectionListComponent;
  let fixture: ComponentFixture<UserTokenSelectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        UserTokenSelectionListComponent
      ]
    });
    fixture = TestBed.createComponent(UserTokenSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

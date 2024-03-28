import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenInfoEditorComponent } from './user-token-info-editor.component';

describe('UserTokenInfoEditorComponent', () => {
  let component: UserTokenInfoEditorComponent;
  let fixture: ComponentFixture<UserTokenInfoEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        UserTokenInfoEditorComponent
      ]
    });
    fixture = TestBed.createComponent(UserTokenInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

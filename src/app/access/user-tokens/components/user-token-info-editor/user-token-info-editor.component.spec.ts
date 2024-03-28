import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { UserTokenInfoComponent } from '../user-token-info/user-token-info.component';
import { UserTokenInfoEditorComponent } from './user-token-info-editor.component';

describe('UserTokenInfoEditorComponent', () => {
  let component: UserTokenInfoEditorComponent;
  let fixture: ComponentFixture<UserTokenInfoEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        LayoutModule,
        IconsModule,
        UserTokenInfoEditorComponent,
        UserTokenInfoComponent
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

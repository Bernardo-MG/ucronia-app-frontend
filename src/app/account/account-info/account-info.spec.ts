import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Account } from '@bernardo-mg/security';
import { DetailField } from '@bernardo-mg/ui';

import { AccountInfo } from './account-info';

describe('AccountInfo', () => {
  let component: AccountInfo;
  let fixture: ComponentFixture<AccountInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountInfo]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the account information', () => {
    fixture.componentRef.setInput('data', createAccount());
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Nombre de usuario');
    expect(content).toContain('bernardo');
    expect(content).toContain('Nombre');
    expect(content).toContain('Bernardo Martínez');
    expect(content).toContain('E-mail');
    expect(content).toContain('bernardo@example.com');
  });

  it('should render three detail fields', () => {
    const fields = fixture.debugElement.queryAll(
      By.directive(DetailField)
    );

    expect(fields.length).toBe(3);
  });

  it('should pass account values to the detail fields', () => {
    fixture.componentRef.setInput('data', createAccount());
    fixture.detectChanges();

    const fields = fixture.debugElement.queryAll(
      By.directive(DetailField)
    );

    const usernameField = fields[0].componentInstance as DetailField;
    const nameField = fields[1].componentInstance as DetailField;
    const emailField = fields[2].componentInstance as DetailField;

    expect(usernameField.value()).toBe('bernardo');
    expect(nameField.value()).toBe('Bernardo Martínez');
    expect(emailField.value()).toBe('bernardo@example.com');
  });

  it('should pass field names to the detail fields', () => {
    const fields = fixture.debugElement.queryAll(
      By.directive(DetailField)
    );

    const usernameField = fields[0].componentInstance as DetailField;
    const nameField = fields[1].componentInstance as DetailField;
    const emailField = fields[2].componentInstance as DetailField;

    expect(usernameField.name()).toBe('Nombre de usuario');
    expect(nameField.name()).toBe('Nombre');
    expect(emailField.name()).toBe('E-mail');
  });

  it('should pass the loading state to every detail field', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const fields = fixture.debugElement.queryAll(
      By.directive(DetailField)
    );

    expect(fields.length).toBe(3);

    for (const field of fields) {
      const detailField = field.componentInstance as DetailField;

      expect(detailField.loading()).toBeTrue();
    }
  });

  it('should use the non-loading state by default', () => {
    const fields = fixture.debugElement.queryAll(
      By.directive(DetailField)
    );

    expect(fields.length).toBe(3);

    for (const field of fields) {
      const detailField = field.componentInstance as DetailField;

      expect(detailField.loading()).toBeFalse();
    }
  });

  function createAccount(): Account {
    const account = new Account();

    account.username = 'bernardo';
    account.name = 'Bernardo Martínez';
    account.email = 'bernardo@example.com';

    return account;
  }

});
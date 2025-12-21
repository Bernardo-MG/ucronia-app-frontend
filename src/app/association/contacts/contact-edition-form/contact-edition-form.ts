
import { CommonModule } from '@angular/common';
import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Contact, ContactMethod } from "@ucronia/domain";
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'assoc-contact-edition-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule, ToggleSwitchModule, TextareaModule, SelectModule, SelectButtonModule],
  templateUrl: './contact-edition-form.html',
  styleUrl: './contact-edition-form.sass'
})
export class ContactEditionForm implements OnChanges {

  private readonly confirmationService = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly contactMethods = input<ContactMethod[]>([]);

  public readonly typeSelected = output<string>();
  public readonly save = output<Contact>();

  @Input() public set data(value: Contact) {
    this.form.patchValue(value as any);

    this.contactChannels.clear();
    value.contactChannels?.forEach(channel => {
      this.contactChannels.push(
        this.fb.group({
          method: [channel.method],
          detail: [channel.detail]
        })
      );
    });

    this.selected = [];
    this.options.forEach(o => o.disabled = false);

    // Select + disable received types
    value.types?.forEach(type => {
      const option = this.options.find(o => o.value === type);
      if (option) {
        option.disabled = true;
        this.selected.push(type);
      }
    });
  }

  public get contactChannels(): FormArray {
    return this.form.get('contactChannels') as FormArray;
  }

  public selected: string[] = [];

  public options = [
    { label: 'Guest', value: 'guest', icon: 'pi-user', disabled: false },
    { label: 'Member', value: 'member', icon: 'pi-users', disabled: false },
    { label: 'Sponsor', value: 'sponsor', icon: 'pi-heart', disabled: false }
  ];

  public formStatus: FormStatus;
  public form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      number: [-1],
      identifier: [''],
      birthDate: [new Date()],
      name: this.fb.group({
        firstName: [null],
        lastName: ['']
      }),
      contactChannels: this.fb.array([]),
      comments: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public addContactChannel(): void {
    this.contactChannels.push(
      this.fb.group({
        method: [null],
        detail: ['']
      })
    );
  }

  public removeContactChannel(index: number): void {
    this.contactChannels.removeAt(index);
  }

  public confirmTypeTransformation(event: SelectButtonChangeEvent, target: HTMLElement) {
    this.confirmationService.confirm({
      target,
      message: '¿Estás seguro de querer asignar este rol? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Asignar',
        severity: 'danger'
      },
      accept: () => {
        if (event.value.length) {
          this.typeSelected.emit(event.value[event.value.length - 1]);
        }
      }
    });
  }

  public submit() {
    if (this.formStatus.saveEnabled) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}

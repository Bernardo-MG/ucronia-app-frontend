# Forms and drawers

Use the same structure for new creation and editing screens. Existing examples:
`settings/key-view`, `association/library/library-view` and `security/users/user-view`.

## Drawer structure

- Open details from the table's information button. Keep deletion in the information footer.
- Use `shared-drawer-header` for the title, optional subtitle and icon. Blue is the default; green may identify a payment operation.
- Use `position="right"` and width `min(44rem, 100vw)`.
- Put content in `w-full min-w-0 px-2 py-4 sm:px-4`.
- Keep `#header` and `#footer` templates as direct projected drawer children. PrimeNG does not discover footers nested inside a content element.
- Information uses `shared-drawer-actions`. Creation and editing use `shared-drawer-form-actions`.
- Cancel creation closes the drawer; cancel editing returns to information. Clear server failures on cancellation and dismissal. Failed saves retain the form for correction and retry.

## Form structure

- Form root: `[attr.id]="formId()"`, `[formGroup]="form"`, `(ngSubmit)="onSave()"`, `novalidate` and `w-full min-w-0 space-y-5`.
- Group related fields in rounded cards: `rounded-xl border border-gray-200 bg-white p-5 shadow-sm`. Simple forms need one card; longer forms may use named sections.
- Field labels sit above their controls, using `block font-medium text-gray-950`. Required fields have a red asterisk with `aria-hidden="true"`.
- Link labels with native `id`, PrimeNG `inputId`, or the member-search component's `inputId`. Use `mt-2` or a wrapper's `space-y-2` for the gap, not both.
- Controls fill the available width. Use PrimeNG currency inputs for amounts and `dd/mm/yy` for full dates. Month/year and time-only pickers retain their own formats.
- Use `isFieldInvalid` for control feedback and small simple error messages for server failures.
- Expose `loading`, `failures`, `formId`, `showActions`, `saveEnabled`, `save` and `cancelEdition` on drawer forms. A combined user form may also expose an update event.
- `onSave(): void` marks fields touched and returns when `saveEnabled` is false, before serializing or emitting. This also guards Enter submissions.
- Loading updates `FormStatus`, disables controls and blocks submission. Standalone member searches also receive `[disabled]="formStatus.loading"`.
- Editing normally requires a valid, dirty form. Upload creation additionally requires a selected file.

## Footer actions

Pass a unique form ID and `[showActions]="false"` when hosting a form in a drawer.
The footer's native submit button targets that same ID. Do not call the form handler directly from a click binding: native submission supports Enter and avoids duplicate events.

Creation uses `Crear …` and `pi pi-plus`; editing uses `Guardar cambios` and `pi pi-check`.
Payments, lending, returns, invitations and password changes keep their specific labels and icons.
Page forms without cancellation can use the same footer with `[showCancel]="false"`.
Authentication library forms use their own PrimeNG buttons to avoid a dependency on the application, while retaining the same field layout and primary-button styling.

## FormStatus

Keep `formStatus` readonly and initialize it once against the component's form.
Forward loading changes to `formStatus.loading`; do not enable/disable the form separately.
Both the submit handler and its button use the component's `saveEnabled` getter, which delegates to `FormStatus` and may add domain requirements such as a selected upload or matching passwords.
All forms require valid, dirty controls and must not be loading before submission. Form instances and other fields assigned only during construction are readonly.

Use `loading` as the single state name. Each form exposes only an `@Input() loading` setter that assigns `formStatus.loading`. Form templates and drawer footers read `formStatus.loading` directly. No separate form loading flag or signal is needed; lifecycle hooks remain only for other input changes.

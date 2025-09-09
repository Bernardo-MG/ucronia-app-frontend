export class FormStatus {
  private _readonly = false;
  private _loading = false;
  private _cancellable = false;

  constructor(
    private readonly form: any
  ) { }

  get readonly() {
    return this._readonly;
  }

  set readonly(flag: boolean) {
    this._readonly = flag;
    this.toggleEnable();
  }

  get loading() {
    return this._loading;
  }

  set loading(flag: boolean) {
    this._loading = flag;
    this.toggleEnable();
  }

  get cancellable() {
    return this._cancellable;
  }
  
  set cancellable(flag: boolean) {
    this._cancellable = flag;
  }

  get saveEnabled() {
    return this.form.valid && !this._loading && !this._readonly;
  }

  get cancelEnabled() {
    return this._cancellable && !this._loading && !this._readonly;
  }

  get formEnabled() {
    return !this.form.disabled;
  }

  private toggleEnable() {
    if (this._readonly || this._loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

}

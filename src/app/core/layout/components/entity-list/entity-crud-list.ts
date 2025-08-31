import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TablePageEvent } from 'primeng/table';
import { Observable, throwError } from 'rxjs';

export abstract class EntityCrudList<E> {

  public data = new PaginatedResponse<E>();

  public loading = false;

  private _shownForm: 'None' | 'Creation' | 'Edition' = 'None';

  public get shownForm() { return this._shownForm; }

  public set shownForm(form: 'None' | 'Creation' | 'Edition') {
    this._shownForm = form;
    this.showForm = form !== 'None';
  }

  public showForm = false;

  public selected!: E;

  protected sort = new Sorting();

  protected failures = new FailureStore();

  public readonly createable: boolean;

  public readonly editable: boolean;

  constructor(protected readonly auth: AuthContainer, entityKey: string) {
    this.createable = auth.hasPermission(entityKey, "create");
    this.editable = auth.hasPermission(entityKey, "update");
  }

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public onChangeDirection(sorting: { field: string; order: number }) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;

    this.sort.addField(new SortingProperty(sorting.field, direction));
    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onStartEditing(item: E): void {
    this.selected = item;
    this.shownForm = 'Edition';
  }

  public onStartCreating(): void {
    this.shownForm = 'Creation';
  }

  public onCancel(): void {
    this.shownForm = 'None';
  }

  protected load(page: number) {
    this.loading = true;
    this.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  protected mutate(action: () => Observable<any>) {
    this.loading = true;
    action().subscribe({
      next: () => {
        this.failures.clear();
        this.shownForm = 'None';
        this.load(this.data.page);
      },
      error: error => {
        if (error instanceof FailureResponse) {
          this.failures = error.failures;
        } else {
          this.failures.clear();
        }
        this.loading = false;
        return throwError(() => error);
      }
    });
  }

  protected abstract getAll(page: number, sort: Sorting): Observable<PaginatedResponse<E>>;

}

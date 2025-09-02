import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, SimpleResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TablePageEvent } from 'primeng/table';
import { Observable, throwError } from 'rxjs';
import { CrudService } from '../../services/crud-service';

export abstract class EntityCrudList<E> {

  public data = new PaginatedResponse<E>();

  public loading = false;

  public showConfirmDelete = false;

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

  public readonly deletable: boolean;

  public get canCreate() {
    return this.createable && !this.loading;
  }

  constructor(
    private readonly service: CrudService<E>,
    readonly auth: AuthContainer,
    readonly entityKey: string,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {
    this.createable = auth.hasPermission(entityKey, "create");
    this.editable = auth.hasPermission(entityKey, "update");
    this.deletable = auth.hasPermission(entityKey, "delete");
    
    // First page
    this.load(0);
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

  public onCreate(toCreate: E): void {
    this.mutate(() => this.service.create(toCreate));
  }

  public onUpdate(toSave: E): void {
    this.mutate(() => this.service.update(toSave));
  }

  public onDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Quieres borrar estos datos?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.mutate(() => this.service.delete(id));
        this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
      }
    });
  }

  protected load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort).subscribe({
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

}

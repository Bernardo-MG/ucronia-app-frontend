
export interface PaginationActuator {

    toFirstPage(): void ;

    toPreviousPage(): void;

    toNextPage(): void;

    toPage(page: number): void;

}

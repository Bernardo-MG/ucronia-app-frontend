import { PageInfo } from "../../models/page-info";

export interface PaginationActuator {

    load(page: PageInfo): void;

    toFirstPage(): void ;

    toPreviousPage(): void;

    toNextPage(): void;

    toPage(page: number): void;

}

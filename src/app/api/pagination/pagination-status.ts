import { PageInfo } from "../models/page-info";

export class PaginationStatus {

    public currentPage: number = 0;

    public totalPages: number = 0;

    public previousEnabled: boolean = false;

    public nextEnabled: boolean = false;

    constructor() { }

    public load(info: PageInfo): void {
        if (info.page) {
            this.currentPage = info.page;
        } else {
            this.currentPage = 0;
        }
        if (info.totalPages) {
            this.totalPages = info.totalPages;
        } else {
            this.totalPages = 0;
        }

        this.previousEnabled = !info.first;
        this.nextEnabled = !info.last;
    }

}

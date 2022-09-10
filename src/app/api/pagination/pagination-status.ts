import { PageInfo } from "../models/page-info";

export class PaginationStatus {

    public currentPage: number = 0;

    public totalPages: number = 0;

    public previousEnabled: boolean = false;

    public nextEnabled: boolean = false;

    public size: number = 0;

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
        if (info.size) {
            this.size = info.size;
        } else {
            this.size = 0;
        }

        this.previousEnabled = !info.first;
        this.nextEnabled = !info.last;
    }

}

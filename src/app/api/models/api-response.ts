
export class ApiResponse<T> {

    constructor(cont: T) {
        this.content = cont;
    }

    content: T;
    first?: boolean = false;
    last?: boolean = false;
    pageNumber?: number = 0;
    elementsInPage?: number = 0;
    size?: number = 0;
    totalElements?: number = 0;
    totalPages?: number = 0;
}
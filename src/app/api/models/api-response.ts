export class ApiResponse<T> {

    constructor(cont: T) {
        this.content = cont;
    }

    content: T;
}
import { Router } from "@angular/router";
import { PaginationRequest } from "../../models/pagination-request";
import { Sort } from "../../models/sort";
import { UrlParamsExtractor } from "./url-params-extractor";

export class RouteApiActuator {

    private path: string;

    private extractor = new UrlParamsExtractor();

    constructor(
        private router: Router
    ) {
        this.path = this.router.url.split('?')[0];
    }

    public setPagination(pagination: PaginationRequest): void {
        this.setParameter(pagination);
    }

    public setPage(page: number): void {
        this.setParameter({ page });
    }

    public setPageSize(size: number): void {
        this.setParameter({ size });
    }

    public setOrder(sort: Sort<any>): void {
        const value = `${String(sort.property)},${sort.order}`
        let parameters = this.extractor.getUrlParams(this.router.url);

        parameters = this.extractor.getUrlParamsWithout(parameters, 'sort', (s) => s.startsWith(`${String(sort.property)},`));
        parameters = this.appendParameter(parameters, 'sort', value);
        this.navigate(parameters);
    }

    public setParameter(params: any): void {
        const urlParams = this.extractor.getUrlParams(this.router.url);

        const parameters = { ...urlParams, ...params };
        this.navigate(parameters);
    }

    private appendParameter(parameters: { [key: string]: any }, key: string, value: any): { [key: string]: any } {
        const param = parameters[key];
        if (param) {
            if (Array.isArray(param)) {
                param.push(value);
            } else {
                parameters[key] = [param, value];
            }
        } else {
            parameters[key] = value;
        }

        return parameters;
    }

    public removeOrder(property: string): void {
        let parameters = this.extractor.getUrlParams(this.router.url);
        parameters = this.extractor.getUrlParamsWithout(parameters, 'sort', (s) => s.startsWith(`${property},`));

        this.navigate(parameters);
    }

    private navigate(parameters: any = {}): void {
        this.router.navigate([this.path], { queryParams: parameters });
    }

}
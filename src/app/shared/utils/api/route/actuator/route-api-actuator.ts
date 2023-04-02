import { Router } from "@angular/router";
import { RouteParametersActuator } from "@app/shared/utils/route/actuator/route-parameters-actuator";
import { UrlParamsExtractor } from "@app/shared/utils/route/actuator/url-parameters-extractor";
import { PaginationRequest } from "../../models/pagination-request";
import { Sort } from "../../models/sort";
import { UrlParamsProcessor } from "./url-params-processor";

export class RouteApiActuator {

    private urlExtractor = new UrlParamsExtractor();

    private urlProcessor = new UrlParamsProcessor();

    private wrappedActuator;

    constructor(
        private router: Router
    ) {
        this.wrappedActuator = new RouteParametersActuator(router);
    }

    public setPagination(pagination: PaginationRequest): void {
        this.wrappedActuator.addParameters(pagination);
    }

    public setPage(page: number): void {
        this.wrappedActuator.addParameters({ page });
    }

    public setPageSize(size: number): void {
        this.wrappedActuator.addParameters({ size });
    }

    public setOrder(sort: Sort<any>): void {
        const value = `${String(sort.property)},${sort.order}`
        let parameters = this.urlExtractor.getUrlParams(this.router.url);

        parameters = this.urlProcessor.getUrlParamsWithout(parameters, 'sort', (s) => s.startsWith(`${String(sort.property)},`));
        parameters = this.urlProcessor.appendParameter(parameters, 'sort', value);

        this.wrappedActuator.setParameters(parameters);
    }

    public removeOrder(property: string): void {
        let parameters = this.urlExtractor.getUrlParams(this.router.url);

        parameters = this.urlProcessor.getUrlParamsWithout(parameters, 'sort', (s) => s.startsWith(`${property},`));

        this.wrappedActuator.setParameters(parameters);
    }

}
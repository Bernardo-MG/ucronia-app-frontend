import { Params, Router } from "@angular/router";
import { UrlParamsExtractor } from "./url-parameters-extractor";

/**
 * Route parameters actuator. Allows changing the query parameters on the route URL.
 * 
 * All the operations on the URL are done dynamically through the router. So these are always on the current URL.
 */
export class RouteParametersActuator {

    /**
     * URL parameters extractor. This takes care of getting the parameters to be modified.
     */
    private urlParamsExtractor = new UrlParamsExtractor();

    constructor(
        private router: Router
    ) { }

    /**
     * Adds the received object properties as parameters into the URL. If the parameters already exist they are overriden, otherwise they are set.
     * 
     * @param parameters parameters to set into the URL
     */
    public addParameters(parameters: any): void {
        // Takes the parameters already existing in the URL
        const urlParams = this.urlParamsExtractor.getUrlParams(this.router.url);
        // Adds the received parameters, overriding any existing
        const mergedParameters = { ...urlParams, ...parameters };

        // Sets the final parameters
        this.setParameters(mergedParameters);
    }

    /**
     * Sets the received parameters into the URL. All existing parameters are overriden.
     * 
     * @param parameters parameters to set into the URL
     */
    public setParameters(parameters: Params): void {
        // Takes the URL without the parameters
        const path = this.router.url.split('?')[0];
        // Navigates adding the received parameters
        this.router.navigate([path], { queryParams: parameters });
    }

}
/**
 * URL parameters extractor. User by the URL parameters actuator
 */
export class UrlParamsExtractor {

    constructor() { }

    /**
     * Extracts the parameters from the URL.
     * 
     * For example, the URL http://somewhere.com/route?key=value will return the map { 'key': 'value' }.
     * 
     * @param url URL with query parameters
     * @returns the URL parameters
     */
    public getUrlParams(url: string): { [key: string]: any } {
        const resultUrlParams: { [key: string]: any } = {};

        // Splits the URL apart from the parameters
        const urlSections = url.split('?');
        if (urlSections.length > 1) {
            // There are parameters in the URL
            const paramsSection = urlSections[1];
            // Splits the parameters to get each key-value pair separately
            const paramsPairs = paramsSection.split('&');

            // Extract parameters
            paramsPairs
                // Split into pairs
                .map(p => p.split('='))
                // Security check, to verify it is a valid pair
                .filter(p => p.length >= 2)
                // Add pairs to the result map
                .forEach(p => this.addParameters(p, resultUrlParams));
        }

        return resultUrlParams;
    }

    /**
     * Adds the parameters pair to the received store.
     * 
     * If the parameter key already exists, then it is added to a list of values. If the value is already a list, then the current value is added to it.
     * 
     * @param paramsPair parameter key-value pair
     * @param paramsStore store containing the resulting parameters
     */
    private addParameters(paramsPair: string[], paramsStore: { [key: string]: any }) {
        if (paramsPair[0] in paramsStore) {
            // The pair already exists in the resulting parameters
            // This is a list of parameters

            // Find the existing parameter pair
            const existingParamsPair = paramsStore[paramsPair[0]];
            if (Array.isArray(existingParamsPair)) {
                // It is an array
                // Can add the current value
                existingParamsPair.push(paramsPair[1]);
            } else {
                // It isn't an array
                // Creates a new array with the values and sets it into the result
                paramsStore[paramsPair[0]] = [existingParamsPair, paramsPair[1]];
            }
        } else {
            // New pair of parameters
            paramsStore[paramsPair[0]] = paramsPair[1];
        }
    }

}
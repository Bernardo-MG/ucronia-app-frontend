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
            // Extract parameter pairs
            paramsPairs.forEach(p => {
                // Security check, to verify it is a valid pair
                const pair = p.split('=');
                if (pair.length >= 2) {
                    if (pair[0] in resultUrlParams) {
                        // The pair already exists in the resulting parameters
                        // This is a list of parameters

                        // Find the existing parameter pair
                        const existingParamsPair = resultUrlParams[pair[0]];
                        if (Array.isArray(existingParamsPair)) {
                            // It is an array
                            // Can add the current value
                            existingParamsPair.push(pair[1]);
                        } else {
                            // It isn't an array
                            // Creates a new array with the values and sets it into the result
                            resultUrlParams[pair[0]] = [existingParamsPair, pair[1]];
                        }
                    } else {
                        // New pair of parameters
                        resultUrlParams[pair[0]] = pair[1];
                    }
                }
            });
        }

        return resultUrlParams;
    }

}
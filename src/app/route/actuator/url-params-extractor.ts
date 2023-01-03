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
        const urlParams: { [key: string]: any } = {};

        const sections = url.split('?');
        if (sections.length > 1) {
            const paramSection = sections[1];
            const pairs = paramSection.split('&');
            pairs.forEach(p => {
                const pair = p.split('=');
                if (pair.length >= 2) {
                    if (pair[0] in urlParams) {
                        const param = urlParams[pair[0]];
                        if (Array.isArray(param)) {
                            param.push(pair[1]);
                        } else {
                            urlParams[pair[0]] = [param, pair[1]];
                        }
                    } else {
                        urlParams[pair[0]] = pair[1];
                    }
                }
            });
        }

        return urlParams;
    }

}
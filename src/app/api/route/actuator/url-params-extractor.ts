export class UrlParamsExtractor {

    constructor() { }

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

    public getUrlParamsWithout(parameters: { [key: string]: any }, key: string, selector: (sort: any) => boolean): { [key: string]: any } {
        if (key in parameters) {
            const value = parameters[key];
            if (Array.isArray(value)) {
                const validSorts = value.filter(s => !selector(s));

                if (validSorts.length == 1) {
                    parameters[key] = validSorts[0];
                } else if (validSorts.length > 1) {
                    parameters[key] = validSorts;
                } else {
                    delete parameters[key];
                }
            } else if (selector(value)) {
                delete parameters[key];
            }
        }

        return parameters;
    }

    public appendParameter(parameters: { [key: string]: any }, key: string, value: any): { [key: string]: any } {
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

}
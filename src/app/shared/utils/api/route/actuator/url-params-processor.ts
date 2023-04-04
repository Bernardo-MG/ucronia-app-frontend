export class UrlParamsProcessor {

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
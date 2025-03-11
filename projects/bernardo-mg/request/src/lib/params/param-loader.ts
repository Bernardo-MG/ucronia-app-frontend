/**
 * Loads parameters into a client.
 */
export interface ParamLoader {

    load(setParameter: (name: string, value: string | number | boolean | undefined) => void): void;

}
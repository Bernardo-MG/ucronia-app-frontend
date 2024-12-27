/**
 * Loads parameters into a client.
 */
export interface ParamLoader {

    load(setParameter: (name: string, value: any) => void): void;

}
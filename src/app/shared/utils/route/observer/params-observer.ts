import { BehaviorSubject } from "rxjs";

export interface ParamsObserver<T> {

  get subject(): BehaviorSubject<T | undefined>;

}
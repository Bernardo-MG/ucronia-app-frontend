import { ReplaySubject } from "rxjs";
import { Sort } from "../../models/sort";
import { OrderActuator } from "./order-actuator copy";

export class ReplaySubjectOrderActuator implements OrderActuator {

    public sort = new ReplaySubject<Sort<any>>();

    public sortAscending(property: any) {
        const sort: Sort<any> = {
            property,
            order: "asc"
        };

        this.sort.next(sort);
    }

    public sortDescending(property: any) {
        const sort: Sort<any> = {
            property,
            order: "desc"
        };

        this.sort.next(sort);
    }

}
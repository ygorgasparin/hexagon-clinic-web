import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CoreService} from "../core/service/core.service";

@Injectable()
export class DoctorService extends CoreService {

    constructor(public http: Http) {
        super(http, '/doctors');
    }

}

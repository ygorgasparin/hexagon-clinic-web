import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CoreService {

    constructor(public http: Http, public base_url: string) {
    }

    getAll(search_filter?: string, sort_name?: string): Observable<string> {

        let params = new URLSearchParams();

        if (search_filter != null && search_filter.trim().length > 0) {
            params.set('filter', "name:" + search_filter);
        }

        if (sort_name != null && sort_name.trim().length > 0) {
            params.set('sort', sort_name);
        }

        let request = this.http.get(this.base_url, {params: params});
        return request.map((res: Response) => res.json())
            .catch(() => Observable.of('Error, could not obtains doctors list'));
    }

    save(obj: any): Observable<string> {

        if (obj.id)
            return this.http.put(this.base_url + '/' + obj.id, obj)
                .map((res: Response) => res.json())
                .catch(() => Observable.of('Error, could not save doctor'));
        else

            return this.http.post(this.base_url, obj)
                .map((res: Response) => res.json())
                .catch(() => Observable.of('Error, could not save doctor'));
    }

    delete(obj: any): Observable<string> {
        return this.http.delete(this.base_url + '/' + obj.id, obj)
            .map((res: Response) => res.json())
            .catch(() => Observable.of('Error, could not delete doctor'));
    }


}

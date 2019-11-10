import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    // backendUrl = 'http://local.hr-backend.com';
    backendUrl = 'https://master-7rqtwti-gtjxwlhcnataw.au.platformsh.site';
    

    getCurrencyConversionData(): Observable<any> {
        return this.http.get(this.backendUrl + '/currency');
    }

    constructor(private http: HttpClient) {
    }

    getLeaveInfo(query: string, param: string): Observable<any> {
        const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

        return this.http.get(`${this.backendUrl}/hr_rest_api/hr_resource?_format=json&${query}=${param}&rand=${Math.floor(Math.random() * 2000)}`, headers);
    }

    addLeave(query = 'type', param = 'all', taxonomy: number, start: string, end: string, user = 1): Observable<any> {
        const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        const posted = moment().unix();
        return this.http.get(`${this.backendUrl}/hr_rest_api/hr_resource?_format=json&${query}=${param}&taxonomy=${taxonomy}&user=${user}&start=${start}&end=${end}&posted=${posted}&rand=${Math.floor(Math.random() * 2000)}`, headers);
    }

    deleteLeave(pid: any) {
        return this.http.get(`${this.backendUrl}/hr_rest_api/hr_resource?_format=json&type=delete&pid=${pid}&rand=${Math.floor(Math.random() * 2000)}`);
    }
}

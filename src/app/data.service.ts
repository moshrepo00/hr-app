import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    backendUrl = 'http://local.hr-backend.com';

    getCurrencyConversionData(): Observable<any> {
        return this.http.get(this.backendUrl + '/currency');
    }

    constructor(private http: HttpClient) {
    }

    getLeaveInfo(query: string, param: string): Observable<any> {
        const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

        return this.http.get(`${this.backendUrl}/hr_rest_api/hr_resource?_format=json&${query}=${param}`, headers);
    }
}

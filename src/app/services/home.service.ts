import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HomeService{
    http:any;

    constructor(http:Http){
        this.http = http;
    }

    getPosts(url, token){
        let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);

        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .map(res => res.json());
    }
}
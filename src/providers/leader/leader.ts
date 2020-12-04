import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../../shared/baseUrl';
import { Leader } from '../../shared/leader';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: HttpClient,
    private processHTTPMsgService:ProcessHttpMsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getLeader(id: number): Observable<Leader> {
    return  this.http.get<Leader>(baseURL + 'leadership/'+ id)
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
    .map(data => data[0])
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}

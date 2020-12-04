import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../shared/baseUrl';
import { Promotion } from '../../shared/promotion';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';
/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: HttpClient,
    private processHTTPMsgService:ProcessHttpMsgProvider) {
    console.log('Hello PromotionProvider Provider');
  }
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.http.get(baseURL + 'promotions/'+ id)
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
    .map(data => data[0])
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}

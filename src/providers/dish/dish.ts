import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  Http, Response } from '@angular/http';
import { Dish } from '../../shared/dish';
import { baseURL } from '../../shared/baseUrl';
import { ProcessHttpMsgProvider } from '../process-http-msg/process-http-msg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
 /*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: HttpClient,
    private processHttpMsgService:ProcessHttpMsgProvider) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
                    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get<Dish>(baseURL + 'dishes/'+ id)
                    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true')
    .map(data => data[0])
    .catch(error => { return this.processHttpMsgService.handleError(error); });
  }
}

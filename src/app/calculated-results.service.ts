import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Touple} from './calculated-results'
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CalculatedResultsService {
  url = "${environment.apiUrl}/calculated_results"
  constructor(private http: HttpClient) { }



saveDataTouple(touple:Touple){
  return this.http.post<Touple>(this.url,touple)
}
}

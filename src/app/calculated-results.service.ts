import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Touple} from './calculated-results'


@Injectable({
  providedIn: 'root'
})
export class CalculatedResultsService {
  url = "http://localhost:5000/calculated_results"
  constructor(private http: HttpClient) { }



saveDataTouple(touple:Touple){
  return this.http.post<Touple>(this.url,touple)
}
}

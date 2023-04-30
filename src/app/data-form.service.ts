import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Results } from './results';


@Injectable({
  providedIn: 'root'
})
export class DataFormService {
 url = "http://localhost:5000/update";
urlget ="http://localhost:5000/results"

constructor(private http: HttpClient) { }




  /*
  getResults():Observable<Results[]>{
    return this.http.get<Results[]>('https://jsonplaceholder.typicode.com/users')//('http://localhost:4000/results')
  }*/
  getResults():Observable<Results[]>{
    const results = this.http.get<Results[]>(this.urlget)
    return results;
  }

  saveFormData(data: any ){
    const httpHeaders = new HttpHeaders().
      set('Content-Type', 'application/json').
      set('Accept', 'application/json').
      set('Access-Control-Allow-Origin', '*')
    return this.http.post(this.url,data.json,{ headers: httpHeaders })
  }

  saveData(result:Results){
    return this.http.post<Results>(this.url,result)
  }

}

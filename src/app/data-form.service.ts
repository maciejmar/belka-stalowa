import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Results } from './results';
import { ResultsComponent } from './results/results.component';
import { ResultsBeam } from '../../src/resultsdata';
import { environment } from './../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DataFormService {
 url = `${environment.apiUrl}/update`;
 urlget =`${environment.apiUrl}/results`
 urlCalculatedResults = `${environment.apiUrl}/calculated_results`
 urlAv = `${environment.apiUrl}/scinanie`
 urlN = `${environment.apiUrl}/usability`
 urlAd = `${environment.apiUrl}/support`
 urlHT = `${environment.apiUrl}/intersection`

constructor(private http: HttpClient) { }

  /*
  getResults():Observable<Results[]>{
    return this.http.get<Results[]>('https://jsonplaceholder.typicode.com/users')//('http://localhost:4000/results')
  }*/
  getResults():Observable<Results[]>{
    const results = this.http.get<Results[]>(this.urlget)
    return results;
  }
  getCalculatedResults():Observable<{"Wmin":number, "Imin":number}>{
    const results = this.http.get<{"Wmin":number, "Imin":number}>(this.urlCalculatedResults)
    console.log('results in calculatedResults here ', results);
    return results;
  }


  getResultsBeam():Observable<ResultsBeam[]>{
    const results = this.http.get<ResultsBeam[]>(this.urlget)
    return results;
  }

  saveFormData(data: ResultsBeam ){
    const httpHeaders = new HttpHeaders().
      set('Content-Type', 'application/json').
      set('Accept', 'application/json').
      set('Access-Control-Allow-Origin', '*')
    return this.http.post<ResultsBeam>(this.url,data,{ headers: httpHeaders })
  }

  saveData(result:Results){
    return this.http.post<Results>(this.url,result)
  }
  saveAv(Av:any){
    console.log('Av in saveAv = ', Av)
    const httpHeaders = new HttpHeaders().
      set('Content-Type', 'application/json').
      set('Accept', 'application/json').
      set('Access-Control-Allow-Origin', '*')
    return this.http.post<any>(this.urlAv, Av,{ headers: httpHeaders })
  }

  saveN(n:any){
    console.log('n in saveN =', n)
    const httpHeaders = new HttpHeaders().
      set('Content-Type', 'application/json').
      set('Accept', 'application/json').
      set('Access-Control-Allow-Origin', '*')
    return this.http.post<any>(this.urlN, n,{ headers: httpHeaders })
  }
  saveAd(Ad:any,fcdd:any){
    const httpHeaders = new HttpHeaders().
      set('Content-Type', 'application/json').
      set('Accept', 'application/json').
      set('Access-Control-Allow-Origin', '*')
    const dataAd = {
        'Ad':Ad,
        'fcdd':fcdd
      }
    return this.http.post<any>(this.urlAd, dataAd,{ headers: httpHeaders })
  }
  saveHT(h:any,t:any){
    const httpHeaders = new HttpHeaders().
      set('Content-Type', 'application/json').
      set('Accept', 'application/json').
      set('Access-Control-Allow-Origin', '*')
    const dataHT = {
        'h':h,
        't':t
      }
    return this.http.post<any>(this.urlHT, dataHT,{ headers: httpHeaders })
  }

}

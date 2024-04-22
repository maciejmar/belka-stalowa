import { Component, OnInit } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataFormService } from '../data-form.service';
import { CalculatedResultsService } from '../calculated-results.service'
import { DataConditionsService } from '../services/data-conditions.service'
import { Touple } from '../calculated-results';
import { Results } from '../results'

@Component({
  selector: 'app-calculated-results',
  templateUrl: './calculated-results.component.html',
  styleUrls: ['./calculated-results.component.css']
})

export class CalculatedResultsComponent implements OnInit {
  calculated_results = {"Wmin":0,"Imin":0,"qk":0}
  results:Results[]=[]
  Minim!: Results
  Winim!: Results
  wmin!: string
  imin!:string
  message=''

  constructor(private http: HttpClient, private calculated_results_:CalculatedResultsService
    , private fromFormService: DataFormService, private dataConditions: DataConditionsService) { }
  touple={
    "Wmin":0,
    "Imin":0,
    "qk":0,
    "message":''
  }
  newToupleWminImin = new FormGroup ({

      WminNew : new FormControl ('', Validators.required),
      IminNew : new FormControl ('', Validators.required),
      qk      : new FormControl ('', Validators.required),
  })

  ngOnInit(): void {
    this.getAllResults();

  }


  onSubmitTouple(){
    if(this.touple)
      console.log('onSubmitTouple() - ', this.touple)
      this.calculated_results_.saveDataTouple(this.touple).subscribe((data) => {
        this.message = data.message;
        console.log("this.message ++++++++++++  ", this.message);
        this.dataConditions.updateData(this.message);
      });
  }

    getAllResults():Results{
    
      this.fromFormService.getResults().subscribe(data =>
      {
        this.results = data;
        console.log('results in getallResults() - ----->', this.results)
      }); 
        const len = this.Minim.toString().length;
        this.Minim = this.results[len-1]
        console.log("results is in calculated results =", this.results)
    return this.Minim
  }

  extract(): string[]{
   if (this.results) {
      let res = this.results[this.results.length - 1];
      console.log('length of results = ',this.results.length)
      let resTemp = res.toString().split(',');
      console.log('resTemp=',resTemp);
      let resTemp2 = resTemp[6];
      let resTemp3 = resTemp[7];
      let ret = [];
      ret.push(resTemp2,resTemp3);
      console.log('here will be ret');
      console.log('ret - ', ret);
      return ret
       
    } 
  else  return []

  }

 
}

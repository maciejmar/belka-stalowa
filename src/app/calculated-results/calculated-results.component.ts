import { Component, OnInit } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataFormService } from '../data-form.service';
import { CalculatedResultsService } from '../calculated-results.service'
import { Touple } from '../calculated-results';
import { Results } from '../results'
@Component({
  selector: 'app-calculated-results',
  templateUrl: './calculated-results.component.html',
  styleUrls: ['./calculated-results.component.css']
})

export class CalculatedResultsComponent implements OnInit {
  calculated_results = {"Wmin":0,"Imin":0}
  
  results: Results[] = [
    { name: 'Name1', userName: 'Username1' },
    { name: 'Name2', userName: 'Username2' },
    
  ];
  Minim!: Results
  Winim!: Results
  wmin!: string
  imin!:string

  constructor(private http: HttpClient, private calculated_results_:CalculatedResultsService
    , private fromFormService: DataFormService) { }
  touple:Touple={
    "Wmin":0,
    "Imin":0
  }
  newToupleWminImin = new FormGroup ({

      WminNew : new FormControl ('', Validators.required),
      IminNew : new FormControl ('', Validators.required)
  })

  ngOnInit(): void {
    this.getAllResults();

  }

   
   
     

   


  onSubmitTouple(){
    if(this.touple)
      console.log('onSubmitTouple() - ', this.touple)
      this.calculated_results_.saveDataTouple(this.touple).subscribe()
  }

    getAllResults():Results{
    
    this.fromFormService.getResults().subscribe(data =>
      {
        this.results = data;
        this.Minim= this.results[7];
        
        const wmin = this.Minim.toString()[7]
        const imin = this.Minim.toString()[8]
       
        
        console.log("results is in calculated results =", this.results, 'wmin ',wmin,'imin ',imin)
       });
       
    return this.Minim;
  }

  extractWmin(): number | null {
    // Assuming the string is in `results.name` and the pattern is "Wmin:value"
    const pattern = /Wmin:(\d+)/;
    const len = this.results.length
    const match = this.results[len-1].name.match(pattern);
  
    if (match && match[1]) {
      // Convert the extracted string to a number and return it
      return Number(match[1]);
    } else {
      // Return null if no Wmin value is found
      return null;
    }
  }
}

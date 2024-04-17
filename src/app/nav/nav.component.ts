import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataFormService } from '../data-form.service'
import { Observable } from 'rxjs'
import { Results } from '../results'
import { ResultsBeam } from 'src/resultsdata';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  steel!:number;
  formPy = new FormGroup ({
  name: new FormControl(''),
  userName: new FormControl('')
  })
  steelForm: FormGroup;
  typesS=['S235','S275','S335']




     result:Results={'name':'as','userName':'sds'};
     results:Results[]=[];
     resultsBeam:ResultsBeam = {'l_0':1,'steelType':'stx0', 'q':2,'V':3,'qk':4,'M':5,'Wmin':4,'Imin':3,
                                'Av':2,'n':2,'Ad':2,'fcdd':0,'h':2, 't':1, 'Ved':1
     };
     resultsBeamArray:ResultsBeam[]=[];
     data:any;
     url=`${environment.apiUrl}/update`

    constructor( private http: HttpClient, private dataFromForm: DataFormService) {
      this.steelForm = new FormGroup ({
        steelType : new FormControl(this.typesS[3]),
          l_0 : new FormControl ('', Validators.required),
          q : new FormControl ('', Validators.required),
          qk : new FormControl ('', Validators.required),
          M : new FormControl ('', Validators.required),
          V : new FormControl('', Validators.required),
          n: new FormControl ('', Validators.required),
          Wmin:new FormControl(''),
          Imin: new FormControl('')
        });
      // this.dataFromForm.getResults().subscribe((data)=>{
      //   console.log('data in constr ', data)
      // })
      this.dataFromForm.getResultsBeam().subscribe((data:any) =>{
        console.log('dataBeam in constr ', data)
      })
    }



     ngOnInit() {
      this.getAllResults();

     }

      submitForm() {
        this.dataFromForm.saveFormData(this.steelForm.value).subscribe((result)=>{console.log(result)});
        console.log('this.steelForm.value ',this.steelForm.value);
      }

      onSubmitFormPyForm(){
        if(this.result)
          console.log('onsubmitFormPyForm - ', this.result)
          this.dataFromForm.saveData(this.result).subscribe()

      }
      getAllResults(){
        this.dataFromForm.getResults().subscribe(data =>this.results = data);
      }
      getAllResultsBeam(){
        this.dataFromForm.getResultsBeam().subscribe(data =>this.resultsBeamArray = data);
      }

}

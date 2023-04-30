import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataFormService } from '../data-form.service'
import { Observable } from 'rxjs'
import { Results } from '../results'


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

  steelForm = new FormGroup ({
  steelType :  new FormControl(''),
    l0 : new FormControl (''),
    q : new FormControl (''),
    qk : new FormControl (''),
    M : new FormControl (''),
    V : new FormControl('')
  });



     result:Results={'name':'as','userName':'sds'};
     results:Results[]=[];
     data:any;
     url='http://localhost:5000/update'

    constructor( private http: HttpClient, private dataFromForm: DataFormService) {
      this.dataFromForm.getResults().subscribe((data)=>{
        console.log('data in constr ', data)
      })
    }



     ngOnInit() {
      this.getAllResults();

     }

      submitForm() {
        this.dataFromForm.saveFormData(this.steelForm.value).subscribe((result)=>{console.log(result)});
        console.log(this.steelForm.value);
      }

      onSubmitFormPyForm(){
        if(this.result)
          console.log('onsubmitFormPyForm - ', this.result)
          this.dataFromForm.saveData(this.result).subscribe()

      }
      getAllResults(){
        this.dataFromForm.getResults().subscribe(data =>this.results = data);
      }

}

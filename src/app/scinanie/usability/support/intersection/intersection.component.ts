import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataFormService } from '../../../../data-form.service';
import { DataConditionsService } from '../../../../services/data-conditions.service';
import { DataIntersectionService } from 'src/app/services/data-intersection.service';

@Component({
  selector: 'app-intersection',
  templateUrl: './intersection.component.html',
  styleUrls: ['./intersection.component.css']
})
export class IntersectionComponent implements OnInit {
  // h = new FormControl('');
  // t = new FormControl('');
  message:string=''
  FormForHT!: FormGroup;
  constructor(private http: HttpClient, private dataFromForm: DataFormService,
              private dataConditionsService:DataConditionsService, private dataIntersectionService:DataIntersectionService) {
    this.FormForHT = new FormGroup ({
         h: new FormControl('', Validators.required),
         t: new FormControl('', Validators.required)

     })

   }

  ngOnInit(): void {
  }


  //
    passHT(){
      if( this.FormForHT.valid){
        const hValue = this.FormForHT.get('h')!.value;
        const tValue = this.FormForHT.get('t')!.value;
        console.log('given h and t ', hValue,' ',tValue)
        this.dataFromForm.saveHT( hValue, tValue).subscribe(data=>{
          this.message = data.message;
          console.log("this.message >>>>>>>>>>>  ", this.message);
          this.dataIntersectionService.updateData(this.message);
        })

      }

    }
}

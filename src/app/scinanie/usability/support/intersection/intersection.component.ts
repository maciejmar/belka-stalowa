import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataFormService } from '../../../../data-form.service';

@Component({
  selector: 'app-intersection',
  templateUrl: './intersection.component.html',
  styleUrls: ['./intersection.component.css']
})
export class IntersectionComponent implements OnInit {
  // h = new FormControl('');
  // t = new FormControl('');
  FormForHT!: FormGroup;
  constructor(private http: HttpClient, private dataFromForm: DataFormService) {
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
        this.dataFromForm.saveHT( hValue, tValue).subscribe()
      }

    }
}

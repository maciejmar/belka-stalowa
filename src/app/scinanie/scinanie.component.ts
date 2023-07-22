import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataFormService } from '../data-form.service';

@Component({
  selector: 'app-scinanie',
  templateUrl: './scinanie.component.html',
  styleUrls: ['./scinanie.component.css']
})
export class ScinanieComponent implements OnInit {
  FormForAv!:FormGroup
  //Av = new FormControl('');
  isFormSubmited = false;
  constructor(private http: HttpClient, private dataFromForm: DataFormService) {
    this.FormForAv = new FormGroup({
      Av: new FormControl('', Validators.required)
    });
   }

 //FormForAv = new FormGroup ({
   // Av: new FormControl('',Validators.required)

   // })


  ngOnInit(): void {
  }
  passAv(){
    if(this.FormForAv.valid)
    this.isFormSubmited = true
    console.log('on submit Av - ', this.FormForAv.get('Av')!.value)
    console.log('json av ', JSON.stringify({'Av':this.FormForAv.get('Av')!.value}))
    const avData = JSON.stringify({ 'Av': this.FormForAv.get('Av')!.value });
    this.dataFromForm.saveAv( avData).subscribe()


  }


}

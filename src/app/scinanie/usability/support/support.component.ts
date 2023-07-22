import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataFormService } from '../../../data-form.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  // Ad = new FormControl('');
  // fcdd = new FormControl('');
  supportSubmitted = false;
  FormForSupport!:FormGroup;
  constructor(private http: HttpClient, private dataFromForm: DataFormService) {
    this.FormForSupport = new FormGroup({
      Ad: new FormControl('', Validators.required),
      fcdd: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  passAd(){
    if (this.FormForSupport.valid){
    this.supportSubmitted = true
    const adValue = this.FormForSupport.get('Ad')!.value;
    const fcddValue = this.FormForSupport.get('fcdd')!.value;
    console.log('ad i fcdd ', adValue ,' ', fcddValue)
    this.dataFromForm.saveAd( adValue, fcddValue).subscribe()


    }

  }

}

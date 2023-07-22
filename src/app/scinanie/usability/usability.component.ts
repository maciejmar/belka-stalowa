import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataFormService } from '../../data-form.service';

@Component({
  selector: 'app-usability',
  templateUrl: './usability.component.html',
  styleUrls: ['./usability.component.css']
})
export class UsabilityComponent implements OnInit {

  FormForN!:FormGroup;
  isFormPassNSubmitted = false
  n!:FormControl

  constructor(private http: HttpClient, private dataFromForm: DataFormService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    this.FormForN = this.fb.group ({
       n: ['',Validators.required]
    })
  }
 passN(){

    this.isFormPassNSubmitted = true;
    const nValue = this.FormForN.get('n')?.value;

    console.log('this.n.value =', nValue)
    this.dataFromForm.saveN( JSON.stringify({'n':nValue})).subscribe()

  return{}
 }
}

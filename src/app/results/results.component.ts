import { Component, OnInit } from '@angular/core';
import { Results } from '../results'
import { DataFormService } from '../data-form.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
results:Results[]=[]
  constructor(private dataFromForm: DataFormService) { }

  ngOnInit(): void {
     this.getAllResults();
  }

  getAllResults(){
    this.dataFromForm.getResults().subscribe(data =>this.results = data);
  }

}

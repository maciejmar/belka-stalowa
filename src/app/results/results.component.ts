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
currentPage: number = 1;
itemsPerPage: number = 10;
totalPages: number=0;
  constructor(private dataFromForm: DataFormService) { 
    this.totalPages = Math.ceil(this.results.length / this.itemsPerPage);
  }

  ngOnInit(): void {
     this.getAllResults();
  }

  getAllResults(){
    this.dataFromForm.getResults().subscribe(data =>this.results = data.reverse());
  }

  getItemsForCurrentPage(): string {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.results.toString().slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

}

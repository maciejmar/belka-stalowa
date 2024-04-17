import { Component, OnInit } from '@angular/core';
import { Results } from '../results'
import { DataFormService } from '../data-form.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: Results[] = [
    { name: 'Name1', userName: 'Username1' },
    { name: 'Name2', userName: 'Username2' },
    
  ];

currentPage: number = 1;
itemsPerPage: number = 10;


labels:string[]=['l_0[m]', 'steelType', 'q [kn/m]', 'V [kN]', 'qk [kN/m]', 'M [m]', 'Wmin [mm**3]', 'Imin [mm**4]', 'Av [m**2]', 'n', 'Ad [m**2]', 'f_cdd [kPa]', 'h [mm]','t [mm]', 'Ved [kN]' ];
  constructor(private dataFromForm: DataFormService) { 
  
  }
  
  totalPages = Math.ceil(this.results.length / this.itemsPerPage);
  ngOnInit(): void {
     this.getAllResults();
  }

  getAllResults(){
    this.dataFromForm.getResults().subscribe(data =>this.results = data.reverse());
  }

  // getItemsForCurrentPage(): string {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   console.log('startIndex=', startIndex);
  //   console.log('startIndex=', startIndex + this.itemsPerPage);
  //   console.log('this results in getItemsForCurrentPage ', this.results.toString().slice(startIndex, startIndex + this.itemsPerPage))
  //   return this.results.toString().slice(startIndex, startIndex + this.itemsPerPage);
  // }

  getItemsForCurrentPage(): Results[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    console.log('startIndex=', startIndex);
    console.log('startIndex=', startIndex + this.itemsPerPage);
    return this.results.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
  splitData(data: string): string[] {
    return data.split(',');
  }
}

import { Component, OnInit } from '@angular/core';
import { Results } from '../results'
import { DataFormService } from '../data-form.service';
import { DataConditionsService } from '../services/data-conditions.service';
import { DataSupportService } from '../services/data-support.service';
import { DataUsabilityService } from '../services/data-usability.service';
import { DataIntersectionService } from '../services/data-intersection.service';

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
receivedData: string ='';
receiveDataSupport:string='';
receiveDataUsability:string='';
receiveIntersection:string='';
boolTab:boolean []=[];

labels:string[]=['l_0[m]', 'steelType', 'q [kN/m]', 'V [kN]', 'gk [kN/m]', 'M [kNm]', 'Wmin [mm**3]', 'Imin [mm**4]', 'Av [m**2]', 'n', 'Ad [m**2]', 'fcdd [kPa]', 'h [mm]','t [mm]', 'Ved [kN]' ];
  constructor(private dataFromForm: DataFormService, private dataConditionsService:DataConditionsService,
    private dataSupportService:DataSupportService, private dataUsabilityService:DataUsabilityService,
    private dataIntersectionService:DataIntersectionService) { 
  
  }
  
  totalPages = Math.ceil(this.results.length / this.itemsPerPage);
  ngOnInit(): void {
     this.getAllResults();

     this.dataConditionsService.dataObservable.subscribe((data) => {
      this.receivedData = data;
      console.log("message as receivedData this is from subscribed  ", this.receivedData);
     })

     this.dataSupportService.dataObservable.subscribe((data) => {
        this.receiveDataSupport = data;
        console.log("message as receivedDataSupport this is from subscribed 2 ", this.receiveDataSupport);
     });

     this.dataUsabilityService.dataObservable.subscribe((data)=>{
       this.receiveDataUsability = data;
       console.log("message as receivedDataUsability this is from subscribed 3 ", this.receiveDataUsability);
     });

     this.dataIntersectionService.dataObservable.subscribe((data)=>{
      this.receiveIntersection = data;
      console.log("message as receivedDataIntersection this is from subscribed 4 ", this.receiveIntersection);
     });
     
     if (this.receivedData== "warunek nośności został spełniony") this.boolTab[0]= true ;
       else this.boolTab[0] = false;
     if (this.receiveDataSupport == "warunek na docisk na oparciu belki spełniony") this.boolTab[1]= true ;
       else this.boolTab[1]= false;
     if(this.receiveDataUsability =="war. stanu graniczego użytkowalności spełniony") this.boolTab[2]= true;
       else this.boolTab[2]= false;
     if(this.receiveIntersection= "Ścianka profilu jest odporna na miejscową utratę stateczności") this.boolTab[3]= true;
       else this.boolTab[3]= false;
     
     this.receiveDataSupport

  }
  getAllResults(){
    this.dataFromForm.getResults().subscribe(data =>
      this.results = data.reverse());
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [

  { path:'results',
     component:ResultsComponent},
  { path:'home',
     component:ResultsComponent},
  { path: '',
     component:NavComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

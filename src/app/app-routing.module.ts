import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { NavComponent } from './nav/nav.component';
import { CalculatedResultsComponent } from './calculated-results/calculated-results.component';
import { ScinanieComponent } from './scinanie/scinanie.component';
import { SupportComponent } from './scinanie/usability/support/support.component';
import { UsabilityComponent } from './scinanie/usability/usability.component';
import { IntersectionComponent } from './scinanie/usability/support/intersection/intersection.component';

const routes: Routes = [

  { path:'results',
     component: ResultsComponent},
  { path:'home',
     component: ResultsComponent},
  { path: 'calculated_results',
    component: CalculatedResultsComponent},
  { path: '',
     component: NavComponent },
  { path: 'scinanie',
  component: ScinanieComponent },
  { path: 'usability',
  component: UsabilityComponent },
  { path: 'support',
  component: SupportComponent },
  { path: 'intersection',
  component: IntersectionComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

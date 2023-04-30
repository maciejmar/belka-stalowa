import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ResComponent } from './res/res.component';
import { HttpClientModule, HttpHeaders} from '@angular/common/http';
import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ResComponent,
    ResultsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

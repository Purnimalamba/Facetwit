import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';
import {FacebookComponent} from './facebook/facebook.component';
import {TwitterComponent} from './twitter/twitter.component'
import { FacebookModule,FacebookService } from 'ngx-facebook';
import { AppComponent } from './app.component';


const routes:Routes =[
{
  path:'facebook' , component:FacebookComponent
} ,
  {
    path : 'twitter' , component :TwitterComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TwitterComponent,
    FacebookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }

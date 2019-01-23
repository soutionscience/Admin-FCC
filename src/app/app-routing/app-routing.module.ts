import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import {Routes, RouterModule, Router} from '@angular/router';
import { AppComponent } from '../app.component';


const routes: Routes=[
  {path: '', loadChildren: './admin.module#AdminModule'}
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]

})
export class AppRoutingModule { }

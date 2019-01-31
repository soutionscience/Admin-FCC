import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import {Routes, RouterModule, Router} from '@angular/router';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../navbar/navbar.component';


const routes: Routes=[
  {path: '', loadChildren: './admin.module#AdminModule'},
  {path: 'new-competition', loadChildren: './create-compe.module#CreateCompeModule'}
]

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]

})
export class AppRoutingModule { }

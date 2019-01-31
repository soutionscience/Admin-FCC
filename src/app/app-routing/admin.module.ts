import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LeagueDetailsComponent } from '../league-details/league-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes=[
  {path: '', component: AdminHomeComponent}
]

@NgModule({
  declarations: [AdminHomeComponent,LeagueDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes=[
  {path: '', component: AdminHomeComponent}
]

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }

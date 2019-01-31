import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompeComponent } from '../create-compe/create-compe.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes= [
  {path: '', component: CreateCompeComponent}]

@NgModule({
  declarations: [CreateCompeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ]
})
export class CreateCompeModule { }

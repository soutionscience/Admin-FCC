import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-compe',
  templateUrl: './create-compe.component.html',
  styleUrls: ['./create-compe.component.scss']
})
export class CreateCompeComponent implements OnInit {
  compeForm: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createForm(){
    this.compeForm = this.fb.group({
      prize: ['', [Validators.required] ],
      gas: ['1000000', [Validators.required] ]
    })
  }

  createNewCompe(){
    console.log(this.compeForm.value)
  }

}

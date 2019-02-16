import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Web3ServiceService } from '../services/web3-service.service';
import { leagueAdress } from '../shared/baseAddress';


@Component({
  selector: 'app-create-compe',
  templateUrl: './create-compe.component.html',
  styleUrls: ['./create-compe.component.scss']
})
export class CreateCompeComponent implements OnInit {
  compeForm: FormGroup
  competitions: String [] = [];

  constructor(private fb: FormBuilder, private web3Service: Web3ServiceService) {  }

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
    console.log('creating compe')
    this.web3Service.createCompetion(leagueAdress, this.compeForm.value.gas, this.compeForm.value.prize)
    .subscribe(resp=>{
      console.log(resp)
    })
  }
  // getCompetitons(){
  //   console.log('competitions ....');
  //   let numberOfCompe = 3
  //   for (let index = 0; index < numberOfCompe; index++) {
  //     this.web3Service.getAllCompetitons(leagueAdress, index, '1000000')
  //     .subscribe(resp=>{
  //       this.competitions.push(resp);
  //       console.log('compe ', this.competitions)
  //     })

  //   }

  // }
  getCompetitons(){
    this.web3Service.getAllCompetitons(leagueAdress, '1000000' )
    .subscribe(resp=>{
      this.competitions.push(resp);
      console.log('compe ', this.competitions)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from '../services/web3-service.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  user: String;
  showWarning: Boolean;
  campaignForm: FormGroup
  factoryAddress: String
  trpcURL: String;
  leagues: String [];

  constructor(private webService: Web3ServiceService, private fb: FormBuilder) {
    this.trpcURL ="http://localhost:8545";



   }

  ngOnInit() {
    this.createForm();
    this.factoryAddress ='0xde4973d1d1c741916f283cde758cbb4eba6c032e'
    this.getAccountsInfo()


  }
  createForm(){
    this.campaignForm = this.fb.group({
      prize: ['', [Validators.required] ],
    })

  }
  getAccountsInfo(){
    this.webService.getAccount().subscribe((resp)=>{
     if(resp.length <1){
       this.showWarning = true;
       console.log('resp is ', resp);
       this.user = resp[0];

     }else{
       this.user= resp[0]
       this.showWarning = false
       console.log(this.user)

     }
    })
  }
  newCampaign(){
    this.showWarning = !this.showWarning
// this.getAccountsInfo();
this.webService.createNewLeague(this.campaignForm.value.prize, this.factoryAddress, "1000000")
.subscribe(resp=>{
  console.log('responce ', resp )
})


  }
  connectTRPC(){
    console.log("connecting to test rpc ", this.trpcURL)
    this.webService.connecTRPC(this.trpcURL)
    this.getAccountsInfo()
  }
  cancel(){
    console.log('canceling')
    this.showWarning= false
  }
  instance(){
    console.log('creating instance')
    let instance = this.webService.createContractInstance("0xde4973d1d1c741916f283cde758cbb4eba6c032e", "test");
    // console.log('what is in instance ', instance)
  }
  getLeagues(){
    console.log('getting leagues');
    this.webService.getAllLeagues('0xde4973d1d1c741916f283cde758cbb4eba6c032e', '1000000')
    .subscribe(resp=>{
     this.leagues = resp
     console.log(this.leagues)
    })
  }
  selectLeague(league){
    this.webService.getLeagueDetails(league)
  }


}

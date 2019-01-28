import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from '../services/web3-service.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  user: String;
  showWarning: Boolean;
  trpcURL: String;

  constructor(private webService: Web3ServiceService) {
    this.trpcURL ="http://localhost:8545";
    
  
   }

  ngOnInit() {
    this.getAccountsInfo()
  
     
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
this.webService.createNewLeague("0xde4973d1d1c741916f283cde758cbb4eba6c032e", "4", "1000000")
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
      console.log('leagues returned ', resp)
    })
  }


}

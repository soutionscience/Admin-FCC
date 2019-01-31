import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Observable } from '../../../node_modules/rxjs';


let leagueFactoryContract = require('../../ethereum/contracts/build/LeagueFactory.json');
let LeagueContract = require('../../ethereum/contracts/build/League.json')



declare var window: any; // declare window
declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class Web3ServiceService {
 public web3: Web3
  constructor() { this.checkWeb3Instance()}

  //check if web3 has been injected to browser
  checkWeb3Instance(){
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
      return true;
    } else{
      console.warn(
        'No web3 detected. Falling back to ${environment.HttpProvider}. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      return false;
      //  fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      // this.web3 = new Web3(
      //   new Web3.providers.HttpProvider('http://localhost:8545')
      // );
    }
   }
   getUserInfo(){

   }
   connecTRPC(url){
    console.log("connecting to .. ", url)
    this.web3 = new Web3(new Web3.providers.HttpProvider(url))

   }

   getAccount(): Observable<any>{
    return Observable.create(observer=>{
      this.web3.eth.getAccounts((err, accounts)=>{
        if(err){
          console.log('err getting accounts')
          observer.error('there was an error getting your accounts');

        }else{
          observer.next(accounts);
          observer.complete;
        }
      })
    })
  }
    // create a contract instance helper function.
    //used to createNewLeague and more...
    createContractInstance(addr, contractJson){
      let instance;
      let abiDef = contractJson.abi
      let contract = this.web3.eth.contract(abiDef);
      instance = contract.at(addr);
      console.log('instance created' ,instance)
      return instance

    }
    //create transaction object
    createTransactionObject(prize){
      let transObject = {};

    }
    createNewLeague(prize, addr, gasToUse):Observable<any>{
    return Observable.create(observer=>{

      let instance = this.createContractInstance(addr, leagueFactoryContract);
      let myPrize = this.web3.toWei(prize, 'ether')
      let transactionObject={
        from: this.web3.eth.coinbase,
        gas:gasToUse,
        value: myPrize
      }


      instance.deployLeague.sendTransaction(transactionObject, (err, result)=>{
        if(err){
          console.log('error deploying league');
          observer.error(err)
        }else{
          console.log('deployed league successfully')
          observer.next(result)
          observer.complete()
        }
      })

    })
    }
    getAllLeagues(addr, gasToUse):Observable<any>{
    return Observable.create(observer=>{
      let instance = this.createContractInstance(addr, leagueFactoryContract);
      let transactionObject ={
        from: this.web3.eth.coinbase,
        gas: gasToUse
      }

  instance.GetAllLeagues.call(transactionObject, (err, result)=>{
        if(err){
              console.log('error getting leagues')
              observer.error(err)
            }else{
              console.log('got all leagues')
              observer.next(result);
              observer.complete()
            }

      })

    })
    }
    // get details of league
    getLeagueDetails(addr){
      let instance = this.createContractInstance(addr, LeagueContract)
      console.log('league ', instance)



    }

}

import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Observable, observable } from '../../../node_modules/rxjs';


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
    createTransactionObject(prize, gasToUse){
      let transObject : any = {};
      let from = this.web3.eth.coinbase;
      let myValue= this.web3.toWei(prize, 'ether')

      transObject.from = from;
      transObject.value = myValue;
      transObject.gas= gasToUse;

      return transObject



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
    createCompetion(addr, gasToUse, Prize):Observable<any>{
      return Observable.create(observer=>{

        let instance = this.createContractInstance(addr, LeagueContract);
        let myPrize = this.web3.toWei(Prize, 'ether')
        console.log('what is in prize?' ,myPrize)
        let transObject = {
          from: this.web3.eth.coinbase,
          value: myPrize,
          gas: gasToUse
        }
        console.log('instance ', instance)
        instance.createCompetition.sendTransaction(10, transObject, (err, resp)=>{
         if(err){
           observer.error(err);
           console.log('failed to create compe' ,err)
         }else{
           observer.next(resp);
           observer.complete();
         }

        })

      })

    }
    getAllCompetitons(addr, gasToUse, numOfLeagues):Observable<any>{
    return Observable.create(observer=>{
      let instance = this.createContractInstance(addr, LeagueContract);
      let transactionObject ={
        from: this.web3.eth.coinbase,
        gas: gasToUse
      }


   let compe =[];
    for (let index = 0; index < numOfLeagues; index++) {
      instance.competitions.call(index, (err, resp)=>{
        if(err){
          console.log('error');
          observer.error(err)
        }else{
     let compeOBject={
            id: resp[0],
            complete: resp[1],
            prize: resp[3],
            maxPlayers: resp[4]


          }
          compe.push(compeOBject)
        }

      })


    }
    observer.next(compe);
    observer.complete();
      // instance.competitions.call(index, (err, resp)=>{
      //   if(err) {
      //     console.log('error?')
      //     observer.error(err)
      //   }else{
      //     observer.next(resp);
      //     observer.complete();
      //   }
      // })


    })
    }
    getNumberOfLeagues(addr): Observable<any>{
      return Observable.create(observer=>{
        let instance = this.createContractInstance(addr, LeagueContract)
        instance.getCompetitionCount.call((err,resp)=>{
         if(err){
        observer.error(err)
         }
         resp= resp.toNumber()
         observer.next(resp)
         observer.complete();
       })

      })



    }

}

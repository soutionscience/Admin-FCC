pragma solidity ^0.4.22;
import "./League.sol";

contract LeagueFactory {
   address[] public deployedLeagues;


  function deployLeague() public{
        address newLeague = new League(msg.sender);
        deployedLeagues.push(newLeague);
        
    }
    function GetAllLeagues() public view returns (address[]){
        return deployedLeagues;
    }
    function deleteAllLeagues() public {
         delete deployedLeagues;
         assert(deployedLeagues.length == 0);
    }
       
  constructor() public {
  }
}

pragma solidity 0.8.6;

import "./Clone.sol"; 
import "./InitClone.sol"; 
import "./Main.sol"; 
import "hardhat/console.sol";

contract Factory {

    event CloneCreated(address clone);
    event MainDeployed(address main);

    Main public main;

    constructor() {
        main = new Main();
        emit MainDeployed(address(main));
    }

    function createClone() public returns(address){
        Clone clone = new Clone(address(main));
        emit CloneCreated(address(clone));
        return address(clone);
    }

    function createInitializableClone() public returns(address){
        InitClone clone = new InitClone();
        emit CloneCreated(address(clone));
        return address(clone);
    }
}
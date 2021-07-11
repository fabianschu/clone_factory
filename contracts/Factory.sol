pragma solidity 0.8.6;

import "./Clone.sol"; 
import "./Main.sol"; 

contract Factory {

    event CloneCreated();
    event MainDeployed(address main);

    Main public main; 

    function createClone() public {
        new Clone(address(main));
        emit CloneCreated();
    }

    function deployMain() public {
        main = new Main();
        emit MainDeployed(address(main));
    }
}
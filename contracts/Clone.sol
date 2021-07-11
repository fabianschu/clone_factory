pragma solidity 0.8.6;

import "./Main.sol"; 

contract Clone {

    Main public main;
    
    event Test(uint _number);

    constructor(address _main){
        main = Main(_main);
    }

    function setNumber(uint _number) public {
        emit Test(_number);
    }
}
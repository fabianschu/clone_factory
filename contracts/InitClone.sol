pragma solidity 0.8.6;

import "./Main.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract InitClone is OwnableUpgradeable {

    event Test(uint _number);

    function initialize() initializer public {
        __Ownable_init();
    }

    function setNumber(uint _number) public {
        emit Test(_number);
    }
}
pragma solidity 0.8.6;

contract Main {

    event NumberChanged(address senderContract, uint number);

    uint internal number;

    function setNumber(uint _number) public {
        number = _number;
        emit NumberChanged(msg.sender, _number);
    }
}
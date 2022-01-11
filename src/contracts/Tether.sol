// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tether {
    string public name = "Tether";
    string public symbol = "USDT";
    uint256 public totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    // we will have a mapping for each address of user. That will help to keep track of the allowances to the persons to send
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        // at first, the balance of the owner as the total balance of the tokens
        balanceOf[msg.sender] = totalSupply;
    }

    // transfer from only the bank
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // check if the sender has sufficient balance
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // bank will allow the spender to spend a specific value
    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // transfer from 3rd party or investors
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[msg.sender][_from] >= _value);

        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;

        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}

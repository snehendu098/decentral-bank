// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;
import "./Reward.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBlance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(Reward _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
    }

    function depositTokens(uint256 _amount) public {
        // transfer tether token to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // update staking balance
        stakingBlance[msg.sender] += _amount;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;
import "./Reward.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public rwd;

    constructor(Reward _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
    }
}

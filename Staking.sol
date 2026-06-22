//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking{
    IERC20 public token;

    mapping(address => uint256)
    public stakedBalance;

    mapping(address => uint256)
    public stakingTime;

    constructor(address _tokenAddress){
        token = IERC20(_tokenAddress);
    }

    function stake(uint256 amount) public{
        require(amount>0, "Amount must be greater than 0");

        token.transferFrom(msg.sender, address(this), amount);

        stakedBalance[msg.sender] += amount;

        stakingTime[msg.sender] = block.timestamp;
    }

    function calculateReward(uint256 amount) public pure returns(uint256){
        return (amount * 10)/100;
    }

    function unstake() public {
        require(stakedBalance[msg.sender] > 0, "No Tokens Staked");

        uint256 amount = stakedBalance[msg.sender];

        uint256 reward = calculateReward(amount);

        uint total = amount + reward;

        token.transfer(msg.sender, total);

        stakedBalance[msg.sender] = 0;
        stakingTime[msg.sender] = 0;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ExmoduleStaking is ERC20, Ownable, ReentrancyGuard{
    // the amount that each account has staked
    mapping(address => uint256) public amountStaked;
    // the latest interaction for claim in timestamp
    mapping(address => uint256) private stakedTimeStamp;
    // the amount of time that 1 staked token would result in 1 reward
    uint256 public secondsToRewardOneToken = 365 days;

    error IncorrectAmount(string reason);

    constructor(uint initialSupply) ERC20("ExModuleStakingToken", "exmST") {
        _mint(msg.sender, initialSupply * 10 ** uint(decimals()));
    }

    function mint(uint amount, address to) public onlyOwner{
        _mint(to, amount);
    }
    
    function burn(uint amount) public{
        _burn(msg.sender, amount);
    }

    function stake(uint256 amount) external{
        if (amount <= 0) revert IncorrectAmount("amount is <= 0");
        if (balanceOf(msg.sender) < amount) revert IncorrectAmount("balance is <= amount");
        _transfer(msg.sender, address(this), amount);
        if (amountStaked[msg.sender] > 0){
            claim();
        }
        stakedTimeStamp[msg.sender] = block.timestamp;
        amountStaked[msg.sender] += amount;
    }

    function unstake(uint256 amount) external{
        if (amount <= 0) revert IncorrectAmount("amount is <= 0");
        if (amountStaked[msg.sender] < amount) revert IncorrectAmount("amount is > stakedValue");
        claim();
        amountStaked[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);
    }

    function claim() public nonReentrant(){
        if (amountStaked[msg.sender] <= 0) revert IncorrectAmount("staked amount is <= 0");
        uint256 timeStaked = block.timestamp - stakedTimeStamp[msg.sender];
        uint256 rewards = amountStaked[msg.sender] * timeStaked / secondsToRewardOneToken;
        _mint(msg.sender, rewards);
        stakedTimeStamp[msg.sender] = block.timestamp;
    }
}
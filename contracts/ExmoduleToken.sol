// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExmoduleToken is ERC20, Ownable{
    constructor(uint totalSupply) ERC20("ExModuleToken", "exm") {
        _mint(msg.sender, totalSupply * 10 ** uint(decimals()));
    }

    function mint(uint amount, address to) public onlyOwner{
        _mint(to, amount);
    }
    
    function burn(uint amount) public{
        _burn(msg.sender, amount);
    }
}
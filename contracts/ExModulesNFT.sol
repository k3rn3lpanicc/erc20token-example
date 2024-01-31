// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExModulesNFT is ERC721URIStorage, Ownable{
    error AccessDenied(address sender, uint tokenId);
    uint private latestTokenID = 1;
    constructor(string memory name, string memory symbol) ERC721(name, symbol){}

    // Only the owner (deployer of the contract) can mint NFTs
    function mint(address receiver, string memory uri) public onlyOwner() returns (uint256){
        _mint(receiver, latestTokenID);
        _setTokenURI(latestTokenID, uri);
        latestTokenID++;
        return latestTokenID - 1;
    }

    function burn(uint tokenId) public {
        if (ownerOf(tokenId) != msg.sender) revert AccessDenied(msg.sender, tokenId);
        _burn(tokenId);
    }
}
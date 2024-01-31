import { ethers } from "hardhat";
import { expect } from "chai";

const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};
  
describe("Exmodules NFT contract", function(){
    async function deployContract() {
        const [owner,firstUser,secondUser] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ExModulesNFT");
        const token = await Token.deploy("ExToken", "eft");
        await token.waitForDeployment();
        return {token, owner, firstUser, secondUser};
    }

    describe("Deployment", function(){
        it("Should deploy the contract", async function(){
            const {owner, token} = await deployContract();
        });

        it("Should have the right owner", async function(){
            const {token, owner} = await deployContract();
            let ownerAddress = await token.owner();
            expect(ownerAddress).to.be.equal(await owner.getAddress());
        });

        it("Should Mint 1 NFT", async function(){
            const {token, firstUser, owner} = await deployContract();
            await token.connect(owner).mint(firstUser, "https://ipfs.io/ipfs/QmaNHiJngNLRmgzviEdivVFTt5EHDa3a4mZryX5Upa9zsp");
            expect(await token.ownerOf(1)).to.be.equal(await firstUser.getAddress());
        });

        it("Should not Mint nft from a user rather than owner", async function(){
            const {token, owner, firstUser} = await deployContract();
            await expect(token.connect(firstUser).mint(firstUser, "https://ipfs.io/ipfs/QmaNHiJngNLRmgzviEdivVFTt5EHDa3a4mZryX5Upa9zsp")).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("Should mint 1 nft and check the uri", async function(){
            const {token, firstUser, owner} = await deployContract();
            await token.connect(owner).mint(firstUser, "https://ipfs.io/ipfs/QmaNHiJngNLRmgzviEdivVFTt5EHDa3a4mZryX5Upa9zsp");
            expect(await token.tokenURI(1)).to.be.equal("https://ipfs.io/ipfs/QmaNHiJngNLRmgzviEdivVFTt5EHDa3a4mZryX5Upa9zsp");
        });
    });
})
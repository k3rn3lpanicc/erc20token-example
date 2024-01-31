import { ethers } from "hardhat";
import { expect } from "chai";

describe("Exmodules", function(){
    async function deployContract() {
        const [owner,firstUser,secondUser] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ExmoduleToken");
        const token = await Token.deploy(1e9);
        await token.waitForDeployment();
        return {token, owner, firstUser, secondUser};
    }

    describe("Deployment", function(){
        it("Should deploy the contract", async function(){
            const {owner, token} = await deployContract();
        });
        it("Should have the right initial value (1e9)", async function(){
            const {token} = await deployContract();
            expect(await token.totalSupply()).to.equal("1000000000000000000000000000");
        });
        it("Should transfer 1 token to another person", async function(){
            const {token, firstUser, owner} = await deployContract();
            await token.connect(owner).transfer(firstUser, BigInt(1e18));
            expect(await token.balanceOf(await firstUser.getAddress())).to.equal(BigInt(1e18));
        });
        it("Should mint 100 more tokens", async function(){
            const {token, owner} = await deployContract();
            await token.connect(owner).mint(BigInt(1e20), owner);
            expect(await token.balanceOf(owner)).to.equal("1000000100000000000000000000");
        });
    });
})
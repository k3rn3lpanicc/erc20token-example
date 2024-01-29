import { ethers } from "hardhat";
import { expect } from "chai";

const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};
  
describe("Exmodules Staking", function(){
    async function deployContract() {
        const fee = 100;
        const [owner,firstUser,secondUser] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("ExmoduleStaking");
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
        it("First user should be able to stake 1 tokens", async function(){
            const {token, firstUser, owner} = await deployContract();
            await token.connect(owner).transfer(firstUser, BigInt(1e18));
            await token.connect(firstUser).stake(BigInt(1e18));
            expect(await token.amountStaked(await firstUser.getAddress())).to.equal(BigInt(1e18));
        });
        it("First user should be able to unstake 1 tokens", async function(){
            const {token, firstUser, owner} = await deployContract();
            await token.connect(owner).transfer(firstUser, BigInt(1e18));
            await token.connect(firstUser).stake(BigInt(1e18));
            await token.connect(firstUser).unstake(BigInt(1e18));
            expect(await token.amountStaked(await firstUser.getAddress())).to.equal(BigInt(0));
        });
        it("First user should be able to stake 1 tokens and receive rewards after 1 seconds", async function(){
            const {token, firstUser, owner} = await deployContract();
            await token.connect(owner).transfer(firstUser, BigInt(1e18));
            await token.connect(firstUser).stake(BigInt(1e18));
            await delay(1000);
            await token.connect(firstUser).claim();
            console.log("The reward amount: ", await token.balanceOf(await firstUser.getAddress()));
            expect(await token.balanceOf(await firstUser.getAddress())).to.greaterThan(BigInt(0));
        });
        
    });
})
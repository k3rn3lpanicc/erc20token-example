import { ethers, run } from "hardhat";

const delay = (delayInms: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

async function main() {
  const initialSupply = 1e9;
  const stakeToken = await ethers.deployContract("ExmoduleStaking", [initialSupply], {
    value: 0,
  });
  console.log(
    `[ ☕️ ] Deploying the Exmodules staking token to chain ...`
  );
  await stakeToken.waitForDeployment();
  console.log(
    `[ ✅ ] Exmodule staking token deployed to: ${await stakeToken.getAddress()} with initial supply: ${initialSupply}`
  );

  console.log(
    `[ ☕️ ] Waiting 20 seconds ...`
  );

  await delay(20000);

  console.log(
    `[ ☕️ ] Verifying the contract's source code on block explorer ...`
  );

  await run('verify:verify', {
    address: await stakeToken.getAddress(),
    constructorArguments: [
      initialSupply
    ]
  });

  console.log(
    `[ ✅ ] Contract's source code verified on block explorer.`
    );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

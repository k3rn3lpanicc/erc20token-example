import { ethers, run } from "hardhat";

const delay = (delayInms: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

async function main() {
  const initialSupply = 1000000000;
  const token = await ethers.deployContract("ExmoduleToken", [initialSupply], {
    value: 0,
  });
  console.log(
    `[ ☕️ ] Deploying the Exmodules token to chain ...`
  );
  await token.waitForDeployment();
  console.log(
    `[ ✅ ] Exmodule token deployed to: ${await token.getAddress()} with initial supply: ${initialSupply}`
  );

  console.log(
    `[ ☕️ ] Waiting 20 seconds ...`
  );

  await delay(20000);

  console.log(
    `[ ☕️ ] Verifying the contract's source code on block explorer ...`
  );

  await run('verify:verify', {
    address: await token.getAddress(),
    constructorArguments: [
      initialSupply
    ]
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

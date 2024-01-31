import { ethers, run } from "hardhat";

const delay = (delayInms: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

async function main() {
  const token = await ethers.deployContract("ExModulesNFT", ["ExToken", "eft"], {
    value: 0,
  });
  console.log(
    `[ ☕️ ] Deploying the Exmodules NFT token to chain ...`
  );
  await token.waitForDeployment();
  console.log(
    `[ ✅ ] Exmodule NFT token deployed to: ${await token.getAddress()} with name: ${"ExToken"} and symbol: ${"eft"}`
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
      "ExToken", "eft"
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

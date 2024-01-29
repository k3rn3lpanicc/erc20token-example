# erc20token-example
A simple bep20 (erc20) token along with a set of tests and scripts to deploy it into the testnet.

## Usage

### Getting started

Run `npm install` to install the needed packages to work with.

## Compile contracts

Run `npm run compile` to compile the solidity contracts.

## Deploy the contract to tesnet

First create a `.env` file in the root directory; it should contain these values:

  - `BINANCE_API_KEY` : the api key for binance block explorer (you can fetch yours from https://testnet.bscscan.com), this api key is used to verify the contract after deployment
  
  - `BINANCE_PRIVATE_KEY`: your binance account's private key. this account is used to deploy the contract to chain.

Then run this command: `npm run deploy:binance` and it would start building contracts, deployment and verification steps and you can relax till the job gets done. The results would be like this:

```bash
➜ npm run deploy:binance

> erc20token-example@1.0.0 deploy:binance
> npx hardhat run --network bscTestnet ./scripts/deploy.ts

[ ☕️ ] Deploying the Exmodules token to chain ...
[ ✅ ] Exmodule token deployed to: 0x958b6EfEa4f3C05cB42378E4E6B8d0a3fa591ef2 with initial supply: 1000000000
[ ☕️ ] Waiting 20 seconds ...
[ ☕️ ] Verifying the contract's source code on block explorer ...
The contract 0x958b6EfEa4f3C05cB42378E4E6B8d0a3fa591ef2 has already been verified.
https://testnet.bscscan.com/address/0x958b6EfEa4f3C05cB42378E4E6B8d0a3fa591ef2#code
[ ✅ ] Contract's source code verified on block explorer.
```

## Run the tests

To run the tests simply run `npm run test`, the results should be like this:

```bash
➜ npm run test

> erc20token-example@1.0.0 test
> npx hardhat test



  Exmodules
    Deployment
      ✔ Should deploy the contract (1347ms)
      ✔ Should have the right initial value (1e9) (52ms)
      ✔ Should transfer 1 token to another person (54ms)
      ✔ Should mint 100 more tokens (45ms)


  4 passing (2s)
```


# Staking token example

This is a simple contract that users stake their tokens and receive `fixed` stake rewards based on the time they've staked their tokens in.

The rewards are calculated as so: `amountOfStaked * timeStaked ( currentTime - lastInteractionTime ) / secondsToRewardOneToken`

## Usage

### Getting started

Run `npm install` to install the needed packages to work with.

## Compile contracts

Run `npm run compile` to compile the solidity contracts.

## Deploy the contract to tesnet

First create a `.env` file in the root directory; it should contain these values:

  - `BINANCE_API_KEY` : the api key for binance block explorer (you can fetch yours from https://testnet.bscscan.com), this api key is used to verify the contract after deployment
  
  - `BINANCE_PRIVATE_KEY`: your binance account's private key. this account is used to deploy the contract to chain.

Then run this command: `npm run deployStake:binance` and it would start building contracts, deployment and verification steps and you can relax till the job gets done. The results would be like this:

* Note: you can deploy to mumbai network by this command: `npm run deployStake:mumbai`

```bash
➜ npm run deployStake:binance

> erc20token-example@1.0.0 deployStake:binance
> npx hardhat run --network bscTestnet ./scripts/deployStaking.ts

[ ☕️ ] Deploying the Exmodules staking token to chain ...
[ ✅ ] Exmodule staking token deployed to: 0x29aE535bc25d69Fd299eD0211a5E4b245eaB5e0c with initial supply: 1000000000
[ ☕️ ] Waiting 20 seconds ...
[ ☕️ ] Verifying the contract's source code on block explorer ...
Successfully submitted source code for contract
contracts/ExmoduleStaking.sol:ExmoduleStaking at 0x29aE535bc25d69Fd299eD0211a5E4b245eaB5e0c
for verification on the block explorer. Waiting for verification result...

Successfully verified contract ExmoduleStaking on the block explorer.
https://testnet.bscscan.com/address/0x29aE535bc25d69Fd299eD0211a5E4b245eaB5e0c#code
[ ✅ ] Contract's source code verified on block explorer.
```

## Run the tests

To run the tests simply run `npm run test`, the results should be like this:

```bash
➜ npm run test 

> erc20token-example@1.0.0 test
> npx hardhat test



  Exmodules
    Deployment
      ✔ Should deploy the contract (1547ms)
      ✔ Should have the right initial value (1e9) (64ms)
      ✔ Should transfer 1 token to another person (53ms)
      ✔ Should mint 100 more tokens (52ms)

  Exmodules Staking
    Deployment
      ✔ Should deploy the contract (44ms)
      ✔ Should have the right initial value (1e9) (42ms)
      ✔ Should transfer 1 token to another person (82ms)
      ✔ Should mint 100 more tokens (76ms)
      ✔ First user should be able to stake 1 tokens (76ms)
      ✔ First user should be able to unstake 1 tokens (79ms)
The reward amount:  31709791983n
      ✔ First user should be able to stake 1 tokens and receive rewards after 1 seconds (1080ms)


  11 passing (3s)
```

---

### Example deployed contract address on binance: [0x958b6EfEa4f3C05cB42378E4E6B8d0a3fa591ef2](https://testnet.bscscan.com/address/0x958b6EfEa4f3C05cB42378E4E6B8d0a3fa591ef2)
### Example deployed staking contract address on binance: [0x29aE535bc25d69Fd299eD0211a5E4b245eaB5e0c](https://testnet.bscscan.com/address/0x29aE535bc25d69Fd299eD0211a5E4b245eaB5e0c)
### Example deployed staking contract address on mumbai: [0xE1d112A19f657FB00720522937e89b93d90f8F04](https://mumbai.polygonscan.com/address/0xE1d112A19f657FB00720522937e89b93d90f8F04)

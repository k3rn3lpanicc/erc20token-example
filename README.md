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

### Example deployed contract address: [0x958b6EfEa4f3C05cB42378E4E6B8d0a3fa591ef2](https://testnet.bscscan.com/address/0x958b6EfEa4f3C05cB42378E4E6B8d0a3fa591ef2)

# This repo is archived. For current version of `erc-20-client` please look into [casper-js-clients](https://github.com/casper-network/casper-contracts-js-clients)


# casper-erc20-js-client

## Test ERC20 contract

1. Create `.env` file in root directory of the repo. Adjust following values:
```
CHAIN_NAME=casper-net-1
NODE_ADDRESS=<node-address>
EVENT_STREAM_ADDRESS=<event-stream-address>
WASM_PATH=<path-to-contract>/erc20_token.wasm
MASTER_KEY_PAIR_PATH=<path-to-casper-node>/casper-node/utils/nctl/assets/net-1/faucet
PATH_TO_USERS=/<path-to-casper-node>/utils/nctl/assets/net-1/users
TOKEN_NAME=Acme Token
TOKEN_SYMBOL=ACME
TOKEN_DECIMALS=11
TOKEN_SUPPLY=1000000000000000
INSTALL_PAYMENT_AMOUNT=200000000000
```

2. Run `npm i` inside root directory.
3. Run `npm run test:erc20:install` - if it fails you will get an appropriate error.
4. Run `npm run test:erc20:installed` - you can check the testing steps in `tests/installed.ts` file - if anything fails you will receive an error message.

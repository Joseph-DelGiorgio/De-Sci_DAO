require("dotenv").config();
require("truffle-plugin-verify");
require("ts-node").register({
  files: true,
});

const getNetworkProvider = () => {
  const HDWalletProvider = require("@truffle/hdwallet-provider");

  if (!process.env.WALLET_MNEMONIC)
    throw Error("Missing environment variable: WALLET_MNEMONIC");

  if (!process.env.ETH_NODE_URL)
    throw Error("Missing environment variable: ETH_NODE_URL");

  return new HDWalletProvider({
    mnemonic: {
      phrase: process.env.WALLET_MNEMONIC,
    },
    providerOrUrl: process.env.ETH_NODE_URL,
  });
};

module.exports = {
  goerli: {
    provider: getNetworkProvider,
    network_id: 5,
    skipDryRun: true,
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: ">=0.4.0 <0.8.17",
      version: "^0.8.0",
    },
  },
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    // Obtain one at https://etherscan.io/myapikey
  },
  plugins: ["truffle-plugin-verify"],
};

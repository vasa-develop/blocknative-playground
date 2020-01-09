import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Box from "3box";

import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import Onboard from "dappauth";
import SturdyWebSocket from "sturdy-websocket";

function App() {
  /*   // initialize onboard
    const onboard = Onboard.init({
      dappId: "32dedbdd-255e-4e93-a66f-7e558c24893a",
      networkId: 1,
      subscriptions: {
        address: address => console.log("user address has changed:", address),
        network: network => console.log("user network has changed:", network),
        balance: balance => console.log("user balance has changed:", balance),
        wallet: wallet =>
          console.log(
            "a new wallet has been selected by user",
            wallet.provider,
            wallet.name
          )
      },
      modules: {
        // default wallets that are included: MetaMask, Dapper, Coinbase, Trust, WalletConnect
        walletSelect: Onboard.modules.select.defaults({
          // if you want fortmatic as a wallet option
          fortmaticInit: { apiKey: "pk_test_27DFAEDF186A9394" },
          // if you want portis as a wallet option
          portisInit: { apiKey: "110f4f7b-6c23-43e9-afc8-07f3dd8edd2e" },
          networkId: 4
        }),
        // default ready steps are: connect, network, balance
        walletReady: Onboard.modules.ready.defaults({
          networkId: 4,
          minimumBalance: "200000000000000000"
        })
      }
    })
  
    const start = async () => {
      // Get user to select a wallet
      await onboard.walletSelect()
  
      // Get users' wallet ready to transact
      await onboard.walletReady()
    }
  
    start() */

  const loginwithTorus = async () => {
    const torus = new Torus({
      buttonPosition: "top-left" // default: bottom-left
    });
    await torus.init({
      buildEnv: "production", // default: production
      enableLogging: true, // default: false
      network: {
        host: "rinkeby", // default: mainnet
        chainId: 4, // default: 1
        networkName: "Rinkeby Test Network" // default: Main Ethereum Network
      },
      showTorusButton: true // default: true
    });
    window.torus = torus;

    torus.login().then(data => {
      console.log("-----------LOGS-------------------");
      console.log(`Address: ${torus.web3.eth.accounts}`);

      console.log(
        `Balance: ${torus.web3.eth.getBalance(
          (torus.web3.eth.accounts[0],
          (err, res) => {
            console.log(err, res);
          })
        )}`
      );

      console.dir(torus.provider);

      console.log("-----------END-------------------");
    });

    // await torus.ethereum.enable()
  };

  loginwithTorus();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

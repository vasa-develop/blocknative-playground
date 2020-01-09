import React, { Component } from "react";
import blocknativeSdk from "bnc-sdk";
import Web3 from "web3";
import WebSocket from "ws"; // only neccessary in server environments

const BncSDK = async (blocknative, clientIndex) => {
  // initialize web3
  const web3 = new Web3(window.ethereum);

  // get current account
  await window.ethereum.enable();
  const myAccounts = await web3.eth.getAccounts();
  const myAddress = myAccounts[0];

  // create transaction options object
  const txOptions = {
    from: myAddress,
    to: "0x792ec62e6840bFcCEa00c669521F678CE1236705",
    value: "1000000"
  };

  // initiate a transaction via web3.js
  web3.eth.sendTransaction(txOptions).on("transactionHash", hash => {
    // call with the clientIndex and the transaction hash of the
    // transaction that you would like to receive status updates for
    const { emitter, details } = blocknative.transaction(clientIndex, hash);

    // listen to some events
    emitter.on("txPool", transaction => {
      console.log(`Sending ${transaction.value} wei to ${transaction.to}`);
    });

    emitter.on("txConfirmed", transaction => {
      console.log("Transaction is confirmed!");
    });

    // catch every other event that occurs and log it
    emitter.on("all", transaction => {
      console.log(`Transaction event: ${transaction.eventCode}`);
    });
  });
};

export default class Sdk extends Component {
  render() {
    const handleTransactionEvent = event => {
      const {
        transaction, // transaction object
        emitterResult // data that is returned from the transaction event listener defined on the emitter
      } = event;

      console.log("Transaction", transaction);
      console.log("emitterResult", emitterResult);
    };

    // create options object
    const options = {
      dappId: "32dedbdd-255e-4e93-a66f-7e558c24893a",
      networkId: 4,
      transactionHandlers: [handleTransactionEvent]
      //ws: WebSocket // only neccessary in server environments
    };

    // initialize and connect to the api
    const blocknative = blocknativeSdk(options);

    // get the client index from initialized sdk
    // clientIndex allows for separated notification channels
    // and is passed in when tracking transactions or accounts
    const { clientIndex } = blocknative;

    BncSDK(blocknative, clientIndex);

    return <div></div>;
  }
}

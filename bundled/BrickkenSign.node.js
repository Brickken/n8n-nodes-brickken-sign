// Inject ethers as global
const ethers = require("ethers");
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// nodes/BrickkenSign/BrickkenSign.node.ts
var BrickkenSign_node_exports = {};
__export(BrickkenSign_node_exports, {
  BrickkenSign: () => BrickkenSign
});
module.exports = __toCommonJS(BrickkenSign_node_exports);
var import_n8n_workflow = require("n8n-workflow");
var BrickkenSign = class {
  constructor() {
    this.description = {
      displayName: "Brickken Sign",
      name: "brickkenSign",
      icon: "file:brickkenSign.svg",
      group: ["transform"],
      version: 1,
      subtitle: "Sign blockchain transactions locally",
      description: "Sign transactions locally using ethers.js without API calls",
      defaults: {
        name: "Brickken Sign"
      },
      inputs: ["main"],
      outputs: ["main"],
      usableAsTool: true,
      credentials: [
        {
          name: "brickkenSign",
          required: true
        }
      ],
      properties: [
        {
          displayName: "Transaction JSON",
          name: "transactionJson",
          type: "json",
          default: "{}",
          required: true,
          description: "Transaction object to sign (JSON format with fields like to, chainId, value, data, gasLimit, nonce, etc.)"
        }
      ]
    };
  }
  async execute() {
    const items = this.getInputData();
    const returnData = [];
    for (let i = 0; i < items.length; i++) {
      try {
        const credentials = await this.getCredentials("brickkenSign");
        const privateKey = credentials.privateKey;
        const transactionJson = this.getNodeParameter("transactionJson", i);
        if (!privateKey.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
          throw new import_n8n_workflow.ApplicationError("Invalid private key format. Expected 64 hex characters with optional 0x prefix");
        }
        let transactionRequest;
        try {
          transactionRequest = typeof transactionJson === "string" ? JSON.parse(transactionJson) : transactionJson;
        } catch {
          throw new import_n8n_workflow.ApplicationError("Invalid JSON in transaction field");
        }
        if (!transactionRequest.to) {
          throw new import_n8n_workflow.ApplicationError('Transaction "to" address is required');
        }
        if (transactionRequest.chainId === void 0) {
          throw new import_n8n_workflow.ApplicationError('Transaction "chainId" is required');
        }
        const wallet = new ethers.Wallet(privateKey);
        const signedTransaction = await wallet.signTransaction(transactionRequest);
        returnData.push({
          json: {
            signedTransaction,
            signerAddress: wallet.address,
            transactionHash: ethers.keccak256(signedTransaction)
          },
          pairedItem: { item: i }
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message
            },
            pairedItem: { item: i }
          });
          continue;
        }
        throw error;
      }
    }
    return [returnData];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BrickkenSign
});

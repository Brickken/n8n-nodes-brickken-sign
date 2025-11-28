import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { ApplicationError } from 'n8n-workflow';

declare const ethers: typeof import('ethers');

export class BrickkenSign implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Brickken Sign',
    name: 'brickkenSign',
    icon: 'file:brickkenSign.svg',
    group: ['transform'],
    version: 1,
    subtitle: 'Sign blockchain transactions locally',
    description: 'Sign transactions locally using ethers.js without API calls',
    defaults: {
      name: 'Brickken Sign',
    },
    inputs: ['main'],
    outputs: ['main'],
    usableAsTool: true,
    credentials: [
      {
        name: 'brickkenSign',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Transaction JSON',
        name: 'transactionJson',
        type: 'json',
        default: '{}',
        required: true,
        description: 'Transaction object to sign (JSON format with fields like to, chainId, value, data, gasLimit, nonce, etc.)',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const credentials = await this.getCredentials('brickkenSign');
        const privateKey = credentials.privateKey as string;
        const transactionJson = this.getNodeParameter('transactionJson', i) as string;

        // Validate private key format
        if (!privateKey.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
          throw new ApplicationError('Invalid private key format. Expected 64 hex characters with optional 0x prefix');
        }

        // Parse transaction JSON
        let transactionRequest;
        try {
          transactionRequest = typeof transactionJson === 'string'
            ? JSON.parse(transactionJson)
            : transactionJson;
        } catch {
          throw new ApplicationError('Invalid JSON in transaction field');
        }

        // Validate required transaction fields
        if (!transactionRequest.to) {
          throw new ApplicationError('Transaction "to" address is required');
        }

        if (transactionRequest.chainId === undefined) {
          throw new ApplicationError('Transaction "chainId" is required');
        }

        // Create wallet from private key - ethers is available from bundle
        const wallet = new ethers.Wallet(privateKey);

        // Sign the transaction
        const signedTransaction = await wallet.signTransaction(transactionRequest);

        returnData.push({
          json: {
            signedTransaction,
            signerAddress: wallet.address,
            transactionHash: ethers.keccak256(signedTransaction),
          },
          pairedItem: { item: i },
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: (error as Error).message,
            },
            pairedItem: { item: i },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

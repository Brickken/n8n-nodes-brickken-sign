import type {
  ICredentialTestRequest,
  ICredentialType,
  Icon,
  INodeProperties,
} from 'n8n-workflow';

export class BrickkenSignApi implements ICredentialType {
  name = 'brickkenSignApi';
  displayName = 'Brickken Sign API';
  icon: Icon = 'file:brickken.svg';
  documentationUrl = 'https://docs.brickken.com';

  properties: INodeProperties[] = [
    {
      displayName: 'Private Key',
      name: 'privateKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
      description: 'Wallet Private key to sign transactions',
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      url: '/', // Dummy test - this credential doesn't make API calls
      method: 'GET',
    },
  };
}
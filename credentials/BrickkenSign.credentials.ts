import type {
  Icon,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class BrickkenSign implements ICredentialType {
  name = 'brickkenSign';
  displayName = 'Brickken Sign';
  icon: Icon = 'file:brickkenSign.svg';
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
}
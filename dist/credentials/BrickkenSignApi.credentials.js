"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrickkenSignApi = void 0;
class BrickkenSignApi {
    constructor() {
        this.name = 'brickkenSignApi';
        this.displayName = 'Brickken Sign API';
        this.icon = 'file:brickken.svg';
        this.documentationUrl = 'https://docs.brickken.com';
        this.properties = [
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
        this.test = {
            request: {
                url: '/', // Dummy test - this credential doesn't make API calls
                method: 'GET',
            },
        };
    }
}
exports.BrickkenSignApi = BrickkenSignApi;
//# sourceMappingURL=BrickkenSignApi.credentials.js.map
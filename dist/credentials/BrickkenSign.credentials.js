"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrickkenSign = void 0;
class BrickkenSign {
    constructor() {
        this.name = 'brickkenSign';
        this.displayName = 'Brickken Sign';
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
exports.BrickkenSign = BrickkenSign;
//# sourceMappingURL=BrickkenSign.credentials.js.map
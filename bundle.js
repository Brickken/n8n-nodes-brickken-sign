const esbuild = require('esbuild');
const path = require('path');

async function bundle() {
    try {
        // Bundle the node file with ethers included
        await esbuild.build({
            entryPoints: ['nodes/BrickkenSign/BrickkenSign.node.ts'],
            bundle: true,
            platform: 'node',
            target: 'node18',
            format: 'cjs',
            outfile: 'bundled/BrickkenSign.node.js',
            external: ['n8n-workflow'], // Don't bundle n8n-workflow
            minify: false,
            sourcemap: false,
            banner: {
                js: '// Inject ethers as global\nconst ethers = require("ethers");',
            },
        });

        console.log('✓ Bundle created successfully');
    } catch (error) {
        console.error('Bundle failed:', error);
        process.exit(1);
    }
}

bundle();

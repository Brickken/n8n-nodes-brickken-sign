const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

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
        });

        // Copy the SVG icon to bundled folder
        const svgSource = path.join(__dirname, 'nodes/BrickkenSign/brickkenSign.svg');
        const svgDest = path.join(__dirname, 'bundled/brickkenSign.svg');
        if (fs.existsSync(svgSource)) {
            fs.copyFileSync(svgSource, svgDest);
            console.log('✓ SVG icon copied to bundled folder');
        } else {
            console.warn('⚠ SVG icon not found at:', svgSource);
        }

        console.log('✓ Bundle created successfully');
    } catch (error) {
        console.error('Bundle failed:', error);
        process.exit(1);
    }
}

bundle();

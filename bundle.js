const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

async function bundle() {
    try {
        // Bundle the node file - everything is self-contained, no external deps
        await esbuild.build({
            entryPoints: ['nodes/BrickkenSign/BrickkenSign.node.ts'],
            bundle: true,
            platform: 'node',
            target: 'es2020',
            format: 'cjs',
            outfile: 'bundled/BrickkenSign.node.js',
            external: ['n8n-workflow'], // Only exclude n8n-workflow (peer dependency)
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

/**
 * Generate optimized favicon files from logo.png
 * Run with: node scripts/generate-favicon.js
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/logo.png');
const publicDir = path.join(__dirname, '../public');

async function generateFavicons() {
    console.log('Generating favicons...');

    // Generate favicon-16x16.png
    await sharp(inputPath)
        .resize(16, 16)
        .png()
        .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✓ favicon-16x16.png');

    // Generate favicon-32x32.png
    await sharp(inputPath)
        .resize(32, 32)
        .png()
        .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✓ favicon-32x32.png');

    // Generate apple-touch-icon.png (180x180)
    await sharp(inputPath)
        .resize(180, 180)
        .png()
        .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✓ apple-touch-icon.png');

    // Generate android-chrome-192x192.png
    await sharp(inputPath)
        .resize(192, 192)
        .png()
        .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    console.log('✓ android-chrome-192x192.png');

    // Generate android-chrome-512x512.png
    await sharp(inputPath)
        .resize(512, 512)
        .png()
        .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    console.log('✓ android-chrome-512x512.png');

    // Generate favicon-48x48.png
    await sharp(inputPath)
        .resize(48, 48)
        .png()
        .toFile(path.join(publicDir, 'favicon-48x48.png'));
    console.log('✓ favicon-48x48.png');

    // Create site.webmanifest
    const manifest = {
        name: "Seriaflow",
        short_name: "Seriaflow",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
        theme_color: "#1313EC",
        background_color: "#0a0a1a",
        display: "standalone"
    };

    fs.writeFileSync(
        path.join(publicDir, 'site.webmanifest'),
        JSON.stringify(manifest, null, 2)
    );
    console.log('✓ site.webmanifest');

    console.log('\n✅ All favicons generated successfully!');
}

generateFavicons().catch(console.error);

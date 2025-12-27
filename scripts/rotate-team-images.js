const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const teamDir = path.join(process.cwd(), 'public', 'team');

async function rotateImages() {
    const files = fs.readdirSync(teamDir);

    console.log('Rotating all team images 180 degrees to fix upside-down orientation...\n');

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const filePath = path.join(teamDir, file);
            console.log(`Processing: ${file}`);

            try {
                // Rotate 180 degrees to flip them right-side up
                await sharp(filePath)
                    .rotate(180)
                    .toFile(filePath + '.tmp');

                // Replace original with rotated version
                fs.renameSync(filePath + '.tmp', filePath);
                console.log(`  ✓ Rotated 180°`);
            } catch (error) {
                console.error(`  ✗ Error processing ${file}:`, error.message);
            }
        }
    }

    console.log('\n✓ All images rotated!');
}

rotateImages().catch(console.error);

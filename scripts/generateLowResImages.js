const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const LOW_RES_DIR = path.join(PUBLIC_DIR, 'assets/images/low-res');

// Create low-res directory if it doesn't exist
if (!fs.existsSync(LOW_RES_DIR)) {
  fs.mkdirSync(LOW_RES_DIR, { recursive: true });
}

// Function to process a single image
async function processImage(imagePath) {
  const fileName = path.basename(imagePath);
  const outputPath = path.join(LOW_RES_DIR, fileName);

  try {
    await sharp(imagePath)
      .resize(20, 20, { // Create a tiny version for blur-up
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 30 })
      .toFile(outputPath);
    console.log(`Processed: ${fileName}`);
  } catch (error) {
    console.error(`Error processing ${fileName}:`, error);
  }
}

// Function to recursively find all images in a directory
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
      await processImage(filePath);
    }
  }
}

// Start processing from the assets directory
const assetsDir = path.join(PUBLIC_DIR, 'assets');
console.log('Starting image processing...');
processDirectory(assetsDir)
  .then(() => console.log('Finished processing all images'))
  .catch(error => console.error('Error:', error)); 
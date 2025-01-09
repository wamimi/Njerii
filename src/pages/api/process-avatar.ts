import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

export async function processAvatar() {
  const inputPath = path.join(process.cwd(), 'src/assets/avatar.jpg');
  const publicDir = path.join(process.cwd(), 'public');

  // Ensures public directory exists
  await fs.mkdir(publicDir, { recursive: true });

  //favicon
  await sharp(inputPath)
    .resize(32, 32, { fit: 'contain' })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  //background image
  await sharp(inputPath)
    .resize(512, 512, { fit: 'contain' })
    .png()
    .toFile(path.join(publicDir, 'avatar.png'));
}

// Process avatar during build
processAvatar().catch(console.error);
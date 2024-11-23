import { readFile } from 'fs/promises';
import { join } from 'path';
import { processImage } from '../src/utils/images.ts';

async function main() {
  try {
    // Read avatar image
    const avatarBuffer = await readFile(join(process.cwd(), 'src/assets/avatar.jpg'));

    // Process favicon
    await processImage(avatarBuffer, join(process.cwd(), 'public/images/favicon.png'), {
      width: 32,
      height: 32
    });

    // Process background avatar
    await processImage(avatarBuffer, join(process.cwd(), 'public/images/avatar.png'), {
      width: 512,
      height: 512
    });

    console.log('✅ Images processed successfully');
  } catch (error) {
    console.error('❌ Error processing images:', error);
    process.exit(1);
  }
}

main();
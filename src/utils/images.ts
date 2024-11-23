import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';

export async function processImage(inputBuffer: Buffer, outputPath: string, options: { width: number; height: number }) {
  try {
    // Ensure output directory exists
    await mkdir(dirname(outputPath), { recursive: true });

    // Process image
    const processedImage = await sharp(inputBuffer)
      .resize(options.width, options.height, { fit: 'contain' })
      .png()
      .toBuffer();

    // Write to file
    await writeFile(outputPath, processedImage);
    
    return true;
  } catch (error) {
    console.error('Error processing image:', error);
    return false;
  }
}
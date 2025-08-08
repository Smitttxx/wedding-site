import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import prisma from '../../lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filter: ({ mimetype, originalFilename }) => {
        const isImage = mimetype && mimetype.startsWith('image/');
        const byExt = /(\.heic|\.heif|\.heics|\.avif|\.webp|\.jpg|\.jpeg|\.jfif|\.png|\.gif|\.bmp|\.tif|\.tiff)$/i.test(originalFilename || '');
        return Boolean(isImage || byExt);
      },
    });

    const [fields, files] = await form.parse(req);
    
    const uploadedBy = fields.uploadedBy?.[0] || 'Anonymous';
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Read file into Buffer
    let fileBuffer = fs.readFileSync(file.filepath);

    // Determine type and extension
    const originalName = file.originalFilename || 'image';
    const lowerName = originalName.toLowerCase();
    const mime = file.mimetype || '';

    const isHeic = mime.includes('heic') || mime.includes('heif') || /\.(heic|heif|heics)$/i.test(lowerName);

    // Validate supported types (server-side)
    const isSupported = (
      mime.startsWith('image/') || /\.(heic|heif|heics|avif|webp|jpg|jpeg|jfif|png|gif|bmp|tif|tiff)$/i.test(lowerName)
    );

    if (!isSupported) {
      fs.unlinkSync(file.filepath);
      return res.status(415).json({ error: 'Unsupported file type' });
    }

    let contentType = mime || 'application/octet-stream';
    let uploadName = originalName;

    // Convert HEIC/HEIF -> JPEG for cross-browser compatibility
    if (isHeic) {
      try {
        const sharp = (await import('sharp')).default;
        const converted = await sharp(fileBuffer).jpeg({ quality: 90 }).toBuffer();
        fileBuffer = converted;
        contentType = 'image/jpeg';
        uploadName = originalName.replace(/\.(heic|heif|heics)$/i, '.jpg');
      } catch (convErr) {
        // If conversion fails, abort with clear message
        console.error('HEIC conversion failed (server):', convErr);
        fs.unlinkSync(file.filepath);
        return res.status(415).json({ error: 'Failed file type not supported (server HEIC conversion failed)' });
      }
    }

    // Ensure we have a safe filename
    const extFromName = path.extname(uploadName) || '.jpg';
    const filename = `photo-${Date.now()}-${Math.random().toString(36).substring(7)}${extFromName}`;
    
    // Upload to Vercel Blob with proper content type
    const blob = await put(filename, fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
      contentType,
      cacheControl: 'public, max-age=31536000, immutable',
    });

    // Clean up temporary file
    fs.unlinkSync(file.filepath);

    // Save photo metadata to database
    const photo = await prisma.photo.create({
      data: {
        filename: filename,
        url: blob.url,
        uploadedBy: uploadedBy,
        approved: true,
        deleted: false,
      },
    });

    res.status(200).json({ 
      success: true, 
      photo: photo,
      message: 'Photo uploaded successfully!' 
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload photo',
      details: error.message 
    });
  }
} 
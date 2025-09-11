import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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
    // Use temp directory for Vercel
    const tempDir = '/tmp';
    const uploadsDir = path.join(tempDir, 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Parse form
    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 4.4 * 1024 * 1024, // 4.4MB (Vercel Blob limit)
    });

    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const extension = path.extname(file.originalFilename || '');
    const uniqueFilename = `photos/${timestamp}-${randomSuffix}${extension}`;

    // Read file and upload to Vercel Blob
    const fileBuffer = fs.readFileSync(file.filepath);
    
    const blob = await put(uniqueFilename, fileBuffer, {
      access: 'public',
      contentType: file.mimetype || 'image/jpeg',
    });

    // Clean up temp file
    try {
      fs.unlinkSync(file.filepath);
    } catch (cleanupErr) {
      console.warn('Failed to cleanup temp file:', cleanupErr);
    }

    return res.status(200).json({
      url: blob.url,
      filename: uniqueFilename,
      originalName: file.originalFilename,
      size: file.size,
    });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
} 
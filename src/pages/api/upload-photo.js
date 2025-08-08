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
      filter: ({ mimetype }) => {
        return mimetype && mimetype.includes('image');
      },
    });

    const [fields, files] = await form.parse(req);
    
    const uploadedBy = fields.uploadedBy?.[0] || 'Anonymous';
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Generate unique filename
    const fileExtension = path.extname(file.originalFilename || 'image.jpg');
    const filename = `photo-${Date.now()}-${Math.random().toString(36).substring(7)}${fileExtension}`;
    
    // Upload to Vercel Blob
    const blob = await put(filename, fileBuffer, {
      access: 'public',
      addRandomSuffix: false,
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
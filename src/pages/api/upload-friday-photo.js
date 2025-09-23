import prisma from '../../lib/prisma';
import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';

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
      maxFileSize: 4.4 * 1024 * 1024, // 4.4MB (Vercel Blob limit)
      filter: ({ mimetype, originalFilename }) => {
        const isImage = mimetype && mimetype.startsWith('image/');
        const byExt = /(\.heic|\.heif|\.heics|\.avif|\.webp|\.jpg|\.jpeg|\.jfif|\.png|\.gif|\.bmp|\.tif|\.tiff)$/i.test(originalFilename || '');
        return Boolean(isImage || byExt);
      },
    });

    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];
    const uploadedBy = fields.uploadedBy?.[0] || 'Admin';

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(file.filepath);
    const filename = `friday-night/${Date.now()}-${file.originalFilename}`;

    // Upload to Vercel Blob in friday-night folder
    const blob = await put(filename, fileBuffer, {
      access: 'public',
      contentType: file.mimetype,
    });

    // Save to database
    const photo = await prisma.fridayNightPhoto.create({
      data: {
        filename: file.originalFilename,
        url: blob.url,
        uploadedBy: uploadedBy,
      },
    });

    // Clean up temporary file
    fs.unlinkSync(file.filepath);

    res.status(200).json({
      success: true,
      photo: {
        id: photo.id,
        url: photo.url,
        filename: photo.filename,
        uploadedBy: photo.uploadedBy,
      },
    });
  } catch (error) {
    console.error('Error uploading Friday night photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
}

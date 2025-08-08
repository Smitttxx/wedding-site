import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Simple file-based storage for photo metadata (no database changes)
const PHOTOS_FILE = path.join(process.cwd(), 'data', 'photos.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(PHOTOS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read photos from JSON file
const readPhotos = () => {
  ensureDataDir();
  if (!fs.existsSync(PHOTOS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(PHOTOS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading photos file:', error);
    return [];
  }
};

// Write photos to JSON file
const writePhotos = (photos) => {
  ensureDataDir();
  try {
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(photos, null, 2));
  } catch (error) {
    console.error('Error writing photos file:', error);
    throw error;
  }
};

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

    // Create photo metadata
    const photo = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      filename: filename,
      url: blob.url,
      uploadedBy: uploadedBy,
      uploadedAt: new Date().toISOString(),
    };

    // Read existing photos and add new one
    const photos = readPhotos();
    photos.push(photo);
    writePhotos(photos);

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
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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    // Read all photos and sort by upload date (newest first)
    const allPhotos = readPhotos();
    const sortedPhotos = allPhotos.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    // Calculate pagination
    const totalPhotos = sortedPhotos.length;
    const totalPages = Math.ceil(totalPhotos / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedPhotos = sortedPhotos.slice(startIndex, endIndex);

    res.status(200).json({ 
      photos: paginatedPhotos,
      pagination: {
        currentPage: pageNum,
        totalPages: totalPages,
        totalPhotos: totalPhotos,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum
      }
    });

  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ 
      error: 'Failed to fetch photos',
      details: error.message 
    });
  }
} 
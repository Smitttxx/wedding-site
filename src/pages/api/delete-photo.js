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

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { photoId } = req.query;

    if (!photoId) {
      return res.status(400).json({ error: 'Photo ID is required' });
    }

    // Read existing photos
    const photos = readPhotos();
    
    // Find the photo to delete
    const photoIndex = photos.findIndex(photo => photo.id === photoId);
    
    if (photoIndex === -1) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const photoToDelete = photos[photoIndex];

    // Remove the photo from the array
    photos.splice(photoIndex, 1);
    
    // Save updated photos list
    writePhotos(photos);

    res.status(200).json({ 
      success: true,
      message: 'Photo deleted successfully',
      deletedPhoto: photoToDelete
    });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      error: 'Failed to delete photo',
      details: error.message 
    });
  }
} 
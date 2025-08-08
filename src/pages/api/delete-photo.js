import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { photoId } = req.query;

    if (!photoId) {
      return res.status(400).json({ error: 'Photo ID is required' });
    }

    // Find the photo to delete
    const photoToDelete = await prisma.photo.findUnique({
      where: { id: photoId },
    });
    
    if (!photoToDelete) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Soft delete - mark as deleted instead of removing
    await prisma.photo.update({
      where: { id: photoId },
      data: { deleted: true },
    });

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
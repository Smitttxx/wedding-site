import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    // Get total count of approved, non-deleted photos
    const totalPhotos = await prisma.photo.count({
      where: {
        approved: true,
        deleted: false,
      },
    });

    // Get unique uploaders count
    const uniqueUploaders = await prisma.photo.findMany({
      where: {
        approved: true,
        deleted: false,
        uploadedBy: {
          not: null,
        },
      },
      select: {
        uploadedBy: true,
      },
      distinct: ['uploadedBy'],
    });

    // Calculate pagination
    const totalPages = Math.ceil(totalPhotos / limitNum);
    const skip = (pageNum - 1) * limitNum;

    // Get paginated photos
    const photos = await prisma.photo.findMany({
      where: {
        approved: true,
        deleted: false,
      },
      orderBy: {
        uploadedAt: 'desc', // Newest first
      },
      skip: skip,
      take: limitNum,
    });

    res.status(200).json({ 
      photos: photos,
      pagination: {
        currentPage: pageNum,
        totalPages: totalPages,
        totalPhotos: totalPhotos,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum
      },
      stats: {
        uniqueUploaders: uniqueUploaders.length
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
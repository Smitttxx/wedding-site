import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page = 1, limit = 20, uploader } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const baseWhere = {
      approved: true,
      deleted: false,
    };
    
    const where = {
      ...baseWhere,
      ...(uploader ? {
        uploadedBy: {
          contains: uploader,
          mode: 'insensitive',
        }
      } : {})
    };
    
    // Get total count of approved, non-deleted photos
    const totalPhotos = await prisma.photo.count({ where });

    // Get unique uploaders count
    const uniqueUploaders = await prisma.photo.findMany({
      where: {
        ...baseWhere,
        uploadedBy: { not: null },
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
      where,
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
      },
      uploaders: uniqueUploaders.map(u => u.uploadedBy).filter(Boolean)
    });

  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ 
      error: 'Failed to fetch photos',
      details: error.message 
    });
  }
} 
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const totalCount = await prisma.fridayNightPhoto.count({
      where: {
        approved: true,
        deleted: false,
      },
    });

    // Get photos with pagination, ordered by upload date (newest first)
    const photos = await prisma.fridayNightPhoto.findMany({
      where: {
        approved: true,
        deleted: false,
      },
      orderBy: [
        { order: 'asc' }, // Custom order first
        { uploadedAt: 'desc' }, // Then by upload date
      ],
      skip,
      take: limitNum,
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    res.status(200).json({
      photos: photos,
      pagination: {
        currentPage: pageNum,
        totalPages: totalPages,
        totalCount: totalCount,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching Friday night photos:', error);
    res.status(500).json({ error: 'Failed to fetch Friday night photos' });
  }
}

import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, filename, uploadedBy } = req.body || {};
    if (!url || !filename) {
      return res.status(400).json({ error: 'url and filename are required' });
    }

    const photo = await prisma.photo.create({
      data: {
        filename,
        url,
        uploadedBy: uploadedBy || 'Anonymous',
        approved: true,
        deleted: false,
      },
    });

    return res.status(200).json({ success: true, photo });
  } catch (err) {
    console.error('save metadata error:', err);
    return res.status(500).json({ error: 'Failed to save photo metadata' });
  }
} 
import { generateUploadURL } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, contentType, size } = req.body || {};

    if (!filename || !contentType) {
      return res.status(400).json({ error: 'filename and contentType are required' });
    }

    // Enforce 10MB max on server too
    const MAX_BYTES = 10 * 1024 * 1024;
    if (typeof size === 'number' && size > MAX_BYTES) {
      return res.status(413).json({ error: 'File exceeds 10MB limit' });
    }

    // Restrict to image types by MIME or extension (GIF allowed)
    const okMime = contentType.startsWith('image/');
    const okExt = /(\.heic|\.heif|\.heics|\.avif|\.webp|\.jpg|\.jpeg|\.jfif|\.png|\.gif|\.bmp|\.tif|\.tiff)$/i.test(filename);
    if (!okMime && !okExt) {
      return res.status(415).json({ error: 'Unsupported file type' });
    }

    const { url, id, pathname } = await generateUploadURL({
      contentType,
      access: 'public',
      addRandomSuffix: true,
    });

    return res.status(200).json({ uploadUrl: url, id, pathname });
  } catch (err) {
    console.error('generate upload url error:', err);
    return res.status(500).json({ error: 'Failed to generate upload URL' });
  }
} 
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable body parsing for file uploads
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
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Configure formidable with better error handling
    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filter: ({ mimetype, originalFilename }) => {
        // Check both MIME type and file extension
        const isImageMime = mimetype && mimetype.startsWith('image/');
        const isImageExt = /\.(jpg|jpeg|png|gif|webp|avif|bmp|tiff|tif|heic|heif|heics)$/i.test(originalFilename || '');
        return isImageMime || isImageExt;
      },
    });

    // Parse the form
    const [fields, files] = await form.parse(req);
    
    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ 
        error: 'No file uploaded',
        details: 'Please select a file to upload'
      });
    }

    // Additional validation
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return res.status(413).json({ 
        error: 'File too large',
        details: `File size (${Math.round(file.size / 1024 / 1024 * 100) / 100}MB) exceeds the 10MB limit`,
        maxSize: maxSize,
        actualSize: file.size
      });
    }

    // Check file type more thoroughly
    const originalName = file.originalFilename || '';
    const mimeType = file.mimetype || '';
    const isImageMime = mimeType.startsWith('image/');
    const isImageExt = /\.(jpg|jpeg|png|gif|webp|avif|bmp|tiff|tif|heic|heif|heics)$/i.test(originalName);
    
    if (!isImageMime && !isImageExt) {
      return res.status(415).json({ 
        error: 'Invalid file type',
        details: `File type "${mimeType}" or extension "${path.extname(originalName)}" is not supported. Please upload an image file.`,
        supportedTypes: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'bmp', 'tiff', 'tif', 'heic', 'heif', 'heics']
      });
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const extension = path.extname(originalName);
    const uniqueFilename = `${timestamp}-${randomSuffix}${extension}`;
    const newPath = path.join(uploadsDir, uniqueFilename);

    // Move the file to the final location
    fs.renameSync(file.filepath, newPath);

    // Return the public URL
    const publicUrl = `/uploads/${uniqueFilename}`;

    return res.status(200).json({
      url: publicUrl,
      filename: uniqueFilename,
      originalName: originalName,
      size: file.size,
      mimeType: mimeType
    });

  } catch (err) {
    console.error('Upload error:', err);
    
    // Handle specific formidable errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        error: 'File too large',
        details: 'File exceeds the 10MB size limit'
      });
    }
    
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: 'Unexpected file field',
        details: 'Please use the correct file input field'
      });
    }

    return res.status(500).json({ 
      error: 'Upload failed',
      details: 'An unexpected error occurred during upload'
    });
  }
} 
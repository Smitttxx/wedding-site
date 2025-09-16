import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCamera, faSpinner, faCheckCircle, faExclamationTriangle, faTimes, faWarning, faImages, faCheck, faHeart, faChurch } from '@fortawesome/free-solid-svg-icons';

const UploadContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0.5rem;
  
  @media (min-width: 768px) {
    max-width: 600px;
    padding: 2rem;
  }
`;

const UploadArea = styled.div`
  border: 3px dashed ${props => props.isDragOver ? props.theme.colors.primary : props.theme.colors.accent};
  border-radius: 16px;
  padding: 1.5rem 1rem;
  text-align: center;
  background: ${props => props.isDragOver ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(0, 0, 0, 0.02);
  }

  ${props => props.hasFiles && `
    border-color: ${props.theme.colors.primary};
    background: rgba(0, 0, 0, 0.02);
  `}

  @media (min-width: 768px) {
    padding: 3rem 2rem;
    min-height: 250px;
  }
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 0.75rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const UploadText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
  font-weight: 600;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const UploadSubtext = styled.p`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  line-height: 1.4;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1rem 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-height: auto;
  }
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  white-space: pre-line;
  max-height: 300px;
  overflow-y: auto;

  &.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  &.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  &.loading {
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NameInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 12px;
  font-size: 1rem;
  margin: 1rem 0;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    padding: 0.75rem;
  }
`;

const GalleryLink = styled(Link)`
  display: inline-block;
  margin-top: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  background: ${props => props.theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
`;

const SelectedFilesContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  max-height: 300px;
  overflow-y: auto;
`;

const SelectedFilesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
`;

const SelectedFilesTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
`;

const SelectedFile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 8px;
  border: 1px solid #dee2e6;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0; // Allows text to truncate
`;

const FileName = styled.span`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  
  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

const FileSize = styled.span`
  color: #6c757d;
  font-size: 0.9rem;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background: #c82333;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 1.5rem 1rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  font-style: italic;

  @media (min-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const UploadProgress = styled.div`
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  text-align: center;
  font-weight: 500;
`;

// Upload Modal Styles
const UploadModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalIcon = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ModalWarning = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ffeaa7;
  margin: 1rem 0;
  font-weight: bold;
  font-size: 1.1rem;
`;

const ModalProgress = styled.div`
  margin: 1.5rem 0;
`;

const ModalProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ModalProgressFill = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ModalProgressText = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const SuccessButton = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  transition: all 0.2s ease;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const UploadingInterface = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  border: 2px solid ${props => props.theme.colors.primary};
  margin: 2rem 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.primary};
  }
`;

const UploadingIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const UploadingTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const UploadingWarning = styled.div`
  background: rgba(255, 193, 7, 0.1);
  color: #856404;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 193, 7, 0.3);
  margin: 1rem 0;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.4;
`;

// New mobile-friendly components
const FilesSelectedBanner = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem;
  border-radius: 12px;
  margin: 0.75rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (min-width: 768px) {
    padding: 1rem;
    margin: 1rem 0;
  }
`;

const FilesSelectedText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const FilesSelectedCount = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
`;

const UploadSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 16px;
  padding: 1.25rem;
  margin: 0.75rem 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.theme.colors.primary};
  }

  @media (min-width: 768px) {
    padding: 1.5rem;
    margin: 1rem 0;
  }
`;

const UploadSectionTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;

  @media (min-width: 768px) {
    margin-bottom: 1.25rem;
    font-size: 1.3rem;
  }
`;

const SelectedFilesPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
  max-height: 180px;
  overflow-y: auto;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.2);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
    margin: 1.25rem 0;
    max-height: 200px;
  }
`;

const FilePreviewItem = styled.div`
  background: white;
  border: 2px solid rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.8rem;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    padding: 1rem;
    font-size: 0.85rem;
  }
`;

const FilePreviewName = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const FilePreviewSize = styled.div`
  color: #6c757d;
  font-size: 0.75rem;
  font-weight: 500;
`;

const FilePreviewRemove = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: #c82333;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  gap: 0.75rem;

  @media (min-width: 768px) {
    margin-top: 1.5rem;
    gap: 1rem;
  }
`;

const ClearAllButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);

  &:hover {
    background: #5a6268;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
`;

const ShareButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  flex: 1;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
`;

const MobileHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const WeddingEmoji = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;

const UploadInstructions = styled.div`
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.colors.text};
  padding: 0.75rem;
  border-radius: 8px;
  margin: 0.75rem 0;
  font-size: 0.85rem;
  line-height: 1.4;
  border: 1px solid rgba(212, 175, 55, 0.3);

  @media (min-width: 768px) {
    padding: 1rem;
    margin: 1rem 0;
    font-size: 0.9rem;
  }
`;

const PersonalMessage = styled.div`
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text};
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.3);

  @media (min-width: 768px) {
    font-size: 1.1rem;
    padding: 2rem;
    margin: 1.5rem 0;
  }
`;

const PersonalMessageText = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  
  svg {
    font-size: 1rem !important;
    width: 1rem !important;
    height: 1rem !important;
  }
`;

const PersonalMessageSubtext = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  font-style: italic;
`;

export default function PhotoUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedBy, setUploadedBy] = useState('');
  const [status, setStatus] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef();

  const resetStatus = () => setStatus(null);

  // Helper: determine if a file is an image we support (handles HEIC/HEIF by extension as some browsers leave type blank)
  const isSupportedImage = (file) => {
    const name = (file.name || '').toLowerCase();
    const type = file.type || '';
    const byMime = type.startsWith('image/');
    const byExt = /(\.heic|\.heif|\.heics|\.avif|\.webp|\.jpg|\.jpeg|\.jfif|\.png|\.gif|\.bmp|\.tif|\.tiff)$/i.test(name);
    return byMime || byExt;
  };

  // Helper: check if file size is within limits (we'll compress large files)
  const isWithinSizeLimit = (file) => {
    const maxSize = 50 * 1024 * 1024; // 50MB - we'll compress anything larger
    return file.size <= maxSize;
  };

  // Helper: compress image to fit within Vercel Blob limits
  const compressImage = async (file, maxSizeBytes = 4.2 * 1024 * 1024) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions to reduce file size
        let { width, height } = img;
        const maxDimension = 2048; // Max width or height
        
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Try different quality levels until we get under the size limit
        const tryCompress = (quality) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
            
            if (blob.size <= maxSizeBytes || quality <= 0.1) {
              // Create a new file with the compressed blob
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              // Try with lower quality
              tryCompress(quality - 0.1);
            }
          }, 'image/jpeg', quality);
        };
        
        // Start with 0.9 quality
        tryCompress(0.9);
      };
      
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = URL.createObjectURL(file);
    });
  };

  // Helper: convert HEIC/HEIF to JPEG for compatibility
  const convertIfNeeded = async (file) => {
    const name = (file.name || '').toLowerCase();
    const type = file.type || '';
    const isHeic = type.includes('heic') || type.includes('heif') || /(\.heic|\.heif|\.heics)$/i.test(name);
    if (!isHeic) return file;
    try {
      const heic2any = (await import('heic2any')).default;
      const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
      const newName = name.replace(/\.(heic|heif|heics)$/i, '.jpg');
      return new File([convertedBlob], newName, { type: 'image/jpeg' });
    } catch (e) {
      console.error('HEIC conversion failed:', e);
      throw new Error('Failed to convert HEIC/HEIF');
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    resetStatus();
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleFileSelect = (e) => {
    resetStatus();
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const handleClickUploadArea = () => {
    resetStatus();
    fileInputRef.current?.click();
  };

  const addFiles = (files) => {
    resetStatus();
    
    // Filter files by type and size
    const supported = files.filter(isSupportedImage);
    const withinSizeLimit = supported.filter(isWithinSizeLimit);
    const validFiles = withinSizeLimit;

    // Show warnings for filtered files
    const unsupportedCount = files.length - supported.length;
    const tooLargeCount = supported.length - withinSizeLimit.length;

    if (unsupportedCount > 0) {
      setStatus({ type: 'error', message: `${unsupportedCount} file(s) were skipped — file type not supported.` });
    }

    if (tooLargeCount > 0) {
      setStatus({ type: 'error', message: `${tooLargeCount} file(s) were skipped — file too big (max 50MB).` });
    }

    if (validFiles.length === 0 && files.length > 0) {
      setStatus({ type: 'error', message: 'No supported images found. Supported: HEIC/HEIF, JPG/JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF (max 50MB each, auto-compressed).' });
      return;
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    resetStatus();
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    resetStatus();
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadAllFiles = async () => {
    if (selectedFiles.length === 0) {
      setStatus({ type: 'error', message: 'Please select at least one photo to upload.' });
      return;
    }

    resetStatus();
    setUploading(true);
    setUploadProgress({ current: 0, total: selectedFiles.length });

    let successCount = 0;
    let failedFiles = [];
    let errorMessages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      let file = selectedFiles[i];
      const fileName = file.name;
      const fileSize = Math.round(file.size / 1024 / 1024 * 100) / 100;

      // Convert HEIC/HEIF on client if needed
      try {
        file = await convertIfNeeded(file);
      } catch (err) {
        failedFiles.push(fileName);
        errorMessages.push(`${fileName} (${fileSize}MB): HEIC conversion failed`);
        setUploadProgress({ current: i + 1, total: selectedFiles.length });
        continue;
      }

      // Compress image if it's too large for Vercel Blob
      const originalFileSize = fileSize;
      try {
        if (file.size > 4.2 * 1024 * 1024) { // 4.2MB threshold
          file = await compressImage(file);
        }
      } catch (err) {
        failedFiles.push(fileName);
        errorMessages.push(`${fileName} (${originalFileSize}MB): Compression failed - ${err.message}`);
        setUploadProgress({ current: i + 1, total: selectedFiles.length });
        continue;
      }

      const finalFileSize = Math.round(file.size / 1024 / 1024 * 100) / 100;

      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file);

        // Upload file directly to our API
        const uploadRes = await fetch('/api/blob-upload-url', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json().catch(() => ({}));
          let errorMsg = err.error || 'Upload failed';
          let details = err.details || '';
          
          // Create detailed error message
          if (uploadRes.status === 413) {
            errorMsg = 'File too large';
            details = `File size (${finalFileSize}MB) exceeds the 4.4MB limit`;
          } else if (uploadRes.status === 415) {
            errorMsg = 'Invalid file type';
            details = err.details || 'File type not supported';
          }
          
          failedFiles.push(fileName);
          const sizeInfo = originalFileSize !== finalFileSize ? `${originalFileSize}MB → ${finalFileSize}MB` : `${finalFileSize}MB`;
          errorMessages.push(`${fileName} (${sizeInfo}): ${errorMsg}${details ? ` - ${details}` : ''}`);
          setUploadProgress({ current: i + 1, total: selectedFiles.length });
          continue;
        }

        const { url, filename } = await uploadRes.json();

        // Save metadata
        const metaRes = await fetch('/api/save-photo-metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, filename, uploadedBy }),
        });
        if (!metaRes.ok) {
          failedFiles.push(fileName);
          const sizeInfo = originalFileSize !== finalFileSize ? `${originalFileSize}MB → ${finalFileSize}MB` : `${finalFileSize}MB`;
          errorMessages.push(`${fileName} (${sizeInfo}): Upload succeeded but saving metadata failed`);
          setUploadProgress({ current: i + 1, total: selectedFiles.length });
          continue;
        }

        successCount++;
      } catch (err) {
        console.error('Upload error:', err);
        failedFiles.push(fileName);
        const sizeInfo = originalFileSize !== finalFileSize ? `${originalFileSize}MB → ${finalFileSize}MB` : `${finalFileSize}MB`;
        errorMessages.push(`${fileName} (${sizeInfo}): Network error - ${err.message}`);
      }

      setUploadProgress({ current: i + 1, total: selectedFiles.length });
    }

    setUploading(false);

    // Clear the form
    setSelectedFiles([]);
    setUploadedBy('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Prepare redirect URL with results
    let redirectUrl = '/photos/gallery';
    let urlParams = new URLSearchParams();
    
    if (successCount === selectedFiles.length) {
      // All successful
      urlParams.set('upload', 'success');
      urlParams.set('count', successCount.toString());
    } else if (successCount > 0) {
      // Partial success
      urlParams.set('upload', 'partial');
      urlParams.set('success', successCount.toString());
      urlParams.set('total', selectedFiles.length.toString());
      urlParams.set('failed', (selectedFiles.length - successCount).toString());
    } else {
      // All failed
      urlParams.set('upload', 'failed');
      urlParams.set('total', selectedFiles.length.toString());
    }

    // Add error messages if any
    if (errorMessages.length > 0) {
      urlParams.set('errors', errorMessages.slice(0, 3).join('|'));
    }

    // Redirect to gallery with results
    window.location.href = `${redirectUrl}?${urlParams.toString()}`;
  };

  // Show uploading interface when upload is in progress
  if (uploading) {
    return (
      <>
        <NavBar />
        <Layout>
          <Page>
            <Section>
              <SectionHeading>Share Your Photos</SectionHeading>
              
              <TartanInfoBox>
                Every photo you share shows them their special day through your eyes - capturing moments they might have missed and memories they&apos;ll treasure forever!
              </TartanInfoBox>

              <UploadContainer>
                <UploadingInterface>
                  <UploadingIcon>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </UploadingIcon>
                  <UploadingTitle>Sharing your photos...</UploadingTitle>
                  <UploadingWarning>
                    <FontAwesomeIcon icon={faWarning} style={{ marginRight: '0.5rem' }} />
                    Please don&apos;t refresh or leave this page while your photos are uploading
                  </UploadingWarning>
                  
                  <ModalProgress>
                    <ModalProgressBar>
                      <ModalProgressFill progress={(uploadProgress.current / uploadProgress.total) * 100} />
                    </ModalProgressBar>
                    <ModalProgressText>
                      {uploadProgress.current} of {uploadProgress.total} photos shared
                    </ModalProgressText>
                  </ModalProgress>
                </UploadingInterface>
              </UploadContainer>
            </Section>
          </Page>
        </Layout>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>Share Your Photos</SectionHeading>
          <Section>
          <MobileHeader>
           
           <GalleryLink href="/photos/gallery">
            View All Uploaded Photos →
           </GalleryLink>
         </MobileHeader>
            <UploadContainer>
              <PersonalMessage>
                <PersonalMessageText>
                  <FontAwesomeIcon icon={faHeart} style={{ marginRight: '0.5rem', color: '#d4af37' }} />
                  It means the world to Joe & Laura
                  <FontAwesomeIcon icon={faHeart} style={{ marginLeft: '0.5rem', color: '#d4af37' }} />
                </PersonalMessageText>
                <PersonalMessageSubtext>
                  Every photo you share shows them their special day through your eyes - 
                  capturing moments they might have missed and memories they&apos;ll treasure forever!
                </PersonalMessageSubtext>
              </PersonalMessage>

              <UploadInstructions>
                <strong><FontAwesomeIcon icon={faCamera} style={{ color: '#d4af37' }} /> Upload Tips:</strong><br/>
                • Tap the upload area to select photos<br/>
                • You can select multiple photos at once<br/>
                • Max 50MB per photo (auto-compressed)<br/>
                • Photos will be shared with everyone once uploaded!
              </UploadInstructions>

              <div>
                <label htmlFor="uploadedBy" style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem', display: 'block' }}>
                  Your name (optional):
                </label>
                <NameInput
                  id="uploadedBy"
                  type="text"
                  placeholder="Enter your name to credit your photos"
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                />
              </div>

              <UploadArea
                isDragOver={isDragOver}
                hasFiles={selectedFiles.length > 0}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClickUploadArea}
              >
                <UploadIcon>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                </UploadIcon>
                <UploadText>Tap here to select your photos</UploadText>
                <UploadSubtext>Supports HEIC, JPG/JPEG, PNG, WebP, AVIF, GIF and more (max 50MB each, auto-compressed)</UploadSubtext>
                {selectedFiles.length > 0 && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '8px' }}>
                    <FontAwesomeIcon icon={faCheck} style={{ color: '#28a745', marginRight: '0.5rem' }} />
                    {selectedFiles.length} photo{selectedFiles.length !== 1 ? 's' : ''} selected
                  </div>
                )}
              </UploadArea>

              <FileInput
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/avif,image/bmp,image/tiff,image/tif,.heic,.heif,.heics,.jfif"
                multiple
                webkitdirectory="false"
                data-testid="file-input"
                onChange={handleFileSelect}
              />

              {/* Mobile-friendly files selected banner */}
              {selectedFiles.length > 0 && (
                <FilesSelectedBanner>
                  <FilesSelectedText>
                    <FontAwesomeIcon icon={faCheck} />
                    Photos Selected
                  </FilesSelectedText>
                  <FilesSelectedCount>
                    {selectedFiles.length}
                  </FilesSelectedCount>
                </FilesSelectedBanner>
              )}

              {/* Mobile-friendly upload section */}
              {selectedFiles.length > 0 && (
                <UploadSection>
                  <UploadSectionTitle>
                    <FontAwesomeIcon icon={faCamera} />
                    Ready to Share
                  </UploadSectionTitle>
                  
                  <SelectedFilesPreview>
                    {selectedFiles.map((file, index) => (
                      <FilePreviewItem key={index}>
                        <FilePreviewName>{file.name}</FilePreviewName>
                        <FilePreviewSize>{formatFileSize(file.size)}</FilePreviewSize>
                        <FilePreviewRemove onClick={() => removeFile(index)}>
                          <FontAwesomeIcon icon={faTimes} />
                        </FilePreviewRemove>
                      </FilePreviewItem>
                    ))}
                  </SelectedFilesPreview>

                  <ActionButtonsContainer>
                    <ClearAllButton onClick={clearAllFiles}>
                      Clear All
                    </ClearAllButton>
                    <ShareButton onClick={uploadAllFiles}>
                      <FontAwesomeIcon icon={faHeart} />
                      Share {selectedFiles.length} Photo{selectedFiles.length !== 1 ? 's' : ''}
                    </ShareButton>
                  </ActionButtonsContainer>
                </UploadSection>
              )}

              {selectedFiles.length === 0 && (
                <EmptyState>
                  No photos selected. Tap the upload area above to add photos.
                </EmptyState>
              )}
              {status && (
                <StatusMessage className={status.type}>
                  <div style={{ flexShrink: 0, marginTop: '0.1rem' }}>
                    <FontAwesomeIcon 
                      icon={
                        status.type === 'success' ? faCheckCircle :
                        status.type === 'error' ? faExclamationTriangle :
                        faSpinner
                      }
                      spin={status.type === 'loading'}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    {status.message}
                  </div>
                </StatusMessage>
              )}
            </UploadContainer>
          </Section>
        </Page>
      </Layout>

    </>
  );
} 
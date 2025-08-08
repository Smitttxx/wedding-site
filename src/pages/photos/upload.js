import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCamera, faSpinner, faCheckCircle, faExclamationTriangle, faTimes, faWarning, faImages, faCheck, faHeart } from '@fortawesome/free-solid-svg-icons';

const UploadContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 768px) {
    max-width: 600px;
    padding: 2rem;
  }
`;

const UploadArea = styled.div`
  border: 3px dashed ${props => props.isDragOver ? props.theme.colors.primary : props.theme.colors.accent};
  border-radius: 16px;
  padding: 2rem 1rem;
  text-align: center;
  background: ${props => props.isDragOver ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  min-height: 200px;
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
  font-size: 2.5rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const UploadText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-weight: 600;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const UploadSubtext = styled.p`
  font-size: 0.9rem;
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
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 1rem;

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
  margin-top: 1rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  
  &:hover {
    text-decoration: underline;
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

const ClearAllButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  min-height: 40px;

  &:hover {
    background: #5a6268;
  }

  &:active {
    transform: scale(0.95);
  }
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
  padding: 2rem 1rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  font-style: italic;
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
  background: #f8f9fa;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.colors.primary};
  margin: 2rem 0;
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
`;

const UploadingWarning = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #ffeaa7;
  margin: 1rem 0;
  font-weight: bold;
  font-size: 1.1rem;
`;

// New mobile-friendly components
const FilesSelectedBanner = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const FilesSelectedText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

const FilesSelectedCount = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
`;

const UploadSection = styled.div`
  background: white;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const UploadSectionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SelectedFilesPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
  max-height: 200px;
  overflow-y: auto;
`;

const FilePreviewItem = styled.div`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.8rem;
  position: relative;
`;

const FilePreviewName = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
`;

const FilePreviewSize = styled.div`
  color: #6c757d;
  font-size: 0.7rem;
`;

const FilePreviewRemove = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const WeddingEmoji = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const UploadInstructions = styled.div`
  background: #e3f2fd;
  color: #1565c0;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
  border-left: 4px solid #2196f3;
`;

const PersonalMessage = styled.div`
  background: linear-gradient(135deg, #d4af37 0%, #228b22 50%, #228b22 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  margin: 1.5rem 0;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '💚';
    position: absolute;
    top: -10px;
    left: -10px;
    font-size: 2rem;
    opacity: 0.4;
  }

  &::after {
    content: '💚';
    position: absolute;
    bottom: -10px;
    right: -10px;
    font-size: 2rem;
    opacity: 0.4;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
    padding: 2rem;
  }
`;

const PersonalMessageText = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const PersonalMessageSubtext = styled.div`
  font-size: 0.9rem;
  opacity: 0.95;
  font-style: italic;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export default function PhotoUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedBy, setUploadedBy] = useState('');
  const [status, setStatus] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef();

  // Prevent page leave during upload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (uploading) {
        e.preventDefault();
        e.returnValue = 'Your photos are still uploading! Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    if (uploading) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [uploading]);

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
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const addFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const validFiles = imageFiles.filter(file => file.size <= 10 * 1024 * 1024);
    
    if (imageFiles.length !== files.length) {
      setStatus({ type: 'error', message: 'Some files were skipped - only image files are allowed.' });
    }
    
    if (validFiles.length !== imageFiles.length) {
      setStatus({ type: 'error', message: 'Some files were skipped - maximum file size is 10MB.' });
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
    setStatus(null);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
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

    setUploading(true);
    setUploadComplete(false);
    setUploadProgress({ current: 0, total: selectedFiles.length });

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uploadedBy', uploadedBy);

        const response = await fetch('/api/upload-photo', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          successCount++;
        } else {
          errorCount++;
          console.error(`Failed to upload ${file.name}:`, result.error);
        }
      } catch (error) {
        errorCount++;
        console.error(`Error uploading ${file.name}:`, error);
      }

      setUploadProgress({ current: i + 1, total: selectedFiles.length });
    }

    setUploading(false);
    setUploadComplete(true);

    if (successCount === selectedFiles.length) {
      setSelectedFiles([]);
      setUploadedBy('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
                📸 Help us capture every moment of Laura & Joe&apos;s special day!
              </TartanInfoBox>

              <UploadContainer>
                <UploadingInterface>
                  <UploadingIcon>
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </UploadingIcon>
                  <UploadingTitle>Uploading Your Photos...</UploadingTitle>
                  <UploadingWarning>
                    ⚠️ DO NOT REFRESH OR LEAVE THIS PAGE OR YOUR PHOTOS WON&apos;T BE UPLOADED!
                  </UploadingWarning>
                  
                  <ModalProgress>
                    <ModalProgressBar>
                      <ModalProgressFill progress={(uploadProgress.current / uploadProgress.total) * 100} />
                    </ModalProgressBar>
                    <ModalProgressText>
                      {uploadProgress.current} of {uploadProgress.total} photos uploaded
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
          <Section>
            <SectionHeading>Share Your Photos</SectionHeading>
            
            <TartanInfoBox>
              📸 Help us capture every moment of Laura & Joe&apos;s special day!
            </TartanInfoBox>

            <MobileHeader>
              <WeddingEmoji>💒</WeddingEmoji>
              <GalleryLink href="/photos/gallery">
                View All Photos →
              </GalleryLink>
            </MobileHeader>

            <UploadContainer>
              <PersonalMessage>
                <PersonalMessageText>
                  💝 It means the world to Joe & Laura 💝
                </PersonalMessageText>
                <PersonalMessageSubtext>
                  Every photo you share shows them their special day through your eyes - 
                  capturing moments they might have missed and memories they'll treasure forever!
                </PersonalMessageSubtext>
              </PersonalMessage>

              <UploadInstructions>
                <strong>📱 Mobile Tips:</strong><br/>
                • Tap the upload area to select photos<br/>
                • You can select multiple photos at once<br/>
                • Photos will be shared instantly with everyone!
              </UploadInstructions>

              <UploadArea
                isDragOver={isDragOver}
                hasFiles={selectedFiles.length > 0}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                </UploadIcon>
                <UploadText>Tap here to select your photos</UploadText>
                <UploadSubtext>Supports multiple JPEG, PNG, and other image formats (max 10MB each)</UploadSubtext>
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
                accept="image/*"
                multiple
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', gap: '0.5rem' }}>
                    <button 
                      onClick={clearAllFiles}
                      style={{ 
                        background: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.75rem 1rem', 
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        minHeight: '48px'
                      }}
                    >
                      Clear All
                    </button>
                    <Button onClick={uploadAllFiles}>
                      <FontAwesomeIcon icon={faHeart} />
                      Share {selectedFiles.length} Photo{selectedFiles.length !== 1 ? 's' : ''}
                    </Button>
                  </div>
                </UploadSection>
              )}

              {selectedFiles.length === 0 && (
                <EmptyState>
                  No photos selected. Tap the upload area above to add photos.
                </EmptyState>
              )}

              <div>
                <label htmlFor="uploadedBy" style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
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

              {status && (
                <StatusMessage className={status.type}>
                  <FontAwesomeIcon 
                    icon={
                      status.type === 'success' ? faCheckCircle :
                      status.type === 'error' ? faExclamationTriangle :
                      faSpinner
                    }
                    spin={status.type === 'loading'}
                  />
                  {status.message}
                </StatusMessage>
              )}
            </UploadContainer>
          </Section>
        </Page>
      </Layout>

      {/* Success Modal */}
      {uploadComplete && (
        <UploadModal>
          <ModalContent>
            <ModalIcon>
              <FontAwesomeIcon icon={faCheckCircle} />
            </ModalIcon>
            <ModalTitle>Photos Shared! 🎉</ModalTitle>
            <p>Your photos have been successfully shared with everyone at the wedding!</p>
            <SuccessButton href="/photos/gallery">
              <FontAwesomeIcon icon={faImages} style={{ marginRight: '0.5rem' }} />
              View All Photos
            </SuccessButton>
          </ModalContent>
        </UploadModal>
      )}
    </>
  );
} 
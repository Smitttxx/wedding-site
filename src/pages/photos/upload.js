import { useState, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCamera, faSpinner, faCheckCircle, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

const UploadContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const UploadArea = styled.div`
  border: 3px dashed ${props => props.isDragOver ? props.theme.colors.primary : props.theme.colors.accent};
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  background: ${props => props.isDragOver ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(0, 0, 0, 0.02);
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight || '#666'};
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
  margin: 1rem 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

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
`;

const NameInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 8px;
  font-size: 1rem;
  margin: 1rem 0;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const GalleryLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SelectedFilesContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
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
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background: #5a6268;
  }
`;

const SelectedFile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.25rem 0;
  background: white;
  border-radius: 4px;
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
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    background: #c82333;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  font-style: italic;
`;

const UploadProgress = styled.div`
  margin: 1rem 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
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
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  text-align: center;
`;

export default function PhotoUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedBy, setUploadedBy] = useState('');
  const [status, setStatus] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef();

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
    setUploadProgress({ current: 0, total: selectedFiles.length });
    setStatus({ type: 'loading', message: `Uploading ${selectedFiles.length} photo${selectedFiles.length !== 1 ? 's' : ''}...` });

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

    if (successCount === selectedFiles.length) {
      setStatus({ type: 'success', message: `Successfully uploaded all ${successCount} photo${successCount !== 1 ? 's' : ''}! 🎉` });
      setSelectedFiles([]);
      setUploadedBy('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else if (successCount > 0) {
      setStatus({ type: 'success', message: `Uploaded ${successCount} photo${successCount !== 1 ? 's' : ''} successfully. ${errorCount} failed.` });
    } else {
      setStatus({ type: 'error', message: 'Failed to upload any photos. Please try again.' });
    }
  };

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <Section>
            <SectionHeading>Share Your Photos</SectionHeading>
            
            <TartanInfoBox>
              📸 Help us capture every moment of Laura & Joe's special day!
            </TartanInfoBox>

            <div style={{ textAlign: 'center'}}>
              <GalleryLink href="/photos/gallery">
                View All Photos →
              </GalleryLink>
            </div>

            <UploadContainer>
              <UploadArea
                isDragOver={isDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadIcon>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                </UploadIcon>
                <UploadText>Drop your photos here or click to select</UploadText>
                <UploadSubtext>Supports multiple JPEG, PNG, and other image formats (max 10MB each)</UploadSubtext>
              </UploadArea>

              <FileInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
              />

              {selectedFiles.length > 0 && (
                <SelectedFilesContainer>
                  <SelectedFilesHeader>
                    <SelectedFilesTitle>Selected Photos ({selectedFiles.length})</SelectedFilesTitle>
                    <ClearAllButton onClick={clearAllFiles}>
                      Clear All
                    </ClearAllButton>
                  </SelectedFilesHeader>
                  {selectedFiles.map((file, index) => (
                    <SelectedFile key={index}>
                      <FileInfo>
                        <FontAwesomeIcon icon={faCamera} />
                        <FileName>{file.name}</FileName>
                        <FileSize>({formatFileSize(file.size)})</FileSize>
                      </FileInfo>
                      <RemoveButton onClick={() => removeFile(index)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </RemoveButton>
                    </SelectedFile>
                  ))}
                </SelectedFilesContainer>
              )}

              {selectedFiles.length === 0 && (
                <EmptyState>
                  No photos selected. Drag and drop or click to add photos.
                </EmptyState>
              )}

              <div>
                <label htmlFor="uploadedBy">Your name (optional):</label>
                <NameInput
                  id="uploadedBy"
                  type="text"
                  placeholder="Enter your name to credit your photos"
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                />
              </div>

              {selectedFiles.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Button 
                    onClick={uploadAllFiles} 
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '0.5rem' }} />
                        Uploading...
                      </>
                    ) : (
                      `Upload ${selectedFiles.length} Photo${selectedFiles.length !== 1 ? 's' : ''}`
                    )}
                  </Button>
                </div>
              )}

              {uploading && (
                <UploadProgress>
                  <ProgressBar>
                    <ProgressFill progress={(uploadProgress.current / uploadProgress.total) * 100} />
                  </ProgressBar>
                  <ProgressText>
                    {uploadProgress.current} of {uploadProgress.total} photos uploaded
                  </ProgressText>
                </UploadProgress>
              )}

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
    </>
  );
} 
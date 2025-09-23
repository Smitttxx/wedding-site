import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCamera, faSpinner, faCheckCircle, faExclamationTriangle, faTimes, faWarning, faImages, faCheck, faHeart, faUtensils, faUser } from '@fortawesome/free-solid-svg-icons';

const UploadContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const UploadArea = styled.div`
  border: 3px dashed ${props => props.$isDragActive ? props.theme.colors.primary : props.theme.colors.accent};
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  background: ${props => props.$isDragActive ? 'rgba(11, 61, 46, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
  transition: all 0.3s ease;
  cursor: pointer;
  margin: 2rem 0;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(11, 61, 46, 0.05);
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const UploadText = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const UploadSubtext = styled.p`
  color: ${props => props.theme.colors.text};
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const FormGroup = styled.div`
  margin: 1.5rem 0;
`;

const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const UploadButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem auto;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
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
  font-weight: 600;
  
  ${props => props.type === 'success' && `
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `}
  
  ${props => props.type === 'error' && `
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
  
  ${props => props.type === 'warning' && `
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
  `}
`;

const ProgressContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(11, 61, 46, 0.05);
  border-radius: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
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

const FileList = styled.div`
  margin: 1rem 0;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 8px;
  background: white;
`;

const FileListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
`;

const FileCount = styled.span`
  font-size: 0.9rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FileListContent = styled.div`
  max-height: ${props => props.$isExpanded ? '250px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const CompactView = styled.div`
  padding: 0.75rem;
  background: rgba(11, 61, 46, 0.05);
  border-radius: 0 0 8px 8px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: rgba(11, 61, 46, 0.05);
  border-radius: 8px;
  margin: 0.5rem 0;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const FileName = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const FileSize = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: #c82333;
  }
`;

const ClearAllButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  margin: 1rem 0;
  
  &:hover {
    background: #5a6268;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
  
  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

export default function FridayNightUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadedBy, setUploadedBy] = useState('');
  const [status, setStatus] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [showFileList, setShowFileList] = useState(false);

  const resetStatus = () => setStatus(null);

  // Helper: determine if a file is an image we support (handles HEIC/HEIF by extension as some browsers leave type blank)
  const isSupportedImage = (file) => {
    const name = (file.name || '').toLowerCase();
    const type = file.type || '';
    const byMime = type.startsWith('image/');
    const byExt = /(\.heic|\.heif|\.heics|\.avif|\.webp|\.jpg|\.jpeg|\.jfif|\.png|\.gif|\.bmp|\.tif|\.tiff)$/i.test(name);
    return byMime || byExt;
  };

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    resetStatus();
    
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(rejection => {
        if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
          return `${rejection.file.name}: Invalid file type`;
        }
        if (rejection.errors.some(e => e.code === 'file-too-large')) {
          return `${rejection.file.name}: File too large (max 4.4MB)`;
        }
        return `${rejection.file.name}: ${rejection.errors[0]?.message || 'Unknown error'}`;
      });
      setStatus({ type: 'error', message: errors.join('\n') });
    }

    // Add accepted files
    if (acceptedFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...acceptedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.avif', '.bmp', '.tiff', '.tif', '.heic', '.heif', '.heics', '.jfif']
    },
    multiple: true,
    maxSize: 50 * 1024 * 1024, // 50MB - will be compressed client-side
    noClick: false,
    noKeyboard: false
  });

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    resetStatus();
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    resetStatus();
  };

  const uploadAllFiles = async () => {
    if (selectedFiles.length === 0) {
      setStatus({ type: 'error', message: 'Please select at least one photo to upload.' });
      return;
    }

    if (!uploadedBy.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return;
    }

    setUploading(true);
    setStatus(null);
    setUploadProgress({ current: 0, total: selectedFiles.length });

    let successCount = 0;
    let failedFiles = [];
    let errorMessages = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileName = file.name;
        const originalFileSize = Math.round(file.size / 1024 / 1024 * 100) / 100;

        try {
          // Client-side compression for large files
          let fileToUpload = file;
          const originalSize = file.size;
          const maxSize = 4.4 * 1024 * 1024; // 4.4MB Vercel Blob limit
          
          if (originalSize > maxSize) {
            console.log(`Compressing ${fileName}: ${Math.round(originalSize / 1024 / 1024 * 100) / 100}MB`);
            
            try {
              // Convert HEIC/HEIF to JPEG if needed
              if (file.type === 'image/heic' || file.type === 'image/heif' || /\.(heic|heif|heics)$/i.test(fileName)) {
                const heic2any = (await import('heic2any')).default;
                const converted = await heic2any({
                  blob: file,
                  toType: 'image/jpeg',
                  quality: 0.8
                });
                fileToUpload = converted[0];
              }
              
              // Compress using Canvas API
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new Image();
              
              await new Promise((resolve, reject) => {
                img.onload = () => {
                  // Calculate new dimensions to fit within 4.4MB
                  let { width, height } = img;
                  const aspectRatio = width / height;
                  
                  // Start with 90% quality and reduce if needed
                  let quality = 0.9;
                  let targetSize = maxSize;
                  
                  // Estimate compression ratio (JPEG typically compresses to 10-20% of original)
                  const estimatedCompressionRatio = 0.15;
                  const targetPixels = targetSize / (estimatedCompressionRatio * 4); // 4 bytes per pixel
                  const targetDimension = Math.sqrt(targetPixels);
                  
                  if (width > targetDimension || height > targetDimension) {
                    if (width > height) {
                      width = targetDimension;
                      height = width / aspectRatio;
                    } else {
                      height = targetDimension;
                      width = height * aspectRatio;
                    }
                  }
                  
                  canvas.width = width;
                  canvas.height = height;
                  
                  ctx.drawImage(img, 0, 0, width, height);
                  
                  // Try different quality levels until we get under 4.4MB
                  const tryCompress = (q) => {
                    canvas.toBlob((blob) => {
                      if (blob && blob.size <= maxSize) {
                        fileToUpload = blob;
                        resolve();
                      } else if (q > 0.1) {
                        tryCompress(q - 0.1);
                      } else {
                        // If still too large, reduce dimensions
                        const scaleFactor = Math.sqrt(maxSize / (blob ? blob.size : originalSize));
                        canvas.width = width * scaleFactor;
                        canvas.height = height * scaleFactor;
                        ctx.drawImage(img, 0, 0, width * scaleFactor, height * scaleFactor);
                        canvas.toBlob((finalBlob) => {
                          fileToUpload = finalBlob;
                          resolve();
                        }, 'image/jpeg', 0.8);
                      }
                    }, 'image/jpeg', q);
                  };
                  
                  tryCompress(quality);
                };
                img.onerror = reject;
                img.src = URL.createObjectURL(fileToUpload);
              });
              
              console.log(`Compressed ${fileName}: ${Math.round(originalSize / 1024 / 1024 * 100) / 100}MB → ${Math.round(fileToUpload.size / 1024 / 1024 * 100) / 100}MB`);
            } catch (compressionError) {
              console.warn('Compression failed, using original file:', compressionError);
              // If compression fails, use original file and let server handle it
            }
          }

          // Create FormData for file upload
          const formData = new FormData();
          formData.append('file', fileToUpload);
          formData.append('uploadedBy', uploadedBy.trim());

          // Upload file directly to our API with timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
          
          console.log(`Uploading ${fileName}: ${originalFileSize}MB`);
          
          const uploadRes = await fetch('/api/upload-friday-photo', {
            method: 'POST',
            body: formData,
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);

          if (!uploadRes.ok) {
            const err = await uploadRes.json().catch(() => ({}));
            let errorMsg = err.error || 'Upload failed';
            let details = err.details || '';
            
            // Create detailed error message
            if (uploadRes.status === 413) {
              errorMsg = 'File too large';
              details = `File size (${originalFileSize}MB) exceeds the 4.4MB limit`;
            } else if (uploadRes.status === 415) {
              errorMsg = 'Invalid file type';
              details = err.details || 'File type not supported';
            }
            
            failedFiles.push(fileName);
            errorMessages.push(`${fileName} (${originalFileSize}MB): ${errorMsg}${details ? ` - ${details}` : ''}`);
            setUploadProgress({ current: i + 1, total: selectedFiles.length });
            continue;
          }

          const { url, filename } = await uploadRes.json();
          successCount++;

        } catch (err) {
          console.error('Upload error:', err);
          failedFiles.push(fileName);
          
          let errorMessage = 'Network error';
          if (err.name === 'AbortError') {
            errorMessage = 'Upload timeout (60s) - try smaller files or better connection';
          } else if (err.message.includes('Failed to fetch')) {
            errorMessage = 'Connection failed - check your internet connection';
          } else if (err.message.includes('NetworkError')) {
            errorMessage = 'Network error - try again';
          } else {
            errorMessage = err.message;
          }
          
          errorMessages.push(`${fileName} (${originalFileSize}MB): ${errorMessage}`);
        }

        setUploadProgress({ current: i + 1, total: selectedFiles.length });
      }

      // Show final results
      if (successCount > 0 && failedFiles.length === 0) {
        setStatus({ 
          type: 'success', 
          message: `Successfully uploaded ${successCount} photo${successCount !== 1 ? 's' : ''}!` 
        });
        setSelectedFiles([]);
        setUploadedBy('');
      } else if (successCount > 0 && failedFiles.length > 0) {
        setStatus({ 
          type: 'warning', 
          message: `Uploaded ${successCount} photo${successCount !== 1 ? 's' : ''}, but ${failedFiles.length} failed:\n${errorMessages.join('\n')}` 
        });
      } else {
        setStatus({ 
          type: 'error', 
          message: `All uploads failed:\n${errorMessages.join('\n')}` 
        });
      }

    } catch (error) {
      console.error('Upload process error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Upload process failed. Please try again.' 
      });
    } finally {
      setUploading(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <UploadContainer>
            <BackButton href="/friday-night">
              <FontAwesomeIcon icon={faUtensils} style={{ fontSize: '0.9rem' }} />
              Back to Friday BBQ Photos
            </BackButton>

            <SectionHeading>Upload Friday Night Photos</SectionHeading>
            
            <Section>
              <TartanInfoBox>
                <FontAwesomeIcon icon={faUtensils} style={{ marginRight: '0.5rem', color: '#d4af37', fontSize: '1rem' }} />
                <strong>Share Your Friday Night Memories!</strong>
                <br />
                Upload photos from the Friday night BBQ to share with everyone. 
                Photos will be reviewed before being added to the gallery.
              </TartanInfoBox>

              <FormGroup>
                <Label htmlFor="uploadedBy">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
                  Your Name
                </Label>
                <Input
                  id="uploadedBy"
                  type="text"
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                  placeholder="Enter your name"
                  disabled={uploading}
                />
              </FormGroup>

              <UploadArea
                {...getRootProps()}
                $isDragActive={isDragActive}
              >
                <input {...getInputProps()} />
                <UploadIcon>
                  <FontAwesomeIcon icon={faCloudUploadAlt} />
                </UploadIcon>
                <UploadText>
                  {isDragActive ? 'Drop your Friday night photos here' : 'Tap here to select your Friday night photos'}
                </UploadText>
                <UploadSubtext>Supports HEIC, JPG/JPEG, PNG, WebP, AVIF, GIF and more (large files will be compressed automatically)</UploadSubtext>
                {selectedFiles.length > 0 && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '8px' }}>
                    <FontAwesomeIcon icon={faCheck} style={{ color: '#28a745', marginRight: '0.5rem' }} />
                    {selectedFiles.length} photo{selectedFiles.length !== 1 ? 's' : ''} selected
                  </div>
                )}
              </UploadArea>

              {selectedFiles.length > 0 && (
                <FileList>
                  <FileListHeader>
                    <FileCount>
                      <FontAwesomeIcon icon={faImages} style={{ marginRight: '0.5rem' }} />
                      {selectedFiles.length} Photo{selectedFiles.length !== 1 ? 's' : ''} Selected
                    </FileCount>
                    <ToggleButton onClick={() => setShowFileList(!showFileList)}>
                      {showFileList ? 'Hide' : 'Show'} Details
                    </ToggleButton>
                  </FileListHeader>
                  
                  {showFileList ? (
                    <FileListContent $isExpanded={showFileList}>
                      {selectedFiles.map((file, index) => (
                        <FileItem key={index}>
                          <FileInfo>
                            <FontAwesomeIcon icon={faImages} style={{ color: '#d4af37' }} />
                            <FileName>{file.name}</FileName>
                            <FileSize>({Math.round(file.size / 1024 / 1024 * 100) / 100}MB)</FileSize>
                          </FileInfo>
                          <RemoveButton onClick={() => removeFile(index)} disabled={uploading}>
                            <FontAwesomeIcon icon={faTimes} />
                          </RemoveButton>
                        </FileItem>
                      ))}
                    </FileListContent>
                  ) : (
                    <CompactView>
                      Click &quot;Show Details&quot; to see individual files or remove specific photos
                    </CompactView>
                  )}
                  
                  <ClearAllButton onClick={clearAllFiles} disabled={uploading} style={{ margin: '0.75rem', width: 'calc(100% - 1.5rem)' }}>
                    <FontAwesomeIcon icon={faTimes} style={{ marginRight: '0.5rem' }} />
                    Clear All
                  </ClearAllButton>
                </FileList>
              )}

              {uploading && (
                <ProgressContainer>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <span>Uploading {uploadProgress.current} of {uploadProgress.total} photos...</span>
                  </div>
                  <ProgressBar>
                    <ProgressFill progress={(uploadProgress.current / uploadProgress.total) * 100} />
                  </ProgressBar>
                </ProgressContainer>
              )}

              {status && (
                <StatusMessage type={status.type}>
                  {status.type === 'success' && <FontAwesomeIcon icon={faCheckCircle} />}
                  {status.type === 'error' && <FontAwesomeIcon icon={faExclamationTriangle} />}
                  {status.type === 'warning' && <FontAwesomeIcon icon={faWarning} />}
                  <div style={{ whiteSpace: 'pre-line' }}>{status.message}</div>
                </StatusMessage>
              )}

              <UploadButton onClick={uploadAllFiles} disabled={uploading || selectedFiles.length === 0}>
                {uploading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCloudUploadAlt} />
                    Upload {selectedFiles.length} Photo{selectedFiles.length !== 1 ? 's' : ''}
                  </>
                )}
              </UploadButton>
            </Section>
          </UploadContainer>
        </Page>
      </Layout>
    </>
  );
}

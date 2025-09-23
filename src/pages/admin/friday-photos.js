import { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section } from '../../components/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

const UploadSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 2px solid ${props => props.theme.colors.primary};
  margin: 2rem 0;
`;

const UploadTitle = styled.h1`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const UploadArea = styled.div`
  border: 3px dashed ${props => props.$isDragActive ? props.theme.colors.primaryDark : props.theme.colors.primary};
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  background: ${props => props.$isDragActive ? 'rgba(11, 61, 46, 0.15)' : 'rgba(11, 61, 46, 0.05)'};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background: rgba(11, 61, 46, 0.1);
    border-color: ${props => props.theme.colors.primaryDark};
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.7;
`;

const FileInput = styled.input`
  display: none;
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
  transition: background 0.3s ease;
  margin: 1rem 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const FileList = styled.div`
  margin-top: 2rem;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border: 1px solid ${props => props.theme.colors.primary};
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const FileName = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const FileSize = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.7;
`;

const StatusIcon = styled.div`
  font-size: 1.2rem;
  margin-left: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(11, 61, 46, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ResultsSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.primary};
`;

const ResultsTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const ResultsList = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: ${props => props.success ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
  border-radius: 6px;
  border-left: 4px solid ${props => props.success ? '#4caf50' : '#f44336'};
`;

export default function FridayPhotosAdmin() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      status: 'pending',
      progress: 0,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  // Helper: check if file size is within limits (we'll compress large files)
  const isFileSizeValid = (file) => {
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
        // Calculate new dimensions to maintain aspect ratio
        let { width, height } = img;
        const maxDimension = 2048; // Max width/height for compression
        
        if (width > maxDimension || height > maxDimension) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
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

  // Helper: convert HEIC files to JPEG
  const convertHeicToJpeg = async (file) => {
    try {
      const heic2any = (await import('heic2any')).default;
      const convertedBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
      return new File([convertedBlob], file.name.replace(/\.(heic|heif|heics)$/i, '.jpg'), {
        type: 'image/jpeg',
        lastModified: Date.now()
      });
    } catch (error) {
      console.error('HEIC conversion failed:', error);
      throw new Error('Failed to convert HEIC file');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.avif', '.bmp', '.tiff', '.tif', '.heic', '.heif', '.heics', '.jfif']
    },
    multiple: true,
    maxSize: 50 * 1024 * 1024, // 50MB - we'll compress anything larger
    noClick: false,
    noKeyboard: false
  });

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadResults([]);
    const results = [];

    for (const fileItem of files) {
      try {
        let fileToUpload = fileItem.file;
        
        // Convert HEIC files to JPEG
        if (fileItem.file.name.toLowerCase().match(/\.(heic|heif|heics)$/)) {
          try {
            fileToUpload = await convertHeicToJpeg(fileItem.file);
          } catch (error) {
            console.error('HEIC conversion failed:', error);
            throw new Error('Failed to convert HEIC file');
          }
        }
        
        // Compress files that are close to or over the limit
        if (fileToUpload.size > 4.0 * 1024 * 1024) {
          try {
            fileToUpload = await compressImage(fileToUpload);
          } catch (error) {
            console.error('Compression failed:', error);
            throw new Error('Failed to compress image');
          }
        }
        
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('uploadedBy', 'Bride & Groom');

        const response = await fetch('/api/upload-friday-photo', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          fileItem.status = 'success';
          results.push({
            filename: fileItem.file.name,
            success: true,
            url: result.photo.url,
          });
        } else {
          fileItem.status = 'error';
          results.push({
            filename: fileItem.file.name,
            success: false,
            error: result.error || 'Upload failed',
          });
        }
      } catch (error) {
        fileItem.status = 'error';
        results.push({
          filename: fileItem.file.name,
          success: false,
          error: error.message,
        });
      }

      fileItem.progress = 100;
      setFiles([...files]);
    }

    setUploadResults(results);
    setUploading(false);
  };

  const clearResults = () => {
    setFiles([]);
    setUploadResults([]);
  };

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <Section>
            <UploadTitle>
              <FontAwesomeIcon icon={faUpload} style={{ marginRight: '0.5rem', fontSize: '0.8em' }} />
              Upload Friday Night Photos
            </UploadTitle>

            <UploadSection>
              <UploadArea
                {...getRootProps()}
                $isDragActive={isDragActive}
              >
                <input {...getInputProps()} />
                <UploadIcon>
                  <FontAwesomeIcon icon={faUpload} />
                </UploadIcon>
                <UploadText>
                  {isDragActive ? 'Drop your Friday night photos here' : 'Drop your Friday night photos here'}
                </UploadText>
                <UploadSubtext>or click to browse files</UploadSubtext>
                <UploadSubtext>Supports HEIC, JPG/JPEG, PNG, WebP, AVIF, GIF and more (large files will be compressed automatically)</UploadSubtext>
              </UploadArea>

              <div style={{ textAlign: 'center' }}>
                <UploadButton
                  onClick={uploadFiles}
                  disabled={files.length === 0 || uploading}
                >
                  {uploading ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faUpload} />
                      Upload {files.length} Photo{files.length !== 1 ? 's' : ''}
                    </>
                  )}
                </UploadButton>

                {files.length > 0 && (
                  <UploadButton onClick={clearResults} style={{ background: '#f44336' }}>
                    <FontAwesomeIcon icon={faTimes} />
                    Clear All
                  </UploadButton>
                )}
              </div>

              {files.length > 0 && (
                <FileList>
                  {files.map((fileItem) => (
                    <FileItem key={fileItem.id}>
                      <FileInfo>
                        <FileName>{fileItem.file.name}</FileName>
                        <FileSize>
                          {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                        </FileSize>
                      </FileInfo>
                      <StatusIcon>
                        {fileItem.status === 'pending' && (
                          <FontAwesomeIcon icon={faSpinner} spin style={{ color: '#ff9800' }} />
                        )}
                        {fileItem.status === 'success' && (
                          <FontAwesomeIcon icon={faCheck} style={{ color: '#4caf50' }} />
                        )}
                        {fileItem.status === 'error' && (
                          <FontAwesomeIcon icon={faTimes} style={{ color: '#f44336' }} />
                        )}
                      </StatusIcon>
                      <button
                        onClick={() => removeFile(fileItem.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f44336',
                          cursor: 'pointer',
                          marginLeft: '1rem',
                        }}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </FileItem>
                  ))}
                </FileList>
              )}

              {uploadResults.length > 0 && (
                <ResultsSection>
                  <ResultsTitle>Upload Results</ResultsTitle>
                  <ResultsList>
                    {uploadResults.map((result, index) => (
                      <ResultItem key={index} success={result.success}>
                        <FontAwesomeIcon
                          icon={result.success ? faCheck : faTimes}
                          style={{ color: result.success ? '#4caf50' : '#f44336' }}
                        />
                        <span>{result.filename}</span>
                        {!result.success && (
                          <span style={{ color: '#f44336', fontSize: '0.9rem' }}>
                            - {result.error}
                          </span>
                        )}
                      </ResultItem>
                    ))}
                  </ResultsList>
                </ResultsSection>
              )}
            </UploadSection>
          </Section>
        </Page>
      </Layout>
    </>
  );
}

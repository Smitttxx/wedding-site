import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import dynamic from 'next/dynamic';

const PhotoGallery = dynamic(() => import('../../components/PhotoGallery'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '200px',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      Loading photos...
    </div>
  )
});
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

const UploadResultMessage = styled.div`
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

  &.partial {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: auto;
  flex-shrink: 0;
  
  &:hover {
    opacity: 0.7;
  }
`;

export default function PhotoGalleryPage() {
  const router = useRouter();
  const [uploadResult, setUploadResult] = useState(null);

  useEffect(() => {
    const { upload, count, success, total, failed, errors } = router.query;
    
    if (upload) {
      let message = '';
      let type = 'success';
      
      if (upload === 'success') {
        message = `🎉 Successfully uploaded ${count} photo${count !== '1' ? 's' : ''}!`;
        type = 'success';
      } else if (upload === 'partial') {
        message = `✅ Successfully uploaded ${success} of ${total} photos.\n\n❌ ${failed} photo${failed !== '1' ? 's' : ''} failed to upload.`;
        if (errors) {
          const errorList = errors.split('|').slice(0, 3);
          message += `\n\nFailed uploads:\n${errorList.join('\n')}`;
        }
        type = 'partial';
      } else if (upload === 'failed') {
        message = `❌ No photos were uploaded. All ${total} photo${total !== '1' ? 's' : ''} failed.`;
        if (errors) {
          const errorList = errors.split('|').slice(0, 3);
          message += `\n\nFailed uploads:\n${errorList.join('\n')}`;
        }
        type = 'error';
      }
      
      setUploadResult({ message, type });
      
      // Clear URL parameters after showing message
      const newUrl = new URL(window.location);
      newUrl.search = '';
      window.history.replaceState({}, '', newUrl);
    }
  }, [router.query]);

  const closeResult = () => {
    setUploadResult(null);
  };

  return (
    <>
      <NavBar />
      <Layout>
        <Page>
          <SectionHeading>Our Wedding Photos</SectionHeading>
          <Section>
            {uploadResult && (
              <UploadResultMessage className={uploadResult.type}>
                <div style={{ flexShrink: 0, marginTop: '0.1rem' }}>
                  <FontAwesomeIcon 
                    icon={
                      uploadResult.type === 'success' ? faCheckCircle :
                      uploadResult.type === 'error' ? faExclamationTriangle :
                      faExclamationTriangle
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  {uploadResult.message}
                </div>
                <CloseButton onClick={closeResult}>
                  <FontAwesomeIcon icon={faTimes} />
                </CloseButton>
              </UploadResultMessage>
            )}
            
            <TartanInfoBox>
              Thank you for capturing Joe and Laura&apos;s special day from your unique perspective - 
              every photo tells a story they&apos;ll cherish for a lifetime!
            </TartanInfoBox>

            <PhotoGallery isAdmin={false} />
          </Section>
        </Page>
      </Layout>
    </>
  );
} 
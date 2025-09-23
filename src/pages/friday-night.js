import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import { Page } from '../components/Page';
import { Section } from '../components/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCamera, 
  faChevronLeft, 
  faChevronRight, 
  faTimes, 
  faDownload,
  faUser,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const GalleryTitle = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;

const GallerySubtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-style: italic;

  @media (min-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 3rem;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }
`;

const PhotoItem = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    height: 280px;
    border-radius: 16px;
  }

  @media (min-width: 1024px) {
    height: 350px;
    border-radius: 20px;
  }

  @media (min-width: 1200px) {
    height: 400px;
  }
`;

const UploaderRibbon = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: linear-gradient(135deg, #0b3d2e, #062d21);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(11, 61, 46, 0.3);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -8px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 16px 0;
    border-color: transparent #062d21 transparent transparent;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -8px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 16px 8px;
    border-color: transparent transparent transparent #062d21;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  cursor: pointer;
  padding: 0.5rem;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const ModalClose = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  cursor: pointer;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 768px) {
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
`;

const ModalDownloadButton = styled.button`
  position: fixed;
  top: 20px;
  right: 80px;
  background: #d4af37;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #b8941f;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
    top: 15px;
    right: 15px;
  }
`;

const ModalNavigation = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const ModalPrevButton = styled(ModalNavigation)`
  left: 20px;

  @media (max-width: 768px) {
    left: 10px;
  }
`;

const ModalNextButton = styled(ModalNavigation)`
  right: 20px;

  @media (max-width: 768px) {
    right: 10px;
  }
`;

const ModalImageWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 80vh;
  max-width: 1200px;
  max-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const ModalUploaderRibbon = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #0b3d2e, #062d21);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(11, 61, 46, 0.3);
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 20px 0;
    border-color: transparent #062d21 transparent transparent;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 20px 10px;
    border-color: transparent transparent transparent #062d21;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.text};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

export default function FridayNightGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/friday-night-photos?limit=100');
        if (response.ok) {
          const data = await response.json();
          setPhotos(data.photos || []);
        }
      } catch (error) {
        console.error('Error fetching Friday night photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const openModal = (photo, index) => {
    setSelectedPhoto(photo);
    setSelectedPhotoIndex(index);
    setIsImageLoading(true);
    // Push state to history for back button handling
    window.history.pushState({ modal: true }, '');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setSelectedPhotoIndex(0);
    // Pop the state we pushed
    if (window.history.state?.modal) {
      window.history.back();
    }
    document.body.style.overflow = 'unset';
  };

  const navigatePhoto = (direction) => {
    const newIndex = selectedPhotoIndex + direction;
    if (newIndex >= 0 && newIndex < photos.length) {
      setIsImageLoading(true);
      setSelectedPhotoIndex(newIndex);
      setSelectedPhoto(photos[newIndex]);
    }
  };

  const handleDownloadPhoto = async (photo) => {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();

      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `friday-night-${photo.filename || 'photo'}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(photo.url, '_blank');
    }
  };

  // Handle back button
  useEffect(() => {
    const handlePopState = () => {
      if (selectedPhoto) {
        closeModal();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedPhoto]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;

      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigatePhoto(-1);
          break;
        case 'ArrowRight':
          navigatePhoto(1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, selectedPhotoIndex, photos.length]);

  if (loading) {
    return (
      <>
        <NavBar />
        <Layout>
          <Page>
            <Section>
              <LoadingContainer>
                <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '1rem' }} />
                Loading Friday night photos...
              </LoadingContainer>
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
            <GalleryContainer>
              <GalleryTitle>
                <FontAwesomeIcon icon={faCamera} style={{ marginRight: '0.5rem', fontSize: '0.8em' }} />
                Friday Night BBQ
              </GalleryTitle>
              <GallerySubtitle>
                The pre-wedding celebrations and all the laughs we shared
              </GallerySubtitle>

              {photos.length === 0 ? (
                <EmptyState>
                  <EmptyIcon>
                    <FontAwesomeIcon icon={faCamera} />
                  </EmptyIcon>
                  <h3>No Friday night photos yet</h3>
                  <p>Check back soon for photos from our pre-wedding celebrations!</p>
                </EmptyState>
              ) : (
                <PhotoGrid>
                  {photos.map((photo, index) => (
                    <PhotoItem
                      key={photo.id}
                      onClick={() => openModal(photo, index)}
                    >
                      <Image
                        src={photo.url}
                        alt={`Friday night photo - ${photo.filename}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      {photo.uploadedBy && (
                        <UploaderRibbon>
                          <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.6rem' }} />
                          {photo.uploadedBy}
                        </UploaderRibbon>
                      )}
                    </PhotoItem>
                  ))}
                </PhotoGrid>
              )}
            </GalleryContainer>
          </Section>
        </Page>
      </Layout>

      {selectedPhoto && (
        <Modal onClick={closeModal}>
          <ModalClose onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.2rem' }} />
          </ModalClose>
          
          <ModalDownloadButton 
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadPhoto(selectedPhoto);
            }}
            title="Download this photo"
          >
            <FontAwesomeIcon icon={faDownload} style={{ fontSize: '1rem' }} />
          </ModalDownloadButton>

          {selectedPhoto.uploadedBy && (
            <ModalUploaderRibbon>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.7rem' }} />
              {selectedPhoto.uploadedBy}
            </ModalUploaderRibbon>
          )}

          <ModalPrevButton 
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto(-1);
            }}
            disabled={isImageLoading || selectedPhotoIndex === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: '1rem' }} />
          </ModalPrevButton>

          <ModalNextButton 
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto(1);
            }}
            disabled={isImageLoading || selectedPhotoIndex === photos.length - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1rem' }} />
          </ModalNextButton>
          
          <ModalImageWrapper onClick={(e) => e.stopPropagation()}>
            {isImageLoading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.2)'
              }}>
                <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '1.5rem', color: '#fff' }} />
              </div>
            )}
            <Image
              src={selectedPhoto.url}
              alt={`Friday night photo - ${selectedPhoto.filename}`}
              fill
              style={{ objectFit: 'contain' }}
              onLoadingComplete={() => setIsImageLoading(false)}
            />
          </ModalImageWrapper>
        </Modal>
      )}
    </>
  );
}

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUser, faCalendar, faSpinner, faUpload, faChevronLeft, faChevronRight, faTrash, faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';

const GalleryContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 768px) {
    max-width: 1200px;
    padding: 2rem;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin: 1rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
`;

const PhotoCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 768px) {
    aspect-ratio: auto;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
  }
`;

const PhotoImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PhotoInfo = styled.div`
  padding: 0.75rem;
  
  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const PhotoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  margin-bottom: 0.25rem;
  
  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const PhotoDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  
  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

const UploadButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: background 0.2s ease;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  justify-content: center;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 768px) {
    width: auto;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(220, 53, 69, 1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 768px) {
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  
  @media (min-width: 768px) {
    padding: 3rem;
    font-size: 1.2rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 4rem;
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
  z-index: 1000;
  cursor: pointer;
  padding: 0.5rem;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

const ModalImage = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  z-index: 1001;
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

const ModalImageWrapper = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  
  @media (min-width: 768px) {
    gap: 1rem;
    margin: 2rem 0;
  }
`;

const PaginationButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 44px;
  font-size: 1rem;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.primary};
    color: white;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background: #ccc;
    border-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    min-width: 40px;
    font-size: 0.9rem;
  }
`;

const PaginationInfo = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textLight || '#666'};
  font-size: 0.9rem;
  margin: 1rem 0;
  
  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin: 1rem 0;
  }
`;

const AdminNotice = styled.div`
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ffeaa7;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }
`;

const ModalInstructions = styled.div`
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  z-index: 1001;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    bottom: 20px;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
`;

const MobileOptimizedHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const QuickUploadButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.accent};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.2s ease;
  margin: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PhotoCount = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  margin: 1rem 0;
  display: inline-block;
`;

export default function PhotoGallery({ isAdmin = false }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [deletingPhoto, setDeletingPhoto] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPhotos: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 20
  });

  useEffect(() => {
    fetchPhotos(1);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto]);

  const fetchPhotos = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/photos?page=${page}&limit=20`);
      const data = await response.json();

      if (response.ok) {
        setPhotos(data.photos);
        setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to load photos');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to load photos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchPhotos(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePhoto = async (photoId, e) => {
    e.stopPropagation(); // Prevent opening the modal
    
    if (!confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      return;
    }

    setDeletingPhoto(photoId);

    try {
      const response = await fetch(`/api/delete-photo?photoId=${photoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the photo from the current page
        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
        
        // Refresh the current page to update pagination
        fetchPhotos(pagination.currentPage);
      } else {
        const error = await response.json();
        alert(`Failed to delete photo: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo. Please try again.');
    } finally {
      setDeletingPhoto(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 3; // Reduced for mobile
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <PaginationButton
        key="prev"
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={!pagination.hasPrevPage}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </PaginationButton>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          active={i === pagination.currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    // Next button
    pages.push(
      <PaginationButton
        key="next"
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={!pagination.hasNextPage}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </PaginationButton>
    );

    return pages;
  };

  return (
    <>
      <GalleryContainer>
        {isAdmin && (
          <AdminNotice>
            ⚠️ ADMIN MODE - You can delete photos here
          </AdminNotice>
        )}

        <MobileOptimizedHeader>
          <UploadButton href="/photos/upload">
            <FontAwesomeIcon icon={faUpload} />
            📸 Share Your Photos
          </UploadButton>
          
          {photos.length > 0 && (
            <PhotoCount>
              <FontAwesomeIcon icon={faHeart} style={{ marginRight: '0.5rem' }} />
              {pagination.totalPhotos} Memories Shared
            </PhotoCount>
          )}
          
          <QuickUploadButton href="/photos/upload">
            <FontAwesomeIcon icon={faCamera} />
            Quick Upload
          </QuickUploadButton>
        </MobileOptimizedHeader>

        {loading && (
          <LoadingContainer>
            <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '0.5rem' }} />
            Loading memories...
          </LoadingContainer>
        )}

        {error && (
          <EmptyState>
            <EmptyIcon>
              <FontAwesomeIcon icon={faCamera} />
            </EmptyIcon>
            <p>Error loading photos: {error}</p>
          </EmptyState>
        )}

        {!loading && !error && photos.length === 0 && (
          <EmptyState>
            <EmptyIcon>
              <FontAwesomeIcon icon={faCamera} />
            </EmptyIcon>
            <p>No photos shared yet!</p>
            <p>Be the first to capture the magic! 📸</p>
          </EmptyState>
        )}

        {!loading && !error && photos.length > 0 && (
          <>
            <PaginationInfo>
              Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalPhotos} total photos
            </PaginationInfo>
            
            <PhotoGrid>
              {photos.map((photo) => (
                <PhotoCard key={photo.id} onClick={() => setSelectedPhoto(photo)}>
                  <PhotoImage>
                    <Image
                      src={photo.url}
                      alt="Wedding photo"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      priority={photos.indexOf(photo) < 6} // Prioritize first 6 images
                    />
                    {isAdmin && (
                      <DeleteButton 
                        onClick={(e) => handleDeletePhoto(photo.id, e)}
                        disabled={deletingPhoto === photo.id}
                      >
                        {deletingPhoto === photo.id ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          <FontAwesomeIcon icon={faTrash} />
                        )}
                      </DeleteButton>
                    )}
                  </PhotoImage>
                  <PhotoInfo>
                    {photo.uploadedBy && (
                      <PhotoMeta>
                        <FontAwesomeIcon icon={faUser} />
                        {photo.uploadedBy}
                      </PhotoMeta>
                    )}
                    <PhotoDate>
                      <FontAwesomeIcon icon={faCalendar} />
                      {formatDate(photo.uploadedAt)}
                    </PhotoDate>
                  </PhotoInfo>
                </PhotoCard>
              ))}
            </PhotoGrid>

            <PaginationContainer>
              {renderPagination()}
            </PaginationContainer>
          </>
        )}
      </GalleryContainer>

      {selectedPhoto && (
        <Modal onClick={() => setSelectedPhoto(null)}>
          <ModalClose onClick={() => setSelectedPhoto(null)}>
            <FontAwesomeIcon icon={faTimes} />
          </ModalClose>
          
          <ModalImageWrapper onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedPhoto.url}
              alt="Wedding photo"
              width={800}
              height={600}
              style={{ 
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto'
              }}
              priority
            />
          </ModalImageWrapper>

          <ModalInstructions>
            Tap outside or press ESC to close
          </ModalInstructions>
        </Modal>
      )}
    </>
  );
} 
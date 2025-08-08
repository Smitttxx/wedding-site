import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import Layout from '../../components/Layout';
import NavBar from '../../components/NavBar';
import { Page } from '../../components/Page';
import { Section, SectionHeading } from '../../components/Section';
import { TartanInfoBox } from '../../components/TartanInfoBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUser, faCalendar, faSpinner, faUpload, faChevronLeft, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const PhotoCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const PhotoImage = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
`;

const PhotoInfo = styled.div`
  padding: 1rem;
`;

const PhotoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  margin-bottom: 0.5rem;
`;

const PhotoDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight || '#666'};
`;

const UploadButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s ease;
  margin: 1rem 0;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textLight || '#666'};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.textLight || '#666'};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
`;

const Modal = styled.div`
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
  cursor: pointer;
`;

const ModalImage = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1001;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.primary};
    color: white;
  }

  &:disabled {
    background: #ccc;
    border-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textLight || '#666'};
  font-size: 0.9rem;
  margin: 1rem 0;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(220, 53, 69, 1);
  }
`;

export default function PhotoGallery() {
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
    const maxVisiblePages = 5;
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
      <NavBar />
      <Layout>
        <Page>
          <Section>
            <SectionHeading>Wedding Photos</SectionHeading>
            
            <TartanInfoBox>
              📸 Relive the magic of Laura & Joe's special day through your shared memories!
            </TartanInfoBox>

            <GalleryContainer>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <UploadButton href="/photos/upload">
                  <FontAwesomeIcon icon={faUpload} />
                  Upload Your Photos
                </UploadButton>
              </div>

              {loading && (
                <LoadingContainer>
                  <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '0.5rem' }} />
                  Loading photos...
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
                  <p>No photos uploaded yet!</p>
                  <p>Be the first to share your memories from the wedding.</p>
                </EmptyState>
              )}

              {!loading && !error && photos.length > 0 && (
                <>
                  <PaginationInfo>
                    Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalPhotos)} of {pagination.totalPhotos} photos
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
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
          </Section>
        </Page>
      </Layout>

      {selectedPhoto && (
        <Modal onClick={() => setSelectedPhoto(null)}>
          <ModalClose onClick={() => setSelectedPhoto(null)}>×</ModalClose>
          <ModalImage onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedPhoto.url}
              alt="Wedding photo"
              width={800}
              height={600}
              style={{ objectFit: 'contain' }}
            />
          </ModalImage>
        </Modal>
      )}
    </>
  );
} 
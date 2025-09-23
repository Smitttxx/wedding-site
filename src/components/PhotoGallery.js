import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUser, faCalendar, faSpinner, faUpload, faChevronLeft, faChevronRight, faTrash, faTimes, faHeart, faImages, faDownload } from '@fortawesome/free-solid-svg-icons';

const GalleryContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0.5rem;
  
  @media (min-width: 768px) {
    max-width: 1200px;
    padding: 2rem;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin: 0.75rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin: 2rem 0;
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

const PhotoCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;
  height: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 768px) {
    height: 280px;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
  }

  @media (min-width: 1024px) {
    height: 350px;
  }

  @media (min-width: 1200px) {
    height: 400px;
  }
`;

const PhotoImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PhotoInfo = styled.div`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  
  @media (min-width: 768px) {
    padding: 1rem;
    background: white;
    backdrop-filter: none;
  }
`;

const PhotoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text || '#333'};
  margin-bottom: 0.25rem;
  font-weight: 600;
  
  @media (min-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${props => props.theme.colors.textLight || '#666'};
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
  padding: 2rem 0.5rem;
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  
  @media (min-width: 768px) {
    padding: 3rem;
    font-size: 1.2rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 1.5rem 0.5rem;
  color: ${props => props.theme.colors.textLight || '#666'};
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 0.75rem;
  
  @media (min-width: 768px) {
    font-size: 4rem;
    margin-bottom: 1rem;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
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
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  font-size: 0.9rem;

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
  font-size: 0.85rem;
  margin: 0.75rem 0;
  
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

const DownloadAllButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin: 1rem 0.5rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

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
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

const ModalInstructions = styled.div`
  position: fixed;
  bottom: 15px;
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

const ModalNavigation = styled.div`
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

const ModalPhotoInfo = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  right: 160px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  z-index: 1001;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    top: 20px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    max-width: 400px;
  }
`;

const ModalPhotoMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.8rem;
  }
`;

const ModalPhotoCounter = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  font-weight: 500;
`;

const UploaderRibbon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
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

const GalleryUploaderRibbon = styled.div`
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
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.2;

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

const MobileOptimizedHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const PhotoCount = styled.div`
  background: rgba(255, 255, 255, 0.9);
  color: ${props => props.theme.colors.text};
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0.75rem 0;
  display: inline-block;
  border: 1px solid rgba(212, 175, 55, 0.3);
  text-align: center;
  min-width: 180px;
  
  @media (min-width: 768px) {
    min-width: 250px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    margin: 1rem 0;
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
`;

const PersonalMessageSubtext = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  font-style: italic;
`;

const SearchContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1rem;
  margin: 0.75rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid ${props => props.theme.colors.primary};
  position: relative;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
    margin: 1rem 0;
  }
`;

const SearchTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
    text-align: left;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(11, 61, 46, 0.1);
  }
  
  &::placeholder {
    color: #999;
    font-style: italic;
  }
  
  @media (min-width: 768px) {
    min-width: 250px;
  }
`;


const ClearButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  
  &:hover {
    background: #5a6268;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid ${props => props.theme.colors.primary};
  border-top: none;
  border-radius: 0 0 12px 12px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: -2px;
  transform: translateY(0);
`;

const SuggestionItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const SearchStats = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(11, 61, 46, 0.05);
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterTag = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

export default function PhotoGallery({ isAdmin = false }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [deletingPhoto, setDeletingPhoto] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPhotos: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 50
  });
  const [uploaderQuery, setUploaderQuery] = useState('');
  const [availableUploaders, setAvailableUploaders] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    fetchPhotos(1);
  }, [fetchPhotos]);

  // Infinite scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      if (loadingMore || !pagination.hasNextPage) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.offsetHeight;
      
      // Load more when user is 200px from bottom
      if (scrollTop + windowHeight >= docHeight - 200) {
        fetchPhotos(pagination.currentPage + 1, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pagination.currentPage, pagination.hasNextPage, loadingMore, fetchPhotos]);

  // Handle modal navigation and back button
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedPhoto) {
        closeModal();
      }
    };

    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      
      if (e.key === 'ArrowLeft') {
        navigatePhoto(-1);
      } else if (e.key === 'ArrowRight') {
        navigatePhoto(1);
      }
    };

    const handlePopState = (e) => {
      if (selectedPhoto) {
        e.preventDefault();
        closeModal();
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('popstate', handlePopState);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Push state to handle back button
      window.history.pushState({ modal: true }, '');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto, selectedPhotoIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeModal = () => {
    setSelectedPhoto(null);
    setSelectedPhotoIndex(0);
    // Just close the modal without any history navigation
    // This prevents going back to homepage
    document.body.style.overflow = 'unset';
  };

  const navigatePhoto = (direction) => {
    const newIndex = selectedPhotoIndex + direction;
    if (newIndex >= 0 && newIndex < photos.length) {
      setSelectedPhotoIndex(newIndex);
      setSelectedPhoto(photos[newIndex]);
    }
  };

  // Touch handling for swipe navigation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedPhotoIndex < photos.length - 1) {
      navigatePhoto(1);
    }
    if (isRightSwipe && selectedPhotoIndex > 0) {
      navigatePhoto(-1);
    }
  };

  const handleDownloadPhoto = async (photo) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(photo.url);
      const blob = await response.blob();
      
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `laura-joe-wedding-${photo.filename || 'photo'}.jpg`;
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(photo.url, '_blank');
    }
  };

  const fetchPhotos = useCallback(async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      const params = new URLSearchParams({
        page: String(page),
        limit: String(50),
        ...(uploaderQuery ? { uploader: uploaderQuery } : {}),
      });
      const response = await fetch(`/api/photos?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        if (append) {
          setPhotos(prev => [...prev, ...data.photos]);
        } else {
          setPhotos(data.photos);
        }
        setPagination(data.pagination);
        if (Array.isArray(data.uploaders)) {
          setAvailableUploaders(data.uploaders);
        }
      } else {
        setError(data.error || 'Failed to load photos');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to load photos. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [uploaderQuery]);

  const handlePageChange = (page) => {
    fetchPhotos(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchAllPhotos = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(50),
      });
      const response = await fetch(`/api/photos?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setPhotos(data.photos);
        setPagination(data.pagination);
        setAvailableUploaders(data.uploaders || []);
      } else {
        setError(data.error || 'Failed to fetch photos');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to fetch photos');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearUploaderFilter = () => {
    setUploaderQuery('');
    setShowSuggestions(false);
    setPhotos([]);
    setPagination({ currentPage: 1, totalPages: 0, totalPhotos: 0, hasNextPage: false, hasPrevPage: false, limit: 50 });
    fetchAllPhotos(1);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setUploaderQuery(value);
    
    if (value.length > 0) {
      const filtered = availableUploaders.filter(uploader =>
        uploader.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (uploader) => {
    setUploaderQuery(uploader);
    setShowSuggestions(false);
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


  const isGifUrl = (url) => /\.gif(\?|$)/i.test(url || '');

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
            <FontAwesomeIcon icon={faUpload} style={{ fontSize: '0.9rem' }} />
            <FontAwesomeIcon icon={faImages} style={{ fontSize: '0.9rem' }} />
            Quick Upload
          </UploadButton>

          <SearchContainer>
            <SearchTitle>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '1rem' }} />
              Find Photos by Uploader
            </SearchTitle>
            
            <SearchInputContainer>
              <SearchInput
                type="text"
                placeholder="Type a name to search..."
                value={uploaderQuery}
                onChange={handleSearchInputChange}
                onFocus={() => {
                  if (uploaderQuery.length > 0) {
                    setShowSuggestions(true);
                    // Scroll suggestions into view
                    setTimeout(() => {
                      const suggestions = document.querySelector('[data-suggestions]');
                      if (suggestions) {
                        suggestions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }
                    }, 100);
                  }
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {uploaderQuery && (
                <ClearButton type="button" onClick={clearUploaderFilter}>
                  <FontAwesomeIcon icon={faTimes} style={{ fontSize: '0.8rem' }} />
                  Clear
                </ClearButton>
              )}
              
              {showSuggestions && filteredSuggestions.length > 0 && (
                <SuggestionsContainer data-suggestions>
                  {filteredSuggestions.map((uploader, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() => selectSuggestion(uploader)}
                    >
                      <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.8rem' }} />
                      {uploader}
                    </SuggestionItem>
                  ))}
                </SuggestionsContainer>
              )}
            </SearchInputContainer>

            {!showSuggestions && (
              <SearchStats>
                <span>
                  {uploaderQuery ? `Showing photos by "${uploaderQuery}"` : 'All photos'}
                </span>
                {uploaderQuery && (
                  <FilterTag>
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.7rem' }} />
                    Filtered
                  </FilterTag>
                )}
                <span>•</span>
                <span>{pagination.totalPhotos} memories</span>
                {availableUploaders.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{availableUploaders.length} contributors</span>
                  </>
                )}
              </SearchStats>
            )}
          </SearchContainer>

          {photos.length > 0 && (
            <PhotoCount>
              <FontAwesomeIcon icon={faHeart} style={{ marginRight: '0.5rem', color: '#d4af37', fontSize: '0.8rem' }} />
              {pagination.totalPhotos} Memories Shared
            </PhotoCount>
          )}
        </MobileOptimizedHeader>

        {loading && (
          <LoadingContainer>
            <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '0.5rem', fontSize: '1rem' }} />
            Loading memories...
          </LoadingContainer>
        )}

        {error && (
          <EmptyState>
            <EmptyIcon>
              <FontAwesomeIcon icon={faCamera} style={{ fontSize: '2.5rem' }} />
            </EmptyIcon>
            <p>Error loading photos: {error}</p>
          </EmptyState>
        )}

        {!loading && !error && photos.length === 0 && (
          <EmptyState>
            <EmptyIcon>
              <FontAwesomeIcon icon={faCamera} style={{ fontSize: '2.5rem' }} />
            </EmptyIcon>
            <p>No photos shared yet!</p>
            <p>Be the first to capture the magic! 📸</p>
          </EmptyState>
        )}

        {!loading && !error && photos.length > 0 && (
          <>
            <PaginationInfo>
              {pagination.totalPhotos} total photos
            </PaginationInfo>
            
            <PhotoGrid>
              {photos.map((photo, index) => (
                <PhotoCard key={photo.id} onClick={() => {
                  setSelectedPhoto(photo);
                  setSelectedPhotoIndex(index);
                  setIsImageLoading(true);
                }}>
                  <PhotoImage>
                    <Image
                      src={photo.url}
                      alt="Wedding photo"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      unoptimized={isGifUrl(photo.url)}
                    />
                    {photo.uploadedBy && (
                      <GalleryUploaderRibbon>
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.6rem' }} />
                        {photo.uploadedBy}
                      </GalleryUploaderRibbon>
                    )}
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
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.8rem' }} />
                        {photo.uploadedBy}
                      </PhotoMeta>
                    )}
                    <PhotoDate>
                      <FontAwesomeIcon icon={faCalendar} style={{ fontSize: '0.8rem' }} />
                      {formatDate(photo.uploadedAt)}
                    </PhotoDate>
                  </PhotoInfo>
                </PhotoCard>
              ))}
            </PhotoGrid>

            {loadingMore && (
              <LoadingContainer>
                <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '0.5rem', fontSize: '1rem' }} />
                Loading more photos...
              </LoadingContainer>
            )}

            {!pagination.hasNextPage && photos.length > 0 && (
              <LoadingContainer>
                <FontAwesomeIcon icon={faHeart} style={{ marginRight: '0.5rem', color: '#d4af37', fontSize: '0.8rem' }} />
                You&apos;ve reached the end! All {pagination.totalPhotos} photos loaded.
              </LoadingContainer>
            )}
          </>
        )}
      </GalleryContainer>

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
            <UploaderRibbon>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '0.7rem' }} />
              {selectedPhoto.uploadedBy}
              <ModalPhotoCounter>
              {selectedPhotoIndex + 1} of {photos.length}
            </ModalPhotoCounter>
            </UploaderRibbon>
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
          
          <ModalImageWrapper 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
              alt="Wedding photo"
              fill
              style={{ 
                objectFit: 'contain'
              }}
              unoptimized={isGifUrl(selectedPhoto.url)}
              onLoadingComplete={() => setIsImageLoading(false)}
            />
          </ModalImageWrapper>

          <ModalInstructions>
            Swipe or use arrow keys to navigate • Download button in top right • Tap here or press ESC to close
          </ModalInstructions>
        </Modal>
      )}
    </>
  );
} 
type Season = 'estate' | 'inverno' | 'all';
type MediaType = 'image' | 'video';

interface BaseMediaItem {
  id: number;
  title: string;
  type: MediaType;
  category: string;
  season: Season;
  src: string;
  thumbnail: string;
}

interface ImageMediaItem extends BaseMediaItem {
  type: 'image';
  category: 'foto';
  season: Exclude<Season, 'all'>;
}

interface VideoMediaItem extends BaseMediaItem {
  type: 'video';
  category: 'video';
  season: 'all';
}

type MediaItem = ImageMediaItem | VideoMediaItem;

export function createMediaGallery() {
  const gallery = document.createElement('section');
  gallery.className = 'media-gallery';
  gallery.id = 'media';
  
  // YouTube videos
  const youtubeVideos: VideoMediaItem[] = [
    {
      id: 1,
      type: 'video',
      src: 'https://www.youtube.com/embed/VIDEO_ID_1',
      thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_1/maxresdefault.jpg',
      title: 'Duo Mazzola Live Performance',
      category: 'video',
      season: 'all'
    },
    {
      id: 2,
      type: 'video',
      src: 'https://www.youtube.com/embed/VIDEO_ID_2',
      thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_2/maxresdefault.jpg',
      title: 'Duo Mazzola in Concerto',
      category: 'video',
      season: 'all'
    }
  ];

  // Estate Materiale images
  const estateImages: ImageMediaItem[] = [
    {
      id: 3,
      type: 'image',
      src: './img/Estate Materiale/Duo Mazzola estate 1.jpg',
      thumbnail: './img/Estate Materiale/Duo Mazzola estate 1.jpg',
      title: 'Duo Mazzola Estate 1',
      category: 'foto',
      season: 'estate'
    },
    {
      id: 4,
      type: 'image',
      src: './img/Estate Materiale/Duo Mazzola estate 2.jpg',
      thumbnail: './img/Estate Materiale/Duo Mazzola estate 2.jpg',
      title: 'Duo Mazzola Estate 2',
      category: 'foto',
      season: 'estate'
    },
    {
      id: 5,
      type: 'image',
      src: './img/Estate Materiale/Duo Mazzola estate 3.jpg',
      thumbnail: './img/Estate Materiale/Duo Mazzola estate 3.jpg',
      title: 'Duo Mazzola Estate 3',
      category: 'foto',
      season: 'estate'
    },
    {
      id: 6,
      type: 'image',
      src: './img/Estate Materiale/Duo Mazzola estate 4.png',
      thumbnail: './img/Estate Materiale/Duo Mazzola estate 4.png',
      title: 'Duo Mazzola Estate 4',
      category: 'foto',
      season: 'estate'
    },
    {
      id: 7,
      type: 'image',
      src: './img/Estate Materiale/Duo Mazzola estate 5.jpg',
      thumbnail: './img/Estate Materiale/Duo Mazzola estate 5.jpg',
      title: 'Duo Mazzola Estate 5',
      category: 'foto',
      season: 'estate'
    },
    {
      id: 8,
      type: 'image',
      src: './img/Estate Materiale/Duo Mazzola estate 6.jpg',
      thumbnail: './img/Estate Materiale/Duo Mazzola estate 6.jpg',
      title: 'Duo Mazzola Estate 6',
      category: 'foto',
      season: 'estate'
    }
  ];

  // Inverno Materiale images
  const invernoImages: ImageMediaItem[] = [
    {
      id: 10,
      type: 'image',
      src: './img/Inverno Materiale/Duo Mazzola - Natale 2.jpg',
      thumbnail: './img/Inverno Materiale/Duo Mazzola - Natale 2.jpg',
      title: 'Duo Mazzola Natale 2',
      category: 'foto',
      season: 'inverno'
    },
    {
      id: 11,
      type: 'image',
      src: './img/Inverno Materiale/Duo Mazzola - Natale 4.jpg',
      thumbnail: './img/Inverno Materiale/Duo Mazzola - Natale 4.jpg',
      title: 'Duo Mazzola Natale 4',
      category: 'foto',
      season: 'inverno'
    },
    {
      id: 12,
      type: 'image',
      src: './img/Inverno Materiale/Duo Mazzola foto.png',
      thumbnail: './img/Inverno Materiale/Duo Mazzola foto.png',
      title: 'Duo Mazzola Inverno',
      category: 'foto',
      season: 'inverno'
    }
  ];

  // Combine all media
  const mediaData: MediaItem[] = [...youtubeVideos, ...estateImages, ...invernoImages];

  gallery.innerHTML = /*html*/`
    <div class="container">
      <h2 class="section-title">Media</h2>
      
      <div class="gallery-filters">
        <div class="filter-buttons">
          <button class="filter-btn active" data-filter="all">Tutti</button>
          <button class="filter-btn" data-filter="foto">Foto</button>
          <button class="filter-btn" data-filter="video">Video</button>
        </div>
        <div class="season-filters">
          <button class="season-btn active" data-season="all">Tutte</button>
          <button class="season-btn" data-season="estate">Estate</button>
          <button class="season-btn" data-season="inverno">Inverno</button>
        </div>
      </div>
      
      <div class="gallery-grid">
        ${mediaData.map(item => `
          <div class="gallery-item ${item.category}" data-category="${item.category}" data-season="${item.season}">
            <div class="gallery-item-inner">
              ${item.type === 'image' ? `
                <img src="${item.thumbnail}" alt="${item.title}" class="gallery-img" />
                <div class="gallery-overlay">
                  <div class="gallery-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
              ` : `
                <div class="video-thumbnail">
                  <img src="${item.thumbnail}" alt="${item.title}" class="gallery-img" />
                  <div class="play-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              `}
              <div class="gallery-caption">
                <h4>${item.title}</h4>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="gallery-modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div class="modal-body"></div>
        </div>
      </div>
    </div>
  `;

  // Filter functionality
  const filterButtons = gallery.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const seasonButtons = gallery.querySelectorAll<HTMLButtonElement>('.season-btn');
  const galleryItems = gallery.querySelectorAll<HTMLElement>('.gallery-item');
  
  let currentFilter = 'all';
  let currentSeason = 'all';
  
  const updateFilters = () => {
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const season = item.getAttribute('data-season');
      const categoryMatch = currentFilter === 'all' || category === currentFilter;
      const seasonMatch = currentSeason === 'all' || season === currentSeason;
      
      if (categoryMatch && seasonMatch) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      currentFilter = button.getAttribute('data-filter') || 'all';
      updateFilters();
    });
  });
  
  seasonButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active season button
      seasonButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      currentSeason = button.getAttribute('data-season') || 'all';
      updateFilters();
    });
  });
  
  // Modal functionality
  const modal = gallery.querySelector<HTMLElement>('.gallery-modal');
  const modalContent = gallery.querySelector<HTMLElement>('.modal-body');
  const closeModal = gallery.querySelector<HTMLElement>('.close-modal');
  
  if (!modal || !modalContent || !closeModal) {
    console.error('Could not find modal elements');
    return gallery;
  }
  
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const mediaItem = mediaData[index];
      
      if (mediaItem.type === 'image') {
        modalContent.innerHTML = /*html*/`
          <img src="${mediaItem.src}" alt="${mediaItem.title}" class="modal-media" />
          <div class="modal-caption">
            <h3>${mediaItem.title}</h3>
          </div>
        `;
      } else {
        modalContent.innerHTML = /*html*/`
          <div class="video-container">
            <iframe 
              src="${mediaItem.src}?autoplay=1" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="modal-caption">
            <h3>${mediaItem.title}</h3>
          </div>
        `;
      }
      
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalContent.innerHTML = '';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      modalContent.innerHTML = '';
    }
  });

  return gallery;
}

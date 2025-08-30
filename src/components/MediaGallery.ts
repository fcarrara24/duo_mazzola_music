interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  category: string;
}

export function createMediaGallery() {
  const gallery = document.createElement('section');
  gallery.className = 'media-gallery';
  gallery.id = 'media';
  
  // Sample media data - replace with actual media
  const mediaData: MediaItem[] = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      title: 'Concerto al Teatro',
      category: 'foto'
    },
    {
      id: 2,
      type: 'video',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      title: 'Esecuzione dal vivo',
      category: 'video'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1514525252781-ee6733f2f52d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1514525252781-ee6733f2f52d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      title: 'Prova in sala',
      category: 'foto'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      title: 'Concerto all\'aperto',
      category: 'foto'
    },
    {
      id: 5,
      type: 'video',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      title: 'Intervista',
      category: 'video'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      title: 'Backstage',
      category: 'foto'
    }
  ];

  gallery.innerHTML = `
    <div class="container">
      <h2 class="section-title">Media</h2>
      
      <div class="gallery-filters">
        <button class="filter-btn active" data-filter="all">Tutti</button>
        <button class="filter-btn" data-filter="foto">Foto</button>
        <button class="filter-btn" data-filter="video">Video</button>
      </div>
      
      <div class="gallery-grid">
        ${mediaData.map(item => `
          <div class="gallery-item ${item.category}" data-category="${item.category}">
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
  const galleryItems = gallery.querySelectorAll<HTMLElement>('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      // Filter items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
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
        modalContent.innerHTML = `
          <img src="${mediaItem.src}" alt="${mediaItem.title}" class="modal-media" />
          <div class="modal-caption">
            <h3>${mediaItem.title}</h3>
          </div>
        `;
      } else {
        modalContent.innerHTML = `
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

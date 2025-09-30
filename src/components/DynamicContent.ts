interface RecordDB {
  TIPO: "FOTO" | "VIDEO" | "POST_INSTAGRAM" | "URL" | "DATO";
  TITOLO: string;
  DESCRIZIONE: string;
  URL: string;
  DATA_INSERIMENTO?: string;
  CATEGORIE?: string;
  ORDINE?: number;
}

interface DynamicContentOptions {
  containerId: string;
  itemsPerPage?: number;
  showCategories?: boolean;
  showDates?: boolean;
}

class DynamicContent {
  private container: HTMLElement;
  private options: DynamicContentOptions;
  private records: RecordDB[] = [];
  private currentPage: number = 1;
  private filteredRecords: RecordDB[] = [];
  private currentFilter: string = 'all';

  constructor(options: DynamicContentOptions) {
    this.options = {
      itemsPerPage: 9,
      showCategories: true,
      showDates: true,
      ...options
    };

    const container = document.getElementById(this.options.containerId);
    if (!container) {
      throw new Error(`Container with id "${this.options.containerId}" not found`);
    }
    this.container = container;

    this.init();
  }

  private async init(): Promise<void> {
    try {
      this.showLoading();
      await this.loadData();
      this.render();
    } catch (error) {
      this.showError('Errore nel caricamento dei contenuti');
      console.error('Error initializing DynamicContent:', error);
    }
  }

  private async loadData(): Promise<void> {
    try {
      // Using dynamic import to fetch data from sheetDb
      const { getDati } = await import('./../api/sheetDb');
      const data = await getDati();
      
      this.records = data.sort((a, b) => 
        (a.ORDINE || 0) - (b.ORDINE || 0) || 
        ((b.DATA_INSERIMENTO || '') > (a.DATA_INSERIMENTO || '') ? 1 : -1)
      );
      
      this.filteredRecords = [...this.records];
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }

  private render(): void {
    if (this.records.length === 0) {
      this.container.innerHTML = '<div class="no-content">Nessun contenuto disponibile</div>';
      return;
    }

    const start = (this.currentPage - 1) * (this.options.itemsPerPage || 12);
    const end = start + (this.options.itemsPerPage || 12);
    const itemsToShow = this.filteredRecords.slice(start, end);

    const cardsHtml = itemsToShow.map(item => this.createCardHtml(item)).join('');
    
    let html = `
      <div class="gallery-container">
        <div class="gallery-filters">
          ${this.createFiltersHtml()}
        </div>
        <div class="gallery-grid">
          ${cardsHtml}
        </div>
        ${this.createPaginationHtml()}
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  private createCardHtml(record: RecordDB): string {
    const mediaHtml = this.createMediaHtml(record);
    
    const dateHtml = this.options.showDates && record.DATA_INSERIMENTO ? `
      <div class="card-footer">
        <span class="date">
          ${new Date(record.DATA_INSERIMENTO).toLocaleDateString('it-IT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </span>
      </div>
    ` : '';

    return `
      <div class="gallery-item ${record.TIPO.toLowerCase()}" data-type="${record.TIPO.toLowerCase()}">
        <div class="gallery-item-inner">
          <div class="media-container">
            ${mediaHtml}
            <div class="overlay">
              <h3 class="item-title">${this.escapeHtml(record.TITOLO)}</h3>
              ${record.DESCRIZIONE ? `<p class="item-description">${this.escapeHtml(record.DESCRIZIONE)}</p>` : ''}
              ${dateHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private createMediaHtml(record: RecordDB): string {
    switch (record.TIPO) {
      case 'FOTO':
        return `
          <div class="media-wrapper">
            <img 
              src="${this.escapeHtml(record.URL)}" 
              alt="${this.escapeHtml(record.TITOLO)}" 
              loading="lazy"
              class="media-content"
            />
            <div class="media-placeholder"></div>
          </div>`;
      case 'VIDEO':
        return `
          <div class="media-wrapper video-wrapper">
            <video class="media-content" controls>
              <source src="${this.escapeHtml(record.URL)}" type="video/mp4" />
              Il tuo browser non supporta il tag video.
            </video>
            <div class="play-icon">▶</div>
          </div>
        `;
      case 'POST_INSTAGRAM':
        const postId = record.URL.split('/').pop();
        return `
          <div class="media-wrapper instagram-wrapper">
            <iframe
              src="https://www.instagram.com/p/${postId}/embed"
              title="${this.escapeHtml(record.TITOLO)}"
              class="media-content"
              frameborder="0"
              allowfullscreen>
            </iframe>
          </div>
        `;
      case 'URL':
        return `
          <a href="${this.escapeHtml(record.URL)}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="external-link">
            <div class="media-wrapper">
              <div class="media-content url-content">
                <span class="link-icon">🔗</span>
                <span class="link-text">${this.escapeHtml(record.URL)}</span>
              </div>
            </div>
          </a>
        `;
      default:
        return '';
    }
  }

  private createFiltersHtml(): string {
    if (!this.options.showCategories) return '';
    
    const categories = new Set<string>();
    this.records.forEach(record => {
      if (record.CATEGORIE) {
        record.CATEGORIE.split(',').forEach(cat => categories.add(cat.trim()));
      }
    });

    if (categories.size === 0) return '';

    const categoryList = Array.from(categories).sort();
    
    return `
      <div class="filters">
        <button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">Tutti</button>
        ${categoryList.map(cat => `
          <button class="filter-btn ${this.currentFilter === cat ? 'active' : ''}" data-filter="${this.escapeHtml(cat)}">
            ${this.escapeHtml(cat)}
          </button>
        `).join('')}
      </div>
    `;
  }

  private createPaginationHtml(): string {
    const totalPages = Math.ceil(this.filteredRecords.length / (this.options.itemsPerPage || 9));
    if (totalPages <= 1) return '';

    let paginationHtml = '<div class="pagination">';
    
    if (this.currentPage > 1) {
      paginationHtml += `
        <button class="page-btn" data-page="${this.currentPage - 1}">
          &laquo; Precedente
        </button>
      `;
    }

    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      paginationHtml += `
        <button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    if (this.currentPage < totalPages) {
      paginationHtml += `
        <button class="page-btn" data-page="${this.currentPage + 1}">
          Successivo &raquo;
        </button>
      `;
    }

    paginationHtml += '</div>';
    return paginationHtml;
  }

  private attachEventListeners(): void {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = (e.target as HTMLElement).dataset.filter || 'all';
        this.currentFilter = filter;
        this.currentPage = 1;
        
        if (filter === 'all') {
          this.filteredRecords = [...this.records];
        } else {
          this.filteredRecords = this.records.filter(record => 
            record.CATEGORIE && record.CATEGORIE.split(',').map(c => c.trim()).includes(filter)
          );
        }
        
        this.render();
      });
    });

    // Pagination buttons
    document.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = parseInt((e.target as HTMLElement).dataset.page || '1', 10);
        if (page !== this.currentPage) {
          this.currentPage = page;
          this.render();
          // Scroll to top of container
          this.container.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  private showLoading(): void {
    this.container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Caricamento in corso...</p>
      </div>
    `;
  }

  private showError(message: string): void {
    this.container.innerHTML = `
      <div class="error">
        <p>${this.escapeHtml(message)}</p>
        <button class="retry-btn">Riprova</button>
      </div>
    `;

    // Add retry button event listener
    const retryBtn = this.container.querySelector('.retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.init();
      });
    }
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Public methods
  public refresh(): void {
    this.init();
  }

  public filterByCategory(category: string): void {
    this.currentFilter = category;
    this.currentPage = 1;
    
    if (category === 'all') {
      this.filteredRecords = [...this.records];
    } else {
      this.filteredRecords = this.records.filter(record => 
        record.CATEGORIE && record.CATEGORIE.split(',').map(c => c.trim()).includes(category)
      );
    }
    
    this.render();
  }

  public goToPage(page: number): void {
    const totalPages = Math.ceil(this.filteredRecords.length / (this.options.itemsPerPage || 9));
    if (page >= 1 && page <= totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.render();
    }
  }
}

// Add styles for the dynamic content
const style = document.createElement('style');
style.textContent = `
  .gallery-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .gallery-filters {
    margin-bottom: 2rem;
    text-align: center;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
  }

  .gallery-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }

  .gallery-item-inner {
    position: relative;
    width: 100%;
  }

  .media-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .media-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }

  .media-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .gallery-item:hover .media-content {
    transform: scale(1.05);
  }

  .media-placeholder {
    padding-top: 100%; /* 1:1 Aspect Ratio */
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
    padding: 1.5rem 1rem 1rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .gallery-item:hover .overlay {
    transform: translateY(0);
  }

  .item-title {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .item-description {
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
    opacity: 0.9;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-footer {
    font-size: 0.8rem;
    opacity: 0.9;
  }

  .video-wrapper,
  .instagram-wrapper {
    position: relative;
    background: #000;
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  .gallery-item:hover .play-icon {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }

  .url-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    text-align: center;
    color: #333;
    text-decoration: none;
  }

  .link-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .link-text {
    word-break: break-all;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-btn:hover,
  .filter-btn.active {
    background: #333;
    color: white;
    border-color: #333;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 0.5rem;
  }

  .page-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-btn:hover:not(:disabled) {
    background: #f5f5f5;
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-btn.active {
    background: #333;
    color: white;
    border-color: #333;
  }

  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
  }
`;
document.head.appendChild(style);

// Export as default and as named export
export default DynamicContent;

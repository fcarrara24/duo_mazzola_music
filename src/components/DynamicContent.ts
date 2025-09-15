interface RecordDB {
  TIPO: "IMMAGINE" | "VIDEO" | "POST_INSTAGRAM" | "URL" | "DATO";
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

    const start = (this.currentPage - 1) * (this.options.itemsPerPage || 9);
    const end = start + (this.options.itemsPerPage || 9);
    const itemsToShow = this.filteredRecords.slice(start, end);

    const cardsHtml = itemsToShow.map(item => this.createCardHtml(item)).join('');
    
    let html = `
      <div class="dynamic-content">
        ${this.createFiltersHtml()}
        <div class="cards-grid">${cardsHtml}</div>
        ${this.createPaginationHtml()}
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  private createCardHtml(record: RecordDB): string {
    const mediaHtml = this.createMediaHtml(record);
    const categoriesHtml = this.options.showCategories && record.CATEGORIE ? 
      this.createCategoriesHtml(record.CATEGORIE) : '';
    
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
      <div class="card" data-type="${record.TIPO}">
        <div class="card-header">
          <h3>${this.escapeHtml(record.TITOLO)}</h3>
          ${categoriesHtml}
        </div>
        <div class="card-body">
          ${mediaHtml}
          ${record.DESCRIZIONE ? `<p class="description">${this.escapeHtml(record.DESCRIZIONE)}</p>` : ''}
          ${dateHtml}
        </div>
      </div>
    `;
  }

  private createMediaHtml(record: RecordDB): string {
    switch (record.TIPO) {
      case 'IMMAGINE':
        return `<div class="media"><img src="${this.escapeHtml(record.URL)}" alt="${this.escapeHtml(record.TITOLO)}" /></div>`;
      case 'VIDEO':
        return `
          <div class="media">
            <video controls>
              <source src="${this.escapeHtml(record.URL)}" type="video/mp4" />
              Il tuo browser non supporta il tag video.
            </video>
          </div>
        `;
      case 'POST_INSTAGRAM':
        const postId = record.URL.split('/').pop();
        return `
          <div class="media instagram-embed">
            <iframe
              src="https://www.instagram.com/p/${postId}/embed"
              title="${this.escapeHtml(record.TITOLO)}"
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
            ${this.escapeHtml(record.URL)}
          </a>
        `;
      default:
        return '';
    }
  }

  private createCategoriesHtml(categories: string): string {
    const categoryList = categories.split(',').map(cat => cat.trim());
    return `
      <div class="categories">
        ${categoryList.map(cat => `<span class="category-tag">${this.escapeHtml(cat)}</span>`).join('')}
      </div>
    `;
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

// Export as default and as named export
export default DynamicContent;

export function createAbout() {
  const about = document.createElement('section');
  about.className = 'about';
  about.id = 'chi-siamo';
  
  about.innerHTML = /*html*/`
    <div class="container">
      <h2 class="section-title">Chi Siamo</h2>
      <div class="about-content">
        <div class="about-text">
          <p class="lead">Il Duo Mazzola è un'esplosiva combinazione di talento e passione musicale che porta sul palco un repertorio variegato e coinvolgente.</p>
          
          <div class="about-details">
            <div class="detail">
              <h3>La nostra storia</h3>
              <p>Nati dall'incontro di due musicisti con esperienze diverse ma complementari, il Duo Mazzola nasce con l'obiettivo di portare la musica classica e non solo in contesti innovativi e coinvolgenti.</p>
            </div>
            
            <div class="detail">
              <h3>Il nostro stile</h3>
              <p>Un mix unico di classico e moderno, dove le melodie senza tempo incontrano arrangiamenti contemporanei, creando un'esperienza musicale unica e coinvolgente.</p>
            </div>
          </div>
          
          <div class="musical-style">
            <h3>Generi musicali</h3>
            <div class="tags">
              <span class="tag">Classica</span>
              <span class="tag">Jazz</span>
              <span class="tag">Contemporanea</span>
              <span class="tag">Colonne sonore</span>
            </div>
          </div>
        </div>
        
        <div class="about-image">
          <div class="image-container">
            <img src="https://images.unsplash.com/photo-1514525252781-ee6733f2f52d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Duo Mazzola in concerto" />
          </div>
        </div>
      </div>
    </div>
  `;

  return about;
}

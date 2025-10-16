export function createAbout() {
  const about = document.createElement('section');
  about.className = 'about';
  about.id = 'chi-siamo';
  
  about.innerHTML = /*html*/`
    <div class="container">
      <h2 class="section-title">Chi Siamo</h2>
      <div class="about-content">
        <div class="about-text">
          <p class="lead">Duo Mazzola, composto da padre e figlio che con le loro performance musicali tra fisarmoniche e tastiere portano musica per eventi adatti per Folklore, Liscio, Revival e Natale.</p>
          
          <div class="about-details">
            <div class="detail">
              <h3>La nostra storia</h3>
              <p>Il Duo nasce da una sinergia tra Fabrizio e Daniel (padre e figlio) che lo spinge nell'inverno del 2014 a formare il Duo con Fabrizio che ha alle spalle già 20 anni di musica live e Daniel he si affiancherà per formare così un Duo che tutt'oggi continua a crescere</p>
            </div>
            
            <div class="detail">
              <h3>Il nostro stile</h3>
              <p>Ci potete trovare in 3 versioni:</p>
              <ol class="styled-list">
                <li>
                  <strong>Versione Fisarmoniche Folkloristiche</strong>
                  <p>Adatta per sagre e feste tipiche con abiti tradizionali, fisarmoniche e voci (anche itineranti)</p>
                </li>
                <li>
                  <strong>Versione Palco Liscio e Revival anni 60/90</strong>
                  <p>Adatta per feste dell'oratorio o Sagre Patronali estive</p>
                </li>
                <li>
                  <strong>Versione Natalizia</strong>
                  <p>Con vestiti tipici e fisarmoniche in versione itinerante adatta per serenate natalizie, mercatini e presepi viventi</p>
                </li>
              </ol>
            </div>
          </div>
          
          <div class="musical-style">
            <h3>Generi musicali</h3>
            <div class="tags">
              <span class="tag">Classica</span>
              <span class="tag">Contemporanea</span>
            </div>
          </div>
        </div>
        
        <div class="about-image">
          <div class="image-container">
            <img src="./img/Estate Materiale/Duo Mazzola estate 1.jpg" alt="Duo Mazzola in concerto" />
          </div>
        </div>

        <div class="about-image">
          <div class="image-container">
            <img src="./img/Estate Materiale/Duo Mazzola estate 2.jpg" alt="Duo Mazzola in concerto" />
          </div>
        </div>
      </div>
    </div>
  `;

  return about;
}

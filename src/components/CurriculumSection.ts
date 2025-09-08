export const createCurriculumSection = (): HTMLElement => {
  const section = document.createElement('section');
  section.className = 'curriculum-section';
  
  section.innerHTML = /*html*/`
    <div class="container">
      <h2 class="section-title">Curriculum</h2>
      <p class="section-subtitle">Scarica il nostro curriculum per maggiori informazioni sulle nostre performance e repertori</p>
      
      <div class="curriculum-single">
        <div class="curriculum-card">
          <div class="curriculum-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <h3>Curriculum Duo Mazzola</h3>
          <p>Scarica il nostro curriculum completo in formato immagine</p>
          <a href="/src/img/Curriculum Duo Mazzola Music.jpg" class="btn btn-primary" download="Duo_Mazzola_Curriculum.jpg">
            <i class="fas fa-download"></i> Scarica JPG
          </a>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

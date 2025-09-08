export function createHero() {
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.id = 'home';
  
  hero.innerHTML = /*html*/`
    <div class="hero-content">
      <div class="logo-container">
        <img src="./img/Estate Materiale/Duo Mazzola Logo.png" alt="Duo Mazzola" class="hero-logo">
      </div>
      <p class="subtitle">Esperienze musicali indimenticabili</p>
      <div class="cta-buttons">
        <a href="#concerti" class="btn">Prossimi Eventi</a>
        <a href="#contatti" class="btn btn-outline">Contattaci</a>
      </div>
    </div>
    <div class="hero-media">
      <div class="video-container">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;

  return hero;
}

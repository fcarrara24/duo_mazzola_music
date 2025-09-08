export function createContactSection() {
  const section = document.createElement('section');
  section.className = 'contact-section';
  
  section.innerHTML = /*html*/`
    <div class="container">
      <div class="contact-container">
        <div class="contact-content">
          <h2 class="section-title">Contattaci</h2>
          <p class="contact-subtitle">Siamo a tua disposizione per informazioni sui concerti e disponibilità</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="contact-details">
                <h3>Telefono</h3>
                <p>Per una risposta più rapida, ti consigliamo di chiamarci:</p>
                <a href="tel:+39XXXXXXXXX" class="contact-link">+39 XXX XXX XXXX</a>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-details">
                <h3>Email</h3>
                <p>Oppure inviaci un'email a:</p>
                <a href="mailto:info@duomazzola.it" class="contact-link">info@duomazzola.it</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

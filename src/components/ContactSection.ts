export function createContactSection() {
  const section = document.createElement('section');
  section.className = 'contact-section';
  
  section.innerHTML = /*html*/`
    <div class="container">
      <div class="contact-container">
        <div class="contact-content">
          <h2 class="section-title">Contattaci</h2>
          <p class="contact-subtitle">Siamo a tua disposizione per informazioni sui concerti e disponibilità</p>
          <p class="service-area">Serviamo con piacere la zona di Bergamo e provincia</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="contact-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="contact-details">
                <h3>Telefono</h3>
                <p>Per una risposta più rapida, ti consigliamo di chiamarci:</p>
                <a href="tel:+393206265277" class="contact-link">+39 320 626 5277</a>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-details">
                <h3>Email</h3>
                <p>Oppure inviaci un'email a:</p>
                <a href="duomazzola@gmail.com" class="contact-link">duomazzola@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return section;
}

export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  
  footer.innerHTML = /*html*/`
    <div class="footer-container">
      <div class="footer-section">
        <h3>Contatti</h3>
        <div class="contact-info">
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <a href="tel:+39XXXXXXXXX">+39 XXX XXX XXXX</a>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <a href="mailto:info@duomazzola.it">info@duomazzola.it</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Duo Mazzola. Tutti i diritti riservati.</p>
      </div>
    </div>
  `;
  
  return footer;
}

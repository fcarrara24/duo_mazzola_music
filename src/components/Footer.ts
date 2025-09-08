export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  
  footer.innerHTML = /*html*/`
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="./img/Estate Materiale/Duo Mazzola Logo.png" alt="Duo Mazzola" class="footer-logo-img">
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

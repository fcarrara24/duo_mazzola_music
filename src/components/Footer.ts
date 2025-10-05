export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  
  footer.innerHTML = /*html*/`
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img class="footer-logo" src="./img/Estate Materiale/Duo Mazzola Logo.png" class="footer-logo-img">
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Duo Mazzola. Tutti i diritti riservati.</p>
      </div>
    </div>
  `;
  return footer;
}

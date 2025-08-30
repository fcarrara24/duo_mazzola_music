export function createNavbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  
  navbar.innerHTML = `
    <div class="container">
      <div class="navbar-brand">
        <a href="#" class="logo">Duo Mazzola</a>
        <button class="navbar-toggle" aria-label="Menu">
          <span class="hamburger"></span>
        </button>
      </div>
      <ul class="nav-links">
        <li><a href="#home" class="active">Home</a></li>
        <li><a href="#chi-siamo">Chi Siamo</a></li>
        <li><a href="#concerti">Concerti</a></li>
        <li><a href="#media">Media</a></li>
        <li><a href="#repertorio">Repertorio</a></li>
        <li><a href="#contatti" class="btn btn-outline">Contatti</a></li>
      </ul>
    </div>
  `;

  // Toggle mobile menu
  const toggle = navbar.querySelector('.navbar-toggle') as HTMLElement;
  const menu = navbar.querySelector('.nav-links') as HTMLElement;
  
  toggle?.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  // Close menu when clicking on a nav link
  const navLinks = navbar.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle?.classList.remove('active');
    });
  });

  return navbar;
}

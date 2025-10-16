// Main entry point for the application
import './styles.css';
import { createNavbar } from './components/Navbar';
import { createHero } from './components/Hero';
import { createAbout } from './components/About';
// import { createConcerts } from './components/Concerts';
import { createMediaGallery } from './components/MediaGallery';
import { createCurriculumSection } from './components/CurriculumSection';
import { createFooter } from './components/Footer';
import DynamicContent from './components/DynamicContent';

function initApp() {
  console.log('Initializing application...');
  
  // Clear the app container first
  const app = document.getElementById('app');
  if (!app) {
    console.error('Could not find app element');
    return;
  }
  app.innerHTML = ''; // Clear any existing content
  
  try {
    // Create and append the navbar
    console.log('Creating navbar...');
    const navbar = createNavbar();
    document.body.insertBefore(navbar, document.body.firstChild);
    
    // Create main content container
    console.log('Creating main container...');
    const main = document.createElement('main');
    main.id = 'main';
    
    // Create and append sections
    console.log('Creating components...');
    // Define component type for better type safety
    type ComponentConfig = {
      name: string;
      create: () => HTMLElement;
    };

    // Add main content sections
    const components: ComponentConfig[] = [
      { name: 'hero', create: createHero },
      { name: 'about', create: createAbout },
      { name: 'media', create: createMediaGallery },
      // { name: 'concerts', create: createConcerts },
      { 
        name: 'dynamic-content',
        create: () => {
          const section = document.createElement('section');
          section.id = 'dynamic-content';
          section.className = 'dynamic-content-section';
          
          // Initialize DynamicContent after the section is created and added to the DOM
          setTimeout(() => {
            new DynamicContent({
              containerId: 'dynamic-content',
              itemsPerPage: 6,
              showCategories: true,
              showDates: true
            });
          }, 0);
          
          return section;
        }
      },
      { name: 'curriculum', create: createCurriculumSection },
      { 
        name: 'contact', 
        create: () => {
          const section = document.createElement('section');
          section.className = 'contact-section';
          section.id = 'contatti';
          section.innerHTML = /*html*/`
            <div class="container">
              <h2 class="section-title">Contattaci</h2>
              <p class="contact-subtitle">Siamo di Bergamo, ma ci esibiamo in tutta la lombradia. Siamo a tua disposizione per informazioni sui concerti e disponibilità</p>
              
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
                    <a href="mailto:info@duomazzola.it" class="contact-link">info@duomazzola.it</a>
                  </div>
                </div>
              </div>
            </div>
          `;
          return section;
        }
      }
    ];
    
    // Create and append all components
    components.forEach(({ name, create }) => {
      try {
        console.log(`Creating ${name} section...`);
        const section = create();
        if (section) {
          main.appendChild(section);
          console.log(`✓ ${name} section created successfully`);
        } else {
          console.error(`❌ Failed to create ${name} section`);
        }
      } catch (error) {
        console.error(`Error creating ${name} section:`, error);
      }
    });
    
    // Add main content to the app
    app.appendChild(main);
    
    // Add footer
    console.log('Creating footer...');
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = /*html*/ `
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo"><img class="footer-logo" src="./img/Estate Materiale/Duo Mazzola Logo.png" class="footer-logo-img"></div>
          <div class="footer-links">
            <a href="#home">Home</a>
            <a href="#chi-siamo">Chi Siamo</a>
            <a href="#concerti">Concerti</a>
            <a href="#media">Media</a>
            <a href="#contatti">Contatti</a>
          </div>
          <div class="social-links">
            <a href="https://www.facebook.com/share/19aYThKLvG/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/duo_mazzola_music?igsh=NXJnbmN5djR2M3Bw" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@DanielMazzolaByMazzo" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
    `;
    console.log('Application initialized successfully!');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 80,
            behavior: 'smooth' as ScrollBehavior
          });
        }
      });
    });
    
    // Add footer to the app
    app.appendChild(footer);
    
  } catch (error) {
    console.error('Error initializing application:', error);
    const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.color = 'red';
    errorDiv.style.fontFamily = 'Arial, sans-serif';
    
    const heading = document.createElement('h2');
    heading.textContent = "Errore nel caricamento dell'applicazione";
    
    const message = document.createElement('p');
    message.textContent = "Si è verificato un errore durante il caricamento della pagina. Si prega di ricaricare la pagina o riprovare più tardi.";
    
    const details = document.createElement('p');
    details.textContent = 'Dettagli dell\'errore:' + errorMessage;
    
    errorDiv.appendChild(heading);
    errorDiv.appendChild(message);
    errorDiv.appendChild(details);
    
    app.innerHTML = '';
    app.appendChild(errorDiv);
  }
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

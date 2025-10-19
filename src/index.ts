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
                    <a href="mailto:duomazzola@gmail.com" class="contact-link">duomazzola@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          `;
          return section;
        }
      }, 
      {
        name: 'footer',
        create: createFooter
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

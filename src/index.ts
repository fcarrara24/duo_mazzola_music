// Main entry point for the application
import './styles.css';

// Import your components here
// Example: import { MyComponent } from './components/MyComponent';

function initApp() {
  console.log('Initializing application...');
  
  // Get the app container
  const app = document.getElementById('app');
  if (!app) {
    console.error('Could not find app element');
    return;
  }
  app.innerHTML = ''; // Clear any existing content
  
  try {
    // Create main content container
    console.log('Creating main container...');
    const main = document.createElement('main');
    main.id = 'main';
    
    // Define component type for better type safety
    type ComponentConfig = {
      name: string;
      create: () => HTMLElement;
    };

    // Add your components here
    const components: ComponentConfig[] = [
      // Example component:
      // {
      //   name: 'my-component',
      //   create: () => {
      //     const section = document.createElement('section');
      //     section.className = 'my-component';
      //     section.innerHTML = `
      //       <h1>Welcome to TypeScript Webpack Template</h1>
      //       <p>Start building your application here</p>
      //     `;
      //     return section;
      //   }
      // },
      // Add more components as needed
    ];
    
    // Create and append all components
    components.forEach(({ name, create }) => {
      try {
        console.log(`Creating ${name} component...`);
        const section = create();
        if (section) {
          main.appendChild(section);
          console.log(`✓ ${name} component created successfully`);
        } else {
          console.error(`❌ Failed to create ${name} component`);
        }
      } catch (error) {
        console.error(`Error creating ${name} component:`, error);
      }
    });
    
    // Add main content to the app
    app.appendChild(main);
    
    // Add a simple footer
    console.log('Creating footer...');
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = /*html*/ `
      <div class="container">
        <div class="footer-content">
          <p>&copy; ${new Date().getFullYear()} Your Application. All rights reserved.</p>
        </div>
      </div>
    `;

    // Add the footer to the app
    app.appendChild(footer);
    
    console.log('Application initialized successfully!');
    
    // Initialize any global functionality
    initAppFeatures();
    
  } catch (error) {
    console.error('Error initializing application:', error);
    showError(error);
  }
}

/**
 * Initialize application features and event listeners
 */
function initAppFeatures() {
  // Initialize smooth scrolling for anchor links
  initSmoothScrolling();
  
  // Add other global event listeners here
  // Example: window.addEventListener('resize', handleResize);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e: Event) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Display an error message to the user
 */
function showError(error: unknown) {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.innerHTML = `
    <h2>Something went wrong</h2>
    <p>Please refresh the page or try again later.</p>
    <p>${error instanceof Error ? error.message : 'An unknown error occurred'}</p>
  `;
  
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '';
    app.appendChild(errorMessage);
  }
}

// Start the application when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

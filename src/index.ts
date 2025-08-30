// Main entry point for the application
import './styles.css';

class App {
  private mainElement: HTMLElement;

  constructor() {
    this.mainElement = document.getElementById('main')!;
    this.initialize();
  }

  private initialize(): void {
    // Create a sample component
    const welcomeComponent = document.createElement('div');
    welcomeComponent.className = 'welcome';
    welcomeComponent.innerHTML = `
      <h1>Benvenuti su Duo Mazzola Music</h1>
      <p>Il tuo progetto TypeScript è stato configurato correttamente!</p>
    `;
    
    // Add the component to the main element
    this.mainElement.appendChild(welcomeComponent);
  }
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

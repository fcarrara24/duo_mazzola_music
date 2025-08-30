// Main entry point for the application
import './styles.css';
import { renderTestPage } from './pages/testPage';

function initApp() {
  const mainElement = document.getElementById('main');
  if (mainElement) {
    renderTestPage(mainElement);
  } else {
    console.error('Could not find main element');
  }
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

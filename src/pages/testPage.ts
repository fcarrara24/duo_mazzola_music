export function renderTestPage(container: HTMLElement): void {
    // Create a sample component
    const welcomeComponent = document.createElement('div');
    welcomeComponent.className = 'welcome';
    welcomeComponent.innerHTML = /*html*/`
      <h1>Benvenuti su Duo Mazzola Music</h1>
      <p>Il tuo progetto TypeScript è stato configurato correttamente!</p>
    `;
    
    // Clear previous content and add the new component
    container.innerHTML = '';
    container.appendChild(welcomeComponent);
}
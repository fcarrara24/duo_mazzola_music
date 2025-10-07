export function createComponent() {
  const section = document.createElement('component');
  section.className = 'contact-section';
  
  section.innerHTML = /*html*/`
    <div class="container">
        <h1>basic container</h1>
    </div>
  `;
  
  return section;
}

export function createContact() { 
    const contanct = document.createElement('contanct');
    contanct.className = 'contact-section';
    contanct.id = 'contatti';
    contanct.innerHTML = /*html*/`
    <div class="container">
        <h2 class="section-title">Contattaci</h2>
        <p class="contact-subtitle">Descrizione</p>
        
        <div class="contact-methods">
        <div class="contact-method">
            <div class="contact-icon">
            <i class="fas fa-phone-alt"></i>
            </div>
            <div class="contact-details">
            <h3>Telefono</h3>
            <p>Per una risposta più rapida, ti consigliamo di chiamarci:</p>
            <a href="tel:+393206265277" class="contact-link">+39 xxx xxx xxxx</a>
            </div>
        </div>
        
        <div class="contact-method">
            <div class="contact-icon">
            <i class="fas fa-envelope"></i>
            </div>
            <div class="contact-details">
            <h3>Email</h3>
            <p>Oppure inviaci un'email a:</p>
            <a href="mailto:info@gmail.com" class="contact-link">info@gmail.com</a>
            </div>
        </div>
        </div>
    </div>
    `;
    return contanct;
}
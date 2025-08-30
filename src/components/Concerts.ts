interface Concert {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  isUpcoming: boolean;
}

export function createConcerts() {
  const concerts = document.createElement('section');
  concerts.className = 'concerts';
  concerts.id = 'concerti';
  
  // Sample concert data - replace with actual data
  const concertData: Concert[] = [
    {
      id: 1,
      title: 'Serata Classica',
      date: '15 Settembre 2023',
      location: 'Teatro Comunale, Milano',
      description: 'Un viaggio attraverso i capolavori della musica classica con un tocco contemporaneo.',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      isUpcoming: true
    },
    {
      id: 2,
      title: 'Note d\'Autunno',
      date: '5 Ottobre 2023',
      location: 'Auditorium Parco della Musica, Roma',
      description: 'Melodie autunnali che riscaldano il cuore in una serata indimenticabile.',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      isUpcoming: true
    },
    {
      id: 3,
      title: 'Concerto di Primavera',
      date: '12 Maggio 2023',
      location: 'Villa Reale, Monza',
      description: 'Celebrazione della primavera con un repertorio vivace e coinvolgente.',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      isUpcoming: false
    },
    {
      id: 4,
      title: 'Note d\'Inverno',
      date: '20 Dicembre 2022',
      location: 'Teatro Dal Verme, Milano',
      description: 'Concerto natalizio con brani classici e tradizionali per celebrare le festività.',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      isUpcoming: false
    }
  ];

  const upcomingConcerts = concertData.filter(concert => concert.isUpcoming);
  const pastConcerts = concertData.filter(concert => !concert.isUpcoming);

  concerts.innerHTML = `
    <div class="container">
      <h2 class="section-title">Concerti</h2>
      
      <div class="concerts-tabs">
        <button class="tab-btn active" data-tab="upcoming">Prossimi Concerti</button>
        <button class="tab-btn" data-tab="past">Archivio Concerti</button>
      </div>
      
      <div class="tab-content active" id="upcoming-concerts">
        <h3 class="concerts-subtitle">Prossimi Appuntamenti</h3>
        ${upcomingConcerts.length > 0 
          ? `<div class="concerts-grid">
              ${upcomingConcerts.map(concert => `
                <div class="concert-card" data-id="${concert.id}">
                  <div class="concert-image">
                    <img src="${concert.image}" alt="${concert.title}" />
                    <div class="concert-date">${concert.date}</div>
                  </div>
                  <div class="concert-info">
                    <h4>${concert.title}</h4>
                    <div class="concert-location">
                      <i class="location-icon">📍</i> ${concert.location}
                    </div>
                    <p>${concert.description}</p>
                    <button class="btn btn-outline concert-details">Dettagli</button>
                  </div>
                </div>
              `).join('')}
            </div>`
          : '<p class="no-events">Nessun concerto in programma al momento. Torna presto per aggiornamenti!</p>'
        }
      </div>
      
      <div class="tab-content" id="past-concerts">
        <h3 class="concerts-subtitle">Archivio Concerti</h3>
        ${pastConcerts.length > 0 
          ? `<div class="concerts-grid">
              ${pastConcerts.map(concert => `
                <div class="concert-card" data-id="${concert.id}">
                  <div class="concert-image">
                    <img src="${concert.image}" alt="${concert.title}" />
                    <div class="concert-date">${concert.date}</div>
                  </div>
                  <div class="concert-info">
                    <h4>${concert.title}</h4>
                    <div class="concert-location">
                      <i class="location-icon">📍</i> ${concert.location}
                    </div>
                    <p>${concert.description}</p>
                    <button class="btn btn-outline concert-gallery">Galleria</button>
                  </div>
                </div>
              `).join('')}
            </div>`
          : '<p class="no-events">Nessun concerto passato da mostrare.</p>'
        }
      </div>
    </div>
  `;

  // Tab functionality
  const tabButtons = concerts.querySelectorAll('.tab-btn');
  const tabContents = concerts.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-concerts`)?.classList.add('active');
    });
  });

  return concerts;
}

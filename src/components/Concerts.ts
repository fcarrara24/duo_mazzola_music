import { getDati, RecordDB } from '../api/sheetDb';

interface Concert {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  isUpcoming: boolean;
}

function formatDate(isoDate?: string): string {
  if (!isoDate) return 'Data da definire';
  const date = new Date(isoDate);
  return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}

function mapRecordToConcert(record: RecordDB, index: number): Concert | null {
  const isUpcoming = record.DATA_INSERIMENTO ? new Date(record.DATA_INSERIMENTO) > new Date() : false;

  // Assuming location is stored in CATEGORIE, otherwise default
  const location = record.CATEGORIE || 'Luogo da definire';

  return {
    id: record.ORDINE || index,
    title: record.TITOLO,
    date: formatDate(record.DATA_INSERIMENTO),
    location: location,
    description: record.DESCRIZIONE,
    image: record.URL, // Assuming URL is the image for the concert
    isUpcoming: isUpcoming,
  };
}

export async function createConcerts(): Promise<HTMLElement> {
  const concerts = document.createElement('section');
  concerts.className = 'concerts';
  concerts.id = 'concerti';

  const allData = await getDati();
  const concertDataFromApi = allData.filter(item => item.CATEGORIA === 'CONCERTS');
  const concertData: Concert[] = concertDataFromApi
    .map(mapRecordToConcert)
    .filter((item): item is Concert => item !== null)
    .sort((a, b) => {
      const dateA = a.isUpcoming ? new Date(allData.find(d => d.TITOLO === a.title)?.DATA_INSERIMENTO || 0).getTime() : 0;
      const dateB = b.isUpcoming ? new Date(allData.find(d => d.TITOLO === b.title)?.DATA_INSERIMENTO || 0).getTime() : 0;
      return dateB - dateA;
    });

  const upcomingConcerts = concertData.filter(concert => concert.isUpcoming);

  concerts.innerHTML = /*html*/`
    <div class="container">
      <h2 class="section-title">Prossimi Concerti</h2>
      
      <div class="concerts-content">
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
    </div>
  `;

  // Add click handler for concert details
  const detailButtons = concerts.querySelectorAll('.concert-details');
  detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = (e.target as HTMLElement).closest('.concert-card');
      const concertId = card?.getAttribute('data-id');
      // Add your concert details logic here
      console.log('Viewing details for concert:', concertId);
    });
  });

  return concerts;
}

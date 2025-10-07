import {SHEET_DB_LINK} from './../config/env';

interface RecordDB {
  TIPO: "FOTO" | "VIDEO" | "POST_INSTAGRAM" | "URL" | "DATO";
  TITOLO: string;
  DESCRIZIONE: string;
  URL: string;
  DATA_INSERIMENTO?: string; // ISO date (es. "2025-09-09")
  CATEGORIE?: string; // lista separata da virgola
  ORDINE?: number;
}

const CACHE_KEY = 'duo_mazzola_data_cache';
const CACHE_TIMESTAMP_KEY = 'duo_mazzola_data_timestamp';
const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 ore in millisecondi

async function fetchFromServer(): Promise<RecordDB[]> {

  const website = "https://sheetdb.io/api/v1/" + SHEET_DB_LINK; 
  const response = await fetch("https://sheetdb.io/api/v1/");
  
  if (!response.ok) {
    throw new Error("Errore nel recupero dati: " + response.status);
  }

  const data: any[] = await response.json();
  
  // Convertiamo i campi nel nostro tipo
  const formattedData = data.map((row) => ({
    TIPO: row.TIPO,
    TITOLO: row.TITOLO,
    DESCRIZIONE: row.DESCRIZIONE,
    URL: row.URL,
    DATA_INSERIMENTO: row.DATA_INSERIMENTO,
    CATEGORIE: row.CATEGORIE,
    ORDINE: row.ORDINE ? Number(row.ORDINE) : undefined,
  }));

  // Salva i dati e il timestamp nel localStorage
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(formattedData));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().toISOString());
  } catch (e) {
    console.warn('Impossibile salvare i dati nella cache locale', e);
  }

  return formattedData;
}

export async function getDati(): Promise<RecordDB[]> {
  // Prova a recuperare i dati dalla cache
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (cachedData && cachedTimestamp) {
      const lastFetchDate = new Date(cachedTimestamp);
      const now = new Date();
      
      // Se i dati in cache hanno meno di un giorno, usali
      if ((now.getTime() - lastFetchDate.getTime()) < ONE_DAY_MS) {
        return JSON.parse(cachedData);
      }
    }
  } catch (e) {
    console.warn('Errore nel recupero della cache locale', e);
  }

  // Se non ci sono dati in cache o sono scaduti, fai una nuova richiesta
  return fetchFromServer();
}

export function clearCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
  } catch (e) {
    console.warn('Errore nella pulizia della cache', e);
  }
}
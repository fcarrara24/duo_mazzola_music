interface RecordDB {
    TIPO: "IMMAGINE" | "VIDEO" | "POST_INSTAGRAM" | "URL" | "DATO";
    TITOLO: string;
    DESCRIZIONE: string;
    URL: string;
    DATA_INSERIMENTO?: string; // ISO date (es. "2025-09-09")
    CATEGORIE?: string; // lista separata da virgola
    ORDINE?: number;
  }
  

async function getDati(): Promise<RecordDB[]> {
    const response = await fetch("https://sheetdb.io/api/v1/tg0w3ai1vymki");
    
    if (!response.ok) {
      throw new Error("Errore nel recupero dati: " + response.status);
    }
  
    // SheetDB ritorna un array di oggetti [{colonna1: "...", colonna2: "..."}]
    const data: any[] = await response.json();
  
    // Convertiamo i campi nel nostro tipo
    return data.map((row) => ({
      TIPO: row.TIPO,
      TITOLO: row.TITOLO,
      DESCRIZIONE: row.DESCRIZIONE,
      URL: row.URL,
      DATA_INSERIMENTO: row.DATA_INSERIMENTO,
      CATEGORIE: row.CATEGORIE,
      ORDINE: Number(row.ORDINE),
    }));
  }
  
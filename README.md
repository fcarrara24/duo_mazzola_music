# Duo Mazzola Music

Un progetto TypeScript moderno con configurazione per il deployment su GitHub Pages.

## Struttura del Progetto

```
├── dist/                  # Cartella di output per i file compilati
├── src/                   # Sorgenti del progetto
│   ├── index.html         # File HTML principale
│   ├── index.ts           # Punto di ingresso TypeScript
│   └── styles.css         # Stili globali
├── .gitignore
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Prerequisiti

- Node.js (versione 14 o superiore)
- npm (incluso con Node.js)
- Git

## Installazione

1. Clona il repository:
   ```bash
   git clone <repository-url>
   cd duo-mazzola-music
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

## Script disponibili

- `npm start` - Avvia il server di sviluppo all'indirizzo http://localhost:3000
- `npm run build` - Crea una build di produzione nella cartella `dist/`
- `npm run deploy` - Esegue il deploy su GitHub Pages

## Configurazione per GitHub Pages

1. Assicurati che il tuo repository sia già su GitHub
2. Se non l'hai già fatto, installa gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Modifica il file `package.json` e aggiungi:
   ```json
   "homepage": "https://tuusername.github.io/nome-repository",
   ```
4. Esegui il deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## Sviluppo

Tutti i file sorgente si trovano nella cartella `src/`. Il punto di ingresso principale è `src/index.ts`.

## Licenza

MIT

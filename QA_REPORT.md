# Oiko v0.1.1 — Rapporto di verifica

**Data:** 23 ottobre 2026. **Obiettivo:** preparazione al rilascio statico GitHub Pages.

## Verifiche effettuate

- Test automatici Node.js sulla logica di importi, date, frequenze, categorie, escaping, URL HTTPS e struttura del pacchetto.
- Controllo dei moduli JavaScript e delle referenze statiche per il deploy in una sottocartella come `/oiko/`.
- Controllo del contenuto del pacchetto, inclusi file `.nojekyll`, test, JSON e asset locali.
- Riesame di sicurezza: nessuno script di terze parti; CSP di base; link a fornitori HTTPS senza credenziali incorporate.

## Limiti dichiarati

Il browser Chromium dell'ambiente di collaudo ha bloccato la navigazione per policy amministrativa (`ERR_BLOCKED_BY_ADMINISTRATOR`), sia verso localhost sia verso pagine di prova. **Non è stato quindi possibile convalidare IndexedDB reale, import/export o comportamento Safari iOS in questa sessione**. Le immagini delle anteprime desktop/mobile provengono dal precedente prototipo; non sono evidenza dei nuovi test. I test locali Node.js verificano solo la logica e la consistenza statica del codice.

Il repository GitHub dedicato non esiste nell'account collegato e non è possibile crearlo mediante le azioni GitHub disponibili nella sessione. Non è stato effettuato alcun deploy.

## Esito

**Pronto per il collaudo manuale su GitHub Pages, NON certificato per uso quotidiano con dati importanti.** Seguire `COLLAUDO_IPHONE.md` e verificare effettivamente il ripristino di un backup prima di registrare documenti reali.

## Oiko v0.2 (26 ottobre 2026)

- Nuova identità visiva: verde bosco, salvia, avorio e oro; claim «La tua casa è OK.».
- Icona vettoriale e PNG 180/192/512; manifest standalone con percorsi relativi per GitHub Pages.
- Dashboard con totale speso, budget e scadenze; pulsante rapido mobile collegato al form esistente.
- Browser Chromium (HTML con dati locali simulati, non server reale): schermate 350, 390 e 1365 px senza overflow orizzontale; aggiunta spesa 1,01 € e descrizione verificata.
- Conformità database: schema IndexedDB e backup JSON v1 **immutati**.
- Da confermare dopo la pubblicazione: caricamento su HTTPS e comportamento reale su iPhone; nessuna prova di migrazione richiesta.

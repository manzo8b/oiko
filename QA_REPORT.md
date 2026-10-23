# Oiko v0.1.1 — Rapporto di verifica

**Data:** 23 ottobre 2026. **Obiettivo:** preparazione al rilascio statico GitHub Pages.

## Verifiche effettuate

- Test automatici Node.js sulla logica di importi, date, frequenze, categorie, escaping, URL HTTPS e struttura del pacchetto.
- Controllo dei moduli JavaScript e delle referenze statiche per il deploy in una sottocartella come `/oiko/`.
- Controllo del contenuto del pacchetto, inclusi file `.nojekyll`, test, JSON e asset locali.
- Riesame di sicurezza: nessuno script di terze parti; CSP di base; link a fornitori HTTPS senza credenziali incorporate.

## Limiti dichiarati

Il browser Chromium dell'ambiente di collaudo ha bloccato la navigazione per policy amministrativa (`ERR_BLOCKED_BY_ADMINISTRATOR`), sia verso localhost sia verso pagine di prova. **Non è stato quindi possibile convalidare IndexedDB reale, import/export o comportamento Safari iOS in questa sessione**. Le immagini delle anteprime desktop/mobile provengono dal precedente prototipo; non sono evidenza dei nuovi test. I test locali Node.js verificano solo la logica e la consistenza statica del codice.

Il repository dedicato `manzo8b/oiko` è stato creato dall’utente. L’attivazione di GitHub Pages e il collaudo browser reale restano da verificare dopo il caricamento.

## Esito

**Pronto per il collaudo manuale su GitHub Pages, NON certificato per uso quotidiano con dati importanti.** Seguire `COLLAUDO_IPHONE.md` e verificare effettivamente il ripristino di un backup prima di registrare documenti reali.

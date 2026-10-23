# Oiko v0.1.1 · Attivazione GitHub Pages

**Repository:** https://github.com/manzo8b/oiko

La versione v0.1.1 è progettata per la pubblicazione dalla radice del branch `main` con **GitHub Pages**. Il codice pubblico non deve contenere spese personali né backup. Questo file documenta la procedura e non garantisce di per sé che Pages sia già attivo.

## Attivazione iniziale (proprietario del repository)

1. Apri https://github.com/manzo8b/oiko/settings/pages
2. Nella sezione **Build and deployment** seleziona **Deploy from a branch**.
3. Come branch scegli `main`, cartella `/ (root)` e premi **Save**.
4. Controlla l'esito in **Actions** e torna a **Settings → Pages** per il collegamento ufficiale.
5. Quando Pages è attivo, l'indirizzo previsto è `https://manzo8b.github.io/oiko/`. Consideralo verificato solo dopo un caricamento riuscito.

La presenza di `.nojekyll` permette a Pages di servire direttamente i file statici. Tutti i riferimenti a CSS, JavaScript, logo e categorie sono relativi e compatibili con il percorso `/oiko/`.

## Collaudo

- Il workflow `Oiko QA` esegue automaticamente `npm test` e la verifica sintattica dei moduli.
- Dopo la pubblicazione verifica su desktop e iPhone il flusso: spesa fittizia, scadenza, pagamento, backup, chiusura browser, riapertura, ripristino.
- Per i dettagli usa `COLLAUDO_IPHONE.md` e `TEST-PLAN.md`.

## Limiti dichiarati

Nessun account, backend, notifiche push o sincronizzazione tra dispositivi. IndexedDB è locale al singolo browser; esporta periodicamente un backup JSON e conservalo in luogo privato. **Non caricare ricevute, backup o dati personali nel repository GitHub pubblico.**

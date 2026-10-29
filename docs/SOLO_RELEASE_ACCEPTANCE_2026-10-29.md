# Oiko gratuita — checklist di stabilizzazione v0.6.3

**Data di verifica sorgenti:** 29 ottobre 2026  
**Ambito:** solo Oiko personale gratuita, statica su GitHub Pages. Non autorizza il lancio commerciale di Oiko Family.

## Baseline da non cambiare

- Modalità gratuita senza account, senza pagamenti o integrazioni bancarie.
- Archivio nel browser: IndexedDB `oiko-local-v1`, schema `1`.
- Backup esportabile e importabile con formato `oiko-backup`, versione `1`, inclusi allegati.
- Nessuna migrazione o sincronizzazione automatica verso Family.
- Cinque sezioni: Oggi, Spese, Scadenze, Report, Impostazioni.

## Verifiche automatiche

- `npm test` esegue unit test e smoke test di packaging, manifest, dati locali e backup.
- `npm run release:check` verifica la coerenza dei vincoli Family senza autorizzare la vendita.
- Il workflow `.github/workflows/oiko-checks.yml` avvia tali controlli su push, pull request e richiesta manuale.
- **Attenzione:** il commit dei test non è una prova di esecuzione riuscita. Conservare il risultato del workflow prima di firmare la release.

## Accettazione funzionale (solo dati fittizi, browser)

1. **Avvio pulito:** aprire da URL pubblico e da icona Home; i cinque menu funzionano anche dopo un reload.
2. **Spese:** aggiungere, modificare ed eliminare una spesa di prova; verificare i totali nella dashboard e nei report.
3. **Scadenze:** registrare una ricorrenza mensile, marcarne il pagamento e verificare avanzamento e assenza di doppio conteggio.
4. **Budget e report:** confrontare le quote delle categorie e importi di sei mesi; verificare gli stati vuoti.
5. **Backup:** esportare JSON con una spesa, una scadenza e un allegato fittizi; ripristinare su profilo browser di prova isolato; confrontare tutti i record.
6. **Recupero da errore:** provare un JSON malformato o non Oiko; l'archivio deve rimanere invariato.
7. **Mobile reale:** iPhone Safari e un browser Android; controllare 320–390 px, menu, dialog, pulsanti e navigazione con testo ingrandito.
8. **Privacy e continuità:** assicurarsi che la UI non comunichi una sincronizzazione automatica o un backup cloud della modalità gratuita e che siano visibili i limiti dell'archiviazione locale.

**Non usare la funzione di ripristino su un profilo che contiene dati reali:** sostituisce l'intero archivio.

## Criterio di uscita

La release gratuita si può dichiarare stabilizzata dopo: test automatici verdi registrati, otto prove guidate superate e backup/restore testato su dispositivo o profilo realmente isolato. Eventuali difetti P0 vanno corretti prima di dichiararla pronta. Non modificare i gate di vendita Family per questa chiusura.

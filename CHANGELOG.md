## v0.5.1 — Dashboard e grafici più leggibili — 26 ottobre 2026

- Dashboard mobile più compatta: dati principali visibili prima, senza sacrificare la palette v0.5.
- Nuovo grafico ad anello con quattro categorie principali, residuo aggregato e importi assoluti.
- Barre di categoria espresse esplicitamente come quota percentuale delle spese del mese.
- Andamento sei mesi con importi visibili, zero reale e mese selezionato evidenziato.
- Pulsante flottante «Nuova spesa» limitato alla sezione Spese, per non coprire i grafici della dashboard.
- Nessuna migrazione dei dati, nessun cambiamento a backup o categorie.

## v0.5.0 — Identità viola e giallo — 26 ottobre 2026

- Nuovo design system: viola di brand, giallo di accento, fondi neutri e colori semantici per pagato/in arrivo/scaduto.
- Dashboard, pulsanti, navigazione, liste, grafici, scadenze, budget e campi aggiornati visivamente.
- Icone Home e logo nel colore viola, mantenendo il simbolo casa/grafico di Oiko.
- Nessun aggiornamento dello schema IndexedDB o del formato dei backup, nessuna funzione finanziaria modificata.

## v0.4.1 — Contrasto cromatico di dati e tabelle — 26 ottobre 2026

- Colori più vivi per progress bar, grafici, elenchi, card e separatori, con arancione riservato a segnali e accenti.
- Badge semanticamente distinti: da pagare, oggi, scaduto, pagato.
- Migliorata la leggibilità di importi, etichette e filtri su mobile e desktop.
- Modifica esclusivamente estetica: nessuna variazione a IndexedDB, backup o logica delle scadenze.

## v0.4.0 — Scadenze intelligenti — 26 ottobre 2026

- Riepilogo dei pagamenti previsti a 7 e 30 giorni e di quelli già scaduti.
- Filtri Da pagare, 7 giorni, 30 giorni, Scadute e Pagate con storico confermato.
- Accesso rapido alla vista scadenze dalla dashboard.
- Date calcolate per calendario, senza errori nei cambi di ora; nessun doppio conteggio di un'occorrenza già pagata.
- Nessuna migrazione IndexedDB e nessuna modifica al backup JSON v1.

## v0.3.1 — Contrasto e leggibilità — 26 ottobre 2026

- Evidenziato «Meno pensieri» in arancione caldo ad alto contrasto, mantenendo verde bosco e salvia.
- Elenchi spese e scadenze più leggibili: card separate, icone più vive, gerarchie cromatiche rafforzate.
- Nessun cambiamento a database locale, backup, calcoli o pagamenti.

# Changelog

## 0.3.0 — 26 ottobre 2026
- Rimossi i punti finali da titoli, intestazioni e logotipo mobile/desktop.
- Budget mensili facoltativi per le 12 categorie principali, con modifica e cancellazione in Impostazioni.
- Riepilogo delle soglie nella dashboard e confronto completo nel Report: speso, residuo, percentuale, superamento.
- Nessun blocco della registrazione quando un limite viene superato.
- Nessuna migrazione IndexedDB: schema `oiko-local-v1` versione 1 invariato.
- Backup JSON v1 invariato, comprende automaticamente i limiti nella preferenza `categoryBudgetsCents`; compatibile con backup precedenti senza questa proprietà.
- Test automatici per soglie, calcoli, titoli e compatibilità archivi.

# Changelog Oiko

## v0.2.0 — Identità visiva e rapidità operativa (2026-10-26)

- Nuovo marchio Oiko con pittogramma casa + grafico e payoff **«La tua casa è OK.»**.
- Palette verde bosco, salvia, avorio e oro; interfaccia responsive per iPhone e desktop.
- Dashboard con riepilogo speso, budget e scadenze; azioni dirette «Registra una spesa» e «Vedi scadenze».
- Barra di navigazione con icone vettoriali e pulsante rapido mobile per aggiungere una spesa.
- Manifest web e icone per l'installazione sulla schermata Home (nessuna richiesta di accesso a dati bancari).
- Nessuna migrazione IndexedDB: stesso database `oiko-local-v1`, stesse strutture e backup v1.
- Nessuna funzione finanziaria fittizia: il valore esposto indica spese registrate, non saldo bancario.

# Oiko Changelog

## v0.1.1 — Preparazione test GitHub Pages — 23 ottobre 2026

- Aggiunta verifica automatica di struttura, categorie e risorse locali.
- Aggiunti test di casi limite per date, importi, categorie e link esterni.
- Applicata una Content Security Policy di base nel documento HTML.
- Rifiutati URL HTTPS contenenti credenziali nella directory dei fornitori.
- Predisposta GitHub Actions `Oiko QA` per eseguire i test al push.
- Aggiunti manuali di pubblicazione e collaudo Safari iPhone.
- Chiariti i limiti del browser di test: nessun collaudo reale di IndexedDB/Safari iOS disponibile in questo ambiente.

## v0.1 — 23 ottobre 2026

- MVP statico: spese, scadenze, report, impostazioni, backup e allegati.

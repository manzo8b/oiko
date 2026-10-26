# UX-001 — Esperienza Oiko Family per due adulti

**Stato:** specifica dell'evoluzione; non è ancora disponibile nel sito pubblico.

## Obiettivi
L'utente trova rapidamente le risposte a **quanto abbiamo speso**, **cosa dobbiamo pagare** e **chi se ne occupa**. Mantenere la palette Oiko v0.5 (viola/navy, giallo per CTA, colori funzionali per stato). Titoli senza punto finale. Non mostrare «saldo bancario»: Oiko non si collega a conti.

## Navigazione futura
Conservare **Oggi · Spese · Scadenze · Report · Impostazioni**. Aggiungere **La famiglia** dentro Impostazioni e un indicatore discreto di sincronizzazione nella testata. Non introdurre una sesta scheda mobile.

## Accesso iniziale
1. Scelta **Solo** (no account, backup locale) oppure **Family** (dati condivisi e account).
2. Family: autenticazione robusta e creazione nucleo.
3. Invito dell'altro adulto a indirizzo verificato, con link a scadenza.
4. L'invitato crea la propria identità. Nessun PIN condiviso.
5. Esportazione/importazione dei dati locali soltanto su richiesta consapevole.

## Nuova spesa — minimo numero di tap
```
Nuova spesa
Importo       [ 84,70 € ]
Categoria     [ Supermercato ]
Pagata da     [ Tu ▼ ]         (l'utente autenticato è il default)
Data          [ Oggi ]
Descrizione   [ facoltativa ]
Ricevuta      [ + allega ]
                [ Registra spesa ]
```
Salvare `created_by` dalla sessione verificata e `paid_by` da scelta esplicita. Feedback distinto: «Salvata sul dispositivo», «In attesa di sincronizzazione», «Condivisa».

## Scadenze
Stato, data, importo, responsabile, azione per confermare. Mai confondere pagato e previsto. Quando un altro membro paga la stessa scadenza, impedire il doppio conteggio.

## Accessibilità e controlli
- Focus tastiera visibile, etichette chiare, zoom 200%, VoiceOver.
- Non affidare significato a solo colore.
- Sblocco rapido locale solo con sessione verificata, recovery e revoca.
- Test operativi su iPhone Safari e desktop, compreso offline/online e cancellazione autorizzata.
- Nessuna promessa di accesso familiare attivo finché il backend non è realmente operativo.

## Criteri di completamento UX
- Il test con due adulti conclude invito e accesso senza assistenza.
- Registrazione spesa semplice: obiettivo sotto 20 secondi in test utenti, non solo in simulazione.
- Corretta attribuzione **chi registra / chi paga / chi gestisce**.
- Indicatori di sincronizzazione comprensibili e nessuna sovrapposizione di pulsanti ai dati.
- Nessuna duplicazione a fronte di tap concorrenti.

L'anteprima interattiva separata dal sito pubblico è disponibile nel dossier di progettazione e non è un sistema di autenticazione.

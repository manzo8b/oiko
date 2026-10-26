# Oiko v0.3 · Test Safari iPhone

1. **Non reinstallare Oiko né cancellare i dati locali.** Apri Oiko dall'icona della schermata Home; verifica che le spese precedenti siano ancora presenti.
2. Controlla che i titoli siano senza punto finale: «La tua casa è OK», «Più controllo», «Meno pensieri», Oiko senza punto.
3. **Impostazioni → Budget per categoria**: scegli Supermercato, inserisci un limite di prova (ad es. 50 €) e salva. Verifica che la categoria rimanga selezionata.
4. **Oggi → Budget per categoria**: confronta quanto speso nel mese con il limite impostato, anche in caso di superamento. **Report → Limiti per categoria**: verifica lo stesso importo.
5. Chiudi completamente e riapri Oiko dalla stessa icona: verifica che il limite sia conservato insieme alle vecchie spese.
6. **Impostazioni → Backup completo**: esporta il JSON, conserva il file in File sul dispositivo e verifica nella sezione `preferences[].data.categoryBudgetsCents` la presenza del valore (in centesimi).
7. Rimuovi il limite con **Rimuovi limite** e verifica che scompaia dalla dashboard. Nessuna spesa deve essere cancellata.

**Privacy:** usa soltanto valori di prova per nuove registrazioni. Il ripristino del backup è distruttivo per l'archivio corrente e va eseguito solo in un ambiente di prova separato.

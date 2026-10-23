# Oiko · Collaudo reale Safari iPhone

**Da completare su dispositivo reale dopo la pubblicazione su HTTPS (GitHub Pages).** Questo test non è sostituibile con una simulazione grafica.

## Preparazione

Apri l'URL Pages in Safari normale, non in navigazione privata. Assicurati di avere un backup salvato altrove se possiedi già dati Oiko. Esegui i test solo con dati fittizi.

## Test funzionali (spuntare sul dispositivo)

- [ ] Oggi mostra 4 indicatori e navigazione in basso; nessun elemento tagliato a 375/390 px.
- [ ] **Spese** → Nuova spesa: registra 84,70 € in Supermercato, data odierna. Controlla importo su Oggi, Spese e Report.
- [ ] Registra 120 € in Salute e farmacia/Odontologia e 35 € in Cura personale/Pedicure.
- [ ] Chiudi Safari completamente e riapri l'URL: verifica che le tre spese esistano ancora.
- [ ] **Scadenze** → Nuova: Luce 68 €, bimestrale, 31/01/2027. Conferma e registra il pagamento: la data deve avanzare al 31/03/2027.
- [ ] Verifica che 68 € compaiano fra le spese **una volta sola**.
- [ ] Associa una ricevuta PDF senza dati personali reali; scaricala e riaprila.
- [ ] **Impostazioni** → Backup JSON: verifica che Safari permetta di salvarlo nell'app File.
- [ ] Esporta CSV e controlla che un foglio di calcolo mostri importi, date e categorie.
- [ ] Dopo aver confermato che il backup esiste, cancella i dati di test; importa il JSON e controlla che spese, scadenze e allegato siano ripristinati.
- [ ] Abilita «Aggiungi alla schermata Home» dal menu Condividi e verifica che il collegamento apra la stessa applicazione; controlla se i dati restano disponibili (iOS può separare i contenitori di archiviazione a seconda della modalità di apertura).
- [ ] Imposta il budget, naviga fra mesi e verifica che un importo scaduto non sia conteggiato come pagamento.

## Limiti da osservare

IndexedDB potrebbe essere rimosso dal browser in certe condizioni; il backup periodico rimane necessario. Il sistema **non** promette notifiche push né sincronizzazione fra dispositivi.

## Registro del test

Dispositivo: _________ · Versione iOS: _________ · Browser: _________ · Data: _________

Esito: □ Superato  □ Da correggere

Problemi riscontrati: _______________________________________________

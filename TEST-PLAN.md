# Oiko · Test di accettazione manuali

1. Apri da `http://localhost:8000`; verifica tutte e cinque le sezioni senza errori in console.
2. Aggiungi una spesa occasionale **84,70 €** / Supermercato. L'importo deve apparire in Spese, Oggi e Report.
3. Aggiungi **120,00 €** / Salute e farmacia / Odontologia. Nessuna diagnosi richiesta.
4. Aggiungi **35,00 €** / Cura personale / Pedicure. Nessuna scadenza automatica.
5. Crea la bolletta luce da **68,00 €** bimestrale, con prossimo pagamento il **31/01/2027**. Registra il pagamento e verifica che la scadenza diventi **31/03/2027**.
6. Apri il link HTTPS del fornitore; la scadenza non deve risultare pagata automaticamente.
7. Imposta un budget mensile, cambia mese e verifica i totali per periodo.
8. Salva un PDF breve come ricevuta, scaricalo, esporta backup JSON, svuota i dati e ripristina: la ricevuta deve essere disponibile.
9. Esporta CSV e verifica categoria, importo e descrizione in un programma di fogli di calcolo.
10. Prova il layout a larghezze 375, 390, 768 e 1440 px: navigazione e dialoghi devono rimanere utilizzabili senza scroll orizzontale.
11. Su Safari iPhone: ricarica la pagina e verifica persistenza dei dati (salvo navigazione privata/limitazioni del browser).
12. Verifica che un contenuto testuale come `<script>alert(1)</script>` compaia soltanto come testo, senza essere eseguito.
13. Verifica che importazioni malformate o con URL non HTTPS siano rifiutate prima della sostituzione dei dati.

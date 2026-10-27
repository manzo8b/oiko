# Oiko v0.6.2 — Una Oiko, due modalità

**Oiko senza account** mantiene la gestione locale e il formato backup preesistente. La nuova sezione **Oiko Family** presenta la beta privata con due account e backend Supabase in una pagina separata; non sincronizza né importa dati locali. Attenzione: l'URL di staging è raggiungibile pubblicamente ma non permette registrazioni aperte e non è ancora un servizio commerciale.

La v0.6.2 introduce una **card privacy nella sidebar Oiko**, con piccolo logo sorridente, badge leggibili e promessa esplicita: «Nessun dato personale viene inviato ai server Oiko». La card riguarda esclusivamente la versione locale gratuita, non Oiko Family che usa il cloud.

## Base v0.6.0 — Dashboard e grafici

Questa versione conserva **la palette Oiko v0.5**, il database IndexedDB e il formato di backup JSON v1.

## Miglioramenti

- Dashboard smartphone più compatta, informazioni principali più visibili senza scorrere attraverso un riquadro decorativo molto alto.
- Diagramma ad anello per le prime quattro categorie più «Altre categorie», con importi e quote del mese; i valori provengono unicamente dalle spese registrate.
- Barre di categoria espresse come percentuale del **totale mensile**, non della categoria più elevata. Valore in euro e quota percentuale sono entrambi visibili.
- Confronto a sei mesi con importo per ogni mese, mesi senza spese rappresentati come zero, mese selezionato evidenziato in giallo.
- Pulsante mobile rapido visibile solo nella sezione Spese; pulsante «Registra una spesa» sempre presente nel riquadro della dashboard.
- Nessuna nuova raccolta di dati, nessun account, nessuna sincronizzazione, nessun pagamento eseguito da Oiko.

## Controlli

Eseguire `npm test`. Nella v0.6.0 vengono verificati 44 test automatici. La visualizzazione è stata collaudata con dati fittizi in browser su schermi da 350 px, 390 px e 1365 px, mediante simulazione dell'archivio applicativo (non test diretto di Safari iPhone o IndexedDB). Non è stato alterato il database locale dei dispositivi degli utenti.

## Privacy e continuità

I dati risiedono nella memoria locale del browser (IndexedDB). Prima di cancellare la PWA o i dati del sito esportare e custodire il backup JSON in una destinazione sicura. Il contenuto del backup può essere riservato e non va pubblicato su GitHub. La v0.6.0 modifica solo l'interfaccia e le etichette: schema `oiko-local-v1`, versione `1`, e JSON `oiko-backup`, versione `1`, invariati.

## Destinazione commerciale e cedibilità

**Stato attuale: prototipo Oiko locale su GitHub Pages, Oiko Family in beta privata AppDeploy/Supabase.** Non attivare abbonamenti o trasformare GitHub Pages nell'hosting del SaaS commerciale: le condizioni Pages lo escludono. Per il rilascio commerciale servono un dominio proprio, un hosting adatto, gestione legale dei dati e ambienti di produzione separati. Il repository pubblico attualmente non ha una licenza software riconosciuta; non è una scelta di licenza commerciale implicita.

[Governance, hosting, GDPR e trasferibilità](docs/COMMERCIAL_OWNERSHIP_AND_TRANSFER.md) · [Scelta commerciale e titolarità](docs/COMMERCIAL_DECISION_RECORD.md) · [Dati e privacy Family](docs/FAMILY_PRIVACY_AND_DATA_REGISTER.md) · [Piano di produzione e cessione](docs/FAMILY_PRODUCTION_AND_TRANSFER_RUNBOOK.md) · [Gate per il lancio](docs/PRODUCT-RELEASE-GATES.md)

## Pubblicazione GitHub Pages

Caricare i file nella radice del repository, branch `main`, con Pages su `main / (root)`. La versione pubblica è https://manzo8b.github.io/oiko/. Non occorre reinstallare l'icona Home e non bisogna cancellare la cache o i dati per aggiornare. Per verificare colori e grafici aprire Oiko dall'icona originale, mantenendo la stessa origine.

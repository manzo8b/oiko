# Oiko v0.6.3 — Una Oiko, due modalità

**Oiko senza account** mantiene la gestione locale e il formato backup preesistente. La nuova sezione **Oiko Family** presenta la beta privata con due account e backend Supabase in una pagina separata; non sincronizza né importa dati locali. Attenzione: l'URL di staging è raggiungibile pubblicamente ma non permette registrazioni aperte e non è ancora un servizio commerciale.

La v0.6.2 introduce una **card privacy nella sidebar Oiko**, con piccolo logo sorridente, badge leggibili e promessa esplicita: «Nessun dato personale viene inviato ai server Oiko». La card riguarda esclusivamente la versione locale gratuita, non Oiko Family che usa il cloud.

La v0.6.3 chiarisce in dashboard il posizionamento: **Oiko è una micro-app pratica per le spese di casa, gratuita e senza account; Oiko Family aggiunge la gestione condivisa fra due adulti**. Family resta una beta privata con accesso autorizzato, non un servizio in vendita.

## Base v0.6.0 — Dashboard e grafici

Questa versione conserva **la palette Oiko v0.5**, il database IndexedDB e il formato di backup JSON v1.

## Miglioramenti

- Dashboard smartphone più compatta, informazioni principali più visibili senza scorrere attraverso un riquadro decorativo molto alto.
- Diagramma ad anello per le prime quattro categorie più «Altre categorie», con importi e quote del mese; i valori provengono unicamente dalle spese registrate.
- Barre di categoria espresse come percentuale del **totale mensile**, non della categoria più elevata. Valore in euro e quota percentuale sono entrambi visibili.
- Confronto a sei mesi con importo per ogni mese, mesi senza spese rappresentati come zero, mese selezionato evidenziato in giallo.
- Pulsante mobile rapido visibile solo nella sezione Spese; pulsante «Registra una spesa» sempre presente nel riquadro della dashboard.
- Nessuna nuova raccolta di dati, nessun account, nessuna sincronizzazione, nessun pagamento eseguito da Oiko.

## Controlli automatici e accettazione v0.6.3 (29 ottobre 2026)

Il repository ora include il workflow GitHub Actions `oiko-checks.yml` e gli smoke test della modalità gratuita. Eseguire `npm test` e `npm run release:check` e verificare l'esito CI; l'inserimento dei file da solo non equivale a un test superato. Prima di dichiarare stabilizzata la modalità gratuita, completare il collaudo con dati fittizi e backup/restore isolato, anche su smartphone reale.

[Checklist di accettazione Oiko gratuita](docs/SOLO_RELEASE_ACCEPTANCE_2026-10-29.md) · [Workflow test](.github/workflows/oiko-checks.yml)

## Controlli

Eseguire `npm test`. Nella v0.6.0 vengono verificati 44 test automatici. La visualizzazione è stata collaudata con dati fittizi in browser su schermi da 350 px, 390 px e 1365 px, mediante simulazione dell'archivio applicativo (non test diretto di Safari iPhone o IndexedDB). Non è stato alterato il database locale dei dispositivi degli utenti.

## Privacy e continuità

I dati risiedono nella memoria locale del browser (IndexedDB). Prima di cancellare la PWA o i dati del sito esportare e custodire il backup JSON in una destinazione sicura. Il contenuto del backup può essere riservato e non va pubblicato su GitHub. La v0.6.0 modifica solo l'interfaccia e le etichette: schema `oiko-local-v1`, versione `1`, e JSON `oiko-backup`, versione `1`, invariati.

## Destinazione commerciale e cedibilità

**Stato attuale: prototipo Oiko locale su GitHub Pages, Oiko Family in beta privata AppDeploy/Supabase.** Non attivare abbonamenti o trasformare GitHub Pages nell'hosting del SaaS commerciale: le condizioni Pages lo escludono. Per il rilascio commerciale servono un dominio proprio, un hosting adatto, gestione legale dei dati e ambienti di produzione separati. Il repository pubblico attualmente non ha una licenza software riconosciuta; non è una scelta di licenza commerciale implicita.

[Governance, hosting, GDPR e trasferibilità](docs/COMMERCIAL_OWNERSHIP_AND_TRANSFER.md) · [Scelta commerciale e titolarità](docs/COMMERCIAL_DECISION_RECORD.md) · [Dati e privacy Family](docs/FAMILY_PRIVACY_AND_DATA_REGISTER.md) · [Piano di produzione e cessione](docs/FAMILY_PRODUCTION_AND_TRANSFER_RUNBOOK.md) · [Gate per il lancio](docs/PRODUCT-RELEASE-GATES.md)

## Pubblicazione GitHub Pages

Caricare i file nella radice del repository, branch `main`, con Pages su `main / (root)`. La versione pubblica è https://manzo8b.github.io/oiko/. Non occorre reinstallare l'icona Home e non bisogna cancellare la cache o i dati per aggiornare. Per verificare colori e grafici aprire Oiko dall'icona originale, mantenendo la stessa origine.

## Due vie commerciali — direzione approvata

Oiko deve poter essere offerto come **servizio Family ad abbonamento** e, in alternativa o in futuro, essere **concesso in licenza o ceduto come software**. La versione locale Oiko resta gratuita e indipendente. Nessuna vendita, checkout, migrazione dati o progetto Supabase produzione è stato attivato.

- [Strategia commerciale a due percorsi](docs/DUAL_TRACK_STRATEGY.md)
- [Hosting e prima analisi dei costi](docs/PROVIDER_AND_COST_SHORTLIST.md)
- [Architettura per produzione e cessione](docs/SAAS_PRODUCTION_ARCHITECTURE.md)
- [Roadmap e prove di accettazione](docs/DUAL_TRACK_EXECUTION_ROADMAP.md)
- [Catalogo modalità prodotto](config/product-catalog.json)
- [Registro verificabile dei gate](config/release-gates.json)

Comando informativo: `npm run release:check`. Comando di verifica bloccante, volutamente non ancora verde: `npm run release:check:strict`.

## Racconto del prodotto e custodia del backend

- [Narrazione commerciale e testi della dashboard v0.6.3](docs/MARKETING_PRODUCT_NARRATIVE.md)
- [Inventario tecnico delle migrazioni Supabase e procedura di custodia privata](docs/FAMILY_MIGRATIONS_INVENTORY.md)

[Custodia privata e inventario degli attuali 16 file Family](docs/FAMILY_PRIVATE_SOURCE_CUSTODY.md)

## Sorgenti Family in archivio privato

Il modulo cloud Family dispone ora di [repository privato separato](https://github.com/manzo8b/oiko-family-private), 16/16 sorgenti frontend, cinque migrazioni SQL archiviate, `package-lock.json` e build GitHub Actions superata. La beta AppDeploy e il sito Oiko gratuito non sono stati spostati. La ricostruzione di un database pulito, i test browser autonomi e l'attivazione commerciale **non sono ancora conclusi**. [Dettagli di custodia](docs/FAMILY_PRIVATE_SOURCE_CUSTODY.md).

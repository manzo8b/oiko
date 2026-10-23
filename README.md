# Oiko · v0.1.1 (candidato al test su GitHub Pages)

**La tua casa, le tue spese, in perfetto ordine.**

Prima versione navigabile della micro-app Oiko. Il progetto integra le **12 categorie** della specifica v1.1 (supermercato, abbigliamento, farmacia, odontologia, pedicure e altre spese comprese) e può essere pubblicato come sito statico su **GitHub Pages**.

## Cosa funziona

- Dashboard mensile con importi pagati, previsioni, scaduti e budget disponibile.
- Registro spese con creazione, modifica, eliminazione, ricerca, filtri per categoria e mese.
- Scadenze una tantum, mensili, bimestrali, trimestrali, semestrali, annuali con conferma manuale di pagamento.
- Calcolo delle date ricorrenti con giorno originario preservato, anche a febbraio.
- Report per categoria e andamento su sei mesi; stima annua ricorrenze attive.
- 12 categorie da `data/categories.json`, con aggiunta di sottocategorie personalizzate.
- PDF o immagini di ricevute (max 5 MB ciascuno), salvati in IndexedDB; download dal registro.
- Backup JSON con allegati inclusi, ripristino con sostituzione dell'archivio e CSV delle spese.
- Link HTTPS al portale del fornitore, inseriti dall'utente, senza alcuna conferma automatica di pagamento.
- Dati dimostrativi attivabili soltanto quando il registro è vuoto.
- Interfaccia responsive, con navigazione inferiore sul cellulare e barra laterale su desktop.

> **Rilascio di prova:** sono stati eseguiti test automatici della logica e dei file statici. IndexedDB reale e Safari iPhone restano da verificare dopo il deploy. Vedi `QA_REPORT.md`, `DEPLOY_GITHUB_PAGES.md` e `COLLAUDO_IPHONE.md`.

## Come provarla

Non aprire direttamente `index.html` come file (`file://`): le risorse ES module richiedono un server web.

```bash
cd Oiko_MVP_v0_1
python3 -m http.server 8000
```

Apri `http://localhost:8000/` nel browser. Per il telefono puoi pubblicare su GitHub Pages oppure usare un server locale raggiungibile sulla rete domestica, adottando precauzioni appropriate.

## Pubblicare su GitHub Pages

1. Crea un nuovo repository dedicato (esempio `oiko`).
2. Carica **il contenuto** di questa cartella nella radice del repository (`index.html`, `assets/`, `data/`, `.nojekyll`, ecc.).
3. Vai in **Settings → Pages → Build and deployment**, seleziona **Deploy from a branch**.
4. Seleziona `main`, cartella `/ (root)`, salva.
5. Il sito sarà raggiungibile al percorso indicato da GitHub Pages, spesso `https://<username>.github.io/oiko/`.

`.nojekyll` impedisce che un processo Jekyll modifichi le risorse statiche. Oiko non richiede npm, server, database remoto o chiavi API per funzionare.

## Modello dati e regole

- `expenses`: spese pagate, in euro interi convertiti in centesimi.
- `bills`: scadenze previste, non considerate spese finché non premi «Registra pagamento» e salvi.
- `attachments`: Blob di ricevute PDF o immagini.
- `preferences`: budget, sottocategorie aggiunte, indicazione dati demo.

Le date sono ISO (`YYYY-MM-DD`). Una scadenza del 31 gennaio mensile diventa 28/29 febbraio, poi 31 marzo quando viene registrato il pagamento del mese successivo. Una scadenza «Una volta» diventa inattiva quando pagata. I pagamenti collegati alla scadenza rimangono nel registro anche se il promemoria viene eliminato. Se elimini un pagamento già registrato, **la scadenza non viene riaperta automaticamente**: correggi la data manualmente se necessario.

## Backup e privacy

**Le informazioni restano nel browser del dispositivo** grazie a IndexedDB. Non esiste un account Oiko o una sincronizzazione multi-dispositivo. La pulizia dei dati del sito, l'uso della modalità privata, i limiti di spazio o alcuni criteri del browser possono cancellare l'archivio. Il pulsante «Richiedi conservazione persistente» aiuta dove supportato, ma **non sostituisce i backup**.

La funzione di backup include gli allegati in base64, quindi il JSON può essere grande e contenere dati privati. Non salvarlo in repository GitHub pubblici né inviarlo a sconosciuti. In MVP il backup supporta al massimo 30 MB di allegati complessivi per importazione. Per farmacisti e odontoiatria si suggerisce di registrare importi e categorie evitando diagnosi, referti e prescrizioni. Oiko non raccoglie carte, password, IBAN né credenziali bancarie.

## Limiti voluti

- Nessuna verifica bancaria o pagamento effettuato da Oiko.
- Nessun promemoria push quando l'app è chiusa: le scadenze sono visibili all'apertura.
- Nessuna sincronizzazione fra smartphone e computer.
- Nessun OCR, scansione automatica di fatture o estrazione degli importi.
- Nessuna ripartizione di un singolo scontrino tra più categorie (possibile evoluzione).
- I link ai fornitori sono definiti dall'utente e non convalidati come ufficiali dall'app: inserire soltanto URL HTTPS già controllati.
- L'archivio non è cifrato con una chiave indipendente dal browser.

## Test

```bash
npm test
```

I test unitari coprono calcoli monetari, calendario ricorrenze, classificazione scadenze, escaping HTML e assenza di doppi conteggi. Verificare inoltre manualmente i flussi su Safari iPhone e Chrome Android prima dell'uso quotidiano.

## Roadmap senza nuovi progetti

Le prossime iterazioni sono **dello stesso progetto Oiko**: verifica Safari iOS, gestione migliore degli allegati e accessibilità, categorie configurabili, eventuale sincronizzazione familiare con backend progettato separatamente e solo se necessaria. Non occorre integrare sistemi bancari per completare l'MVP.

## Licenza

Nessuna licenza pubblica è stata assegnata. Prima di rendere il codice riutilizzabile da terzi, scegliere esplicitamente una licenza.

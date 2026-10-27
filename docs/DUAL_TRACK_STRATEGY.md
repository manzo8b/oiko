# Oiko — Strategia commerciale a doppio percorso

**Decisione di prodotto:** 27 ottobre 2026 · **Stato:** APPROVATA COME DIREZIONE, NON COME AUTORIZZAZIONE ALLE VENDITE.

## 1. Un prodotto, due possibilità economiche

**A. Oiko Family B2C (ricavi diretti).** Oiko gratuito resta indipendente, con spese conservate nel browser senza account. Family è un servizio con due identità, spese condivise e archiviazione cloud. Per costi ricorrenti di hosting, backup, invii email e assistenza, il modello preferenziale da **validare** è un abbonamento per nucleo familiare, non due abbonamenti individuali. Nessun prezzo è approvato, non sono presenti checkout né abbonamenti reali.

**B. Oiko come asset software B2B.** L'app può essere concessa in licenza o ceduta come insieme di codice, documentazione, marchio/domini trasferibili, processi operativi e, solo se legittimamente cedibili, relazioni contrattuali. I dati degli utenti e gli account non diventano liberamente trasferibili in virtù della cessione del software.

**Principio invariabile:** non indebolire Oiko gratuito per incentivare Family; non attivare il cloud locale implicitamente; non confondere privilegio di accesso a una famiglia con stato commerciale dell'abbonamento.

## 2. Proposta di valore e limiti

| Aspetto | Oiko | Oiko Family |
| --- | --- | --- |
| Prezzo | Gratuito | Da definire dopo studio di mercato e margine |
| Utenti | Un dispositivo/browser per archivio | Fino a due adulti con account distinti |
| Memorizzazione | IndexedDB locale | Supabase cloud con isolamento nucleo/RLS |
| Condivisione | Nessuna | Spese e bollette condivise |
| Recupero dati | Copia locale dell'utente; senza backup server Oiko | Export di prova già sviluppato; backup tecnico e restore da validare |
| Stato | App locale funzionante su sito demo | Beta privata, non offerta al pubblico |

Non dichiarare funzionalità future come già acquistabili. Migrazione dei dati Oiko→Family: progettazione separata, consenso esplicito e verifica duplicati, non disponibile ora.

## 3. Ricavi e contabilità unitaria

Metriche mensili per nucleo pagante: **ARPA netto = prezzo incassato al netto dell'IVA applicabile e di eventuali imposte riscosse per conto terzi**; **margine di contribuzione = ARPA netto − commissioni pagamenti − quota hosting/DB/email/backup − quota supporto e rimborsi**. L'utile di gestione richiede anche costi fissi, acquisizione, amministrazione e oneri professionali.

Calcolare almeno tre scenari usando preventivi reali e ipotesi dichiarate: prudente, base e ottimista. Variabili minime: numero nuclei paganti, tasso di conversione, cancellazioni mensili (churn), crescita, commissioni, server, backup, assistenza, IVA/imposte. **Non fissare oggi un prezzo senza costi verificati.**

LTV/CAC solo se esistono dati reali; altrimenti presentare scenari ipotetici esplicitamente marcati. Per eventuale cessione il valore dipende da proprietà intellettuale dimostrabile, ricavi verificati, documentazione, facilità di handover e rischi contrattuali: non usare multipli arbitrari come valutazione definitiva.

## 4. Checkout futuro, senza attivarlo

Un acquisto si collega a un **nucleo familiare**, non alle due singole persone. Il ruolo owner/manager è un permesso applicativo; la sottoscrizione è una relazione commerciale. La modifica di un piano non può assegnare o revocare accesso a famiglie altrui.

Le informazioni dal provider pagamenti devono arrivare al **server** con firma verificata, eventi registrati in modo idempotente e storico del loro stato. Il browser non può attivare Family premium impostando un campo locale o un JWT modificabile. Il sistema deve gestire prova gratuita (se decisa), rinnovo, scadenza, rimborso, contestazione, disdetta ed eventuale periodo di grazia.

In sospensione/non rinnovo, **non cancellare automaticamente le informazioni finanziarie**: le regole su lettura, esportazione e successiva cancellazione dovranno essere coerenti con contratti e GDPR e approvate prima della vendita. Evitare di definire qui tempi inventati.

## 5. Flusso commerciale consumer (da progettare, non pubblicato)

1. Informazioni chiare su prodotto, limiti, prezzo complessivo, eventuale rinnovo e diritto di recesso.
2. Identità e contatti del venditore, T&C, privacy, gestione dei dati.
3. Pagamento autorizzato e conferma ordine obbligante al pagamento (pulsante non ambiguo).
4. Attivazione premium dopo evento server autenticato e verificato.
5. Area account: fatture/ricevute, stato abbonamento, disdetta, esportazione e richieste assistenza/cancellazione.

Le specificità dei servizi digitali e delle eccezioni al recesso richiedono revisione di legale e commercialista; non presumere un'automatica perdita del recesso.

Fonti ufficiali: https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_it.htm · https://www.mimit.gov.it/it/mercato-e-consumatori/tutela-del-consumatore/diritti-del-consumatore/diritto-di-recesso

## 6. Due diligence per eventuale licenza/cessione

Data room minima:
- titolarità IP e origine dei componenti, licenze terze, marchio, domini e grafiche;
- sorgenti riproducibili del frontend locale e di Family, migrations Supabase, lockfile e test;
- architettura, configurazioni per ambienti separati, gestione chiavi e configurazione Auth;
- contratti SaaS, DPA, sub-responsabili, procedure cancellazione, backup e report restore;
- metriche reali con dati aggregati, ricavi/costi se reali; nessuna simulazione presentata come storico;
- rischi, incidenti, debito tecnico, policy di trasferimento e inventario credenziali **senza esporre i segreti**.

**Nessun trasferimento di dati personali, dei due account beta o dei segreti in questo documento.**

## 7. Decisioni ancora aperte

- Soggetto legale che esercita l'attività e titolarità GDPR.
- Strategia di licenza e proprietà intellettuale; il repository attuale è pubblico e non ha una licenza dichiarata.
- Host commerciale, dominio, ambiente production, budget e piano Supabase appropriato.
- Prezzi, regioni di vendita, IVA/fatturazione, provider pagamenti.
- Termini di conservazione, modalità di cancellazione e accesso ai dati dopo scadenza.
- Licenza/asset sale: diritti concessi, garanzie, supporto e perimetro di un futuro acquirente.

Questo documento fissa la direzione; non sostituisce valutazione giuridica o fiscale.

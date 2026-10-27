# Oiko Family — Mappa dei dati, accessi e obblighi privacy

**Ricognizione tecnica:** 27 ottobre 2026  
**Ambiente:** staging Supabase Oiko, regione `eu-west-1` (Irlanda).  
**Metodo:** ispezione dei nomi delle colonne, RLS e Security Advisor, senza esportare i dati personali degli account tester.  
**Stato:** bozza per il titolare futuro e consulente privacy. Non è l'informativa da pubblicare.

## 1. Separazione obbligatoria tra modalità

| Modalità | Archivio | Account | Natura del trattamento nell'app |
|---|---|---|---|
| **Oiko** | IndexedDB nel dispositivo dell'utente | Non richiesto | Il registro spese non viene inviato a un backend Oiko; l'accesso alla pagina può generare metadati tecnici per il servizio di hosting |
| **Oiko Family** | Supabase PostgreSQL, autenticazione e sessioni | Account individuale per massimo due adulti | Dati condivisi di spesa e gestione della casa; il servizio tratta dati personali anche per conto di altri membri del nucleo |

Non attribuire ad Oiko Family la promessa di «nessun dato inviato ai server». Nel sito Oiko locale la formulazione pubblicitaria va confermata in verifica privacy, distinguendo **dati digitati dall'utente** e **log tecnici eventualmente generati dall'hosting**.

## 2. Categorie effettivamente presenti nello schema

| Componente | Tipologia dei dati | Finalità applicativa | Rischio / misura richiesta |
|---|---|---|---|
| `auth.users` (gestito da Supabase Auth) | Identità di accesso (email, ID account), informazioni di autenticazione e sessione | Login, verifica email e recupero credenziali | Non esportare password, hash o sessioni; configurare sicurezza e tempi di retention Auth |
| `oiko_households` | ID nucleo, nome attribuito al nucleo, valuta, fuso, creazione | Identificare una famiglia | RLS e consenso ai cambi di appartenenza |
| `oiko_memberships` | ID account e nucleo, ruolo, adesione, revoca | Controllo di accesso e ruolo | La revoca attuale è logica: **non equivale a cancellazione GDPR** |
| `oiko_invites` | Email del destinatario, hash codice, uso, scadenza, invitante | Inviti monouso legati a email | Nessuna policy di lettura diretta: scelta intenzionale. Definire tempi di cancellazione degli inviti scaduti/usati |
| `oiko_expenses` | Data, importo, categoria, descrizione libera, autore, pagatore, bolletta | Contabilità familiare condivisa | Il testo libero può contenere dati sensibili inseriti spontaneamente: minimizzazione e istruzioni UI |
| `oiko_bills` | Nome, importo, scadenze/periodicità, assegnazione, chi ha creato | Pianificazione bollette e conferma dei pagamenti | Esplicitare che Oiko non effettua transazioni bancarie |
| `oiko_activity_events` | Tipo azione, attore, entità, data | Audit delle azioni nel nucleo | Politica di retention e accesso controllato; non presentare log come dati anonimi |

Tutte le sei tabelle applicative `oiko_*` riportavano **RLS attiva** nella ricognizione del 27/10/2026. La sola tabella inviti è volutamente senza policy SELECT. Tutte le altre espongono SELECT legata alla funzione di appartenenza al nucleo. Questa è una verifica di configurazione **non** un audit di penetrazione completo.

## 3. Ruoli e responsabilità da identificare

- **Titolare GDPR:** da nominare; presumibilmente il soggetto che deciderà fini e mezzi del servizio Family. Non inventare dati legali.
- **Responsabile del trattamento:** Supabase secondo il DPA, nella relazione ordinaria cliente-controller e Supabase-processor. Verificare eventuali sub-responsabili, trasferimenti e relativi allegati.
- **Ulteriori fornitori potenziali:** hosting commerciale, email/SMTP, pagamenti, supporto/monitoraggio. Nessun fornitore non ancora selezionato va dichiarato come già contrattualizzato.
- **Persone interessate:** titolare e co-gestore degli account Family; eventualmente terzi che gli utenti menzionano in descrizioni libere.

La regione dati in Irlanda **non prova** che ogni operazione tecnica, assistenza o log sia confinata nel SEE. Leggere il DPA e la lista dei subprocessor.

## 4. I diritti degli utenti non sono ancora tutti implementati

| Processo | Stato e lacuna |
|---|---|
| Accesso ai movimenti della famiglia | Presente per membri attivi, con RLS |
| Download manuale | Interfaccia beta presente; la copia JSON include dati familiari condivisi; **non ancora collaudata come portabilità GDPR** |
| Rettifica delle informazioni | Da inventariare per tutte le entità e tutti i ruoli |
| Cancellazione account e dati | **Non ancora implementata/validata**; revoca appartenenza non basta |
| Revoca del co-gestore | Testata su dispositivi; access token già emessi e copie già esportate richiedono politiche aggiuntive |
| Accesso/modifica durante esportazione | Riesame delle race condition e della consultazione dei dati di altri membri necessario |
| Conservazione, inviti e log | Durate **DA DEFINIRE**, non inventare |
| Procedura richieste interessati | Contatto, verifica identità, ticketing e tempi di risposta **DA DEFINIRE** |
| Data breach e notifiche | Responsabili, canale, gravità, registro e processo **DA DEFINIRE** |
| Informativa art. 13 GDPR | Soggetto titolare non identificato; non pubblicare documenti con dati fittizi |

## 5. Privacy by design prima del lancio

1. Identificare il titolare reale e i mercati di destinazione; scegliere le basi giuridiche con consulente.
2. Formalizzare DPA e valutare subprocessor e trasferimenti.
3. Scrivere informativa comprensibile per Family e informazione adeguata per Oiko locale, senza promesse assolute tecnicamente imprecise.
4. Realizzare flussi di **cancellazione account, chiusura nucleo, cancellazione/esportazione delle spese**, con controllo del conflitto tra i due membri e rispetto di eventuali obblighi conservativi.
5. Definire retention di inviti, account revocati, spese, log e backup; nessuna cancellazione automatica senza politica validata.
6. Abilitare protezione password compromesse, email affidabile, accessi forti e alert.
7. Dimostrare recuperabilità dei backup tramite test in ambiente isolato.
8. Rivalutare gli export familiari: un membro potrebbe scaricare informazioni relative all'altro membro; UI, contratto e informativa devono essere coerenti con le facoltà dei co-gestori.

## 6. Fonti primarie

- Commissione UE — Informazioni per le persone interessate: https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en
- DPA Supabase: https://supabase.com/legal/customer-resources/data-processing-addendum
- Supabase backup: https://supabase.com/docs/guides/platform/backups
- Supabase Auth security: https://supabase.com/docs/guides/auth/password-security

Questo inventario è tecnico e non prova da solo l'adempimento del GDPR.

# Oiko Family — Inventario delle migrazioni Supabase

**Ricognizione database:** 27 ottobre 2026.  
**Progetto verificato:** solo `Oiko`, Supabase `eu-west-1`. **Nessun export dei dati degli utenti e nessuna modifica al database in questa verifica.**

## Perché esiste l'inventario

Per vendere o cedere Family serve **una ricostruzione del backend a database vuoto**, con SQL sorgente, autorizzazioni, trigger, funzioni, indici e test di isolamento. Un semplice URL Supabase o l'accesso all'ambiente di prova non è sufficiente.

**Criterio IP:** nel repository pubblico versioniamo **solo metadati e procedure**, non pubblichiamo il sorgente SQL completo delle quattro migrazioni private storiche finché non esiste una decisione esplicita sulla proprietà e un archivio GitHub privato. La migrazione commerciale iniziale è già stata pubblicata su GitHub e non viene rimossa dalla cronologia.

## Migrazioni applicate, identificate dalla tabella ufficiale

| Ordine | Versione database | Nome | Dimensione originale (caratteri) | MD5 SQL originale | Esportata in repository privato? |
| --- | --- | --- | ---: | --- | --- |
| 1 | 20261026194839 | `oiko_family_staging_core_rls_v1` | 6244 | `50cd61507d58e88d8633572ff6543ef0` | **No** |
| 2 | 20261026194948 | `oiko_family_staging_secure_rpc_v1` | 9054 | `0ed849c9804b342619769eb5c2edf9e9` | **No** |
| 3 | 20261026195033 | `oiko_family_staging_invitations_v1` | 4600 | `fe06b3506e03ea584be0aaf8bab552ff` | **No** |
| 4 | 20261027083923 | `oiko_family_reinvite_revoked_member_safe` | 2368 | `4d1e3802ac6d48eb36613464470ed525` | **No** |
| 5 | 20261027124135 | `oiko_commercial_shadow_entitlements` | 2988 | `dbd9d3e6b748ea1fd29f8877f3c9f6b5` | Nel repository pubblico come `supabase/migrations/20261027134500_oiko_commercial_shadow_entitlements.sql` |

**Nota:** per la migrazione 5 il timestamp nel nome del file GitHub non corrisponde alla versione assegnata dal database; allineare la sequenza nel repository privato prima di un replay. **I digest MD5 sono riferimenti di confronto dei file, non una misura di sicurezza crittografica dei dati.**

## Procedura futura di acquisizione senza esporre dati personali

1. Creare un repository GitHub **privato, dedicato a Oiko Family**, sotto controllo del proprietario; il collegamento GitHub attuale non espone un'azione di creazione repository, quindi non fingere che il repository sia stato creato.
2. Esportare le cinque migrazioni **in ordine di versione**, usando `supabase_migrations.schema_migrations` e il campo `statements` o il comando CLI di schema diff/dump in base al contesto.
3. Verificare sorgenti SQL per eventuali chiavi, token, email o dati di esempio prima dell'inserimento; nessun dato utente in repository.
4. Archiviare insieme il codice frontend AppDeploy Family, configurazioni Vite/TS, package-lock e test.
5. Preparare una base nuova **separata** (non lo staging attuale), applicare il DDL e verificare funzioni, RLS, privilegi e trigger.
6. Effettuare test con almeno due nuclei e tre o più identità sintetiche; revoca, reinvito e doppio pagamento, senza toccare gli utenti veri.
7. Registrare risultati dei test e modalità di rollback/restore nella documentazione di rilascio.

### Principio di conservazione

È accettabile che la beta resti in staging mentre si lavora al packaging. Non è accettabile dichiarare **cedibile e ripristinabile** una piattaforma di cui il sorgente completo e le migrazioni non siano stati provati in un ambiente pulito.

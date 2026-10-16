# Frasbanken

Ett mentalt verktygsbibliotek för att göra användbara samtalsfraser till sina egna. Mobil prototyp med 165 kort i 12 kategorier och repetition utan tidspress eller poäng.

## Purpose
Titta, lyft blicken, säg högt och prova olika uttryck. Användaren avgör själv hur frasen känns och när repetitionen är klar.

## Current Status
Körbar första prototyp. Ingen backend, inloggning, analys, API-nyckel eller extern font. Alla illustrationer ingår lokalt. Projektets källkod finns på https://github.com/wglitch/Frasbanken. GitHub Pages publiceras med det medföljande arbetsflödet efter att GitHub Actions valts som källa under Settings → Pages.

## Main Features Current State
165 kort i 12 kategorier från det tillhandahållna inventeringsutkastet. Tre korttyper (fras, meningsstomme, metod), kategorifilter, blandad repetition, skavfilter (2–3), obedömda kort samt export/import. Ingen timer, poängräkning eller automatisk bedömning. Formuleringar och källmetadata är bevarade från underlaget och inte språkgranskade.

## Kör lokalt

Med Node.js 22 eller senare, öppna en terminal i projektmappen:

```sh
npm start
```

Öppna http://127.0.0.1:47831. Ingen installation behövs. Avsluta servern med Ctrl+C. Alternativt: `python -m http.server 47831 --bind 127.0.0.1`. Använd en HTTP-server; dubbelklick på HTML-filen fungerar inte eftersom JSON och JavaScript-moduler läses separat.

## Repetition och historik

Välj kategori (tryck igen för att visa alla) och repetitionsläge. De kombineras. Läs, lyft blicken och säg högt. Skavvalet kan ändras fritt. **Nästa kort avslutar repetitionen** och sparar `{ skav, senast }` med kortets ID som nyckel. Utan bedömning sparas `skav: null`. Byte av kategori/läge eller omladdning avslutar inte repetitionen; ett pågående val kastas då.

Urvalet är viktad slumpning: obedömda prioriteras, därefter högre skav, med extra vikt för äldre repetitioner. Även naturliga kort har en chans. Samma kort undviks direkt efter sig självt när andra matchande kort finns. Finns bara ett kort kan det repeteras igen. Det finns inget slutprov eller prestationsmål.

Historiken lagras i IndexedDB (`frasbanken`, object store `history`), med localStorage som reserv om IndexedDB inte kan öppnas. Fel vid lagring visas tydligt; appen låtsas aldrig att en misslyckad skrivning lyckades. Vid lagringsfel ligger kortet kvar för nytt försök. Historiken är lokal för webbläsarens webbursprung (protokoll, domän och port); en annan enhet eller domän behöver import. Webbläsarrensning och privat läge kan ta bort data. Exportera regelbundet via **Din historik**.

Exporten innehåller ett vanligt objekt med ID:n, utan inbäddat kortbibliotek. Import validerar hela filen före skrivning och slår ihop historiken: den senaste tidpunkten vinner, befintlig post vinner vid lika tidpunkt. Även okända/borttagna kort-ID:n behålls. Filer över 5 MB och felaktiga skavvärden/datum avvisas. Export omfattar avslutade repetitioner, inte en pågående bedömning.

## Publicera på GitHub Pages

1. Projektets repository är [wglitch/Frasbanken](https://github.com/wglitch/Frasbanken) och projektfilerna ligger på grenen `main`, inklusive `.github/workflows/pages.yml`.
2. Öppna repositoryts **Settings → Pages** och välj **GitHub Actions** som publiceringskälla.
3. Pusha till `main`, eller kör arbetsflödet manuellt under **Actions → Publicera Frasbanken → Run workflow**.
4. När arbetsflödet är klart visas adressen i deploymenten och under Settings → Pages.

Arbetsflödet kör testerna och publicerar endast `index.html`, `styles.css`, `app.js`, `lib/`, `data/` och `assets/`. Ingen byggprocess behövs. Alla webbvägar är relativa och fungerar under en repositorysökväg som `/frasbanken/`. Historik ingår aldrig i publiceringen. GitHub Pages måste vara tillgängligt för repositoryts konto och synlighet. Se [GitHubs dokumentation om egna Pages-arbetsflöden](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Redigera bibliotek och bilder

Ändra `data/cards.json`. Den tillhandahållna filen är oförändrad och innehåller `schemaVersion: 1`, `categories` och `cards`. Använd stabila unika ID:n och återanvänd aldrig ett gammalt ID för ett annat kort. Ordningen i JSON-filen påverkar inte historiken. Ett kort har `id`, `type`, `text`, `primaryCategory`, `functions`, `image` och `style`. Metoder kan ha `steps` (en lista med texter), men fungerar också som enbart text. Variabler fylls i muntligt. Den tidigare prototypens platta arrayformat med `category` stöds också.

`primaryCategory` är primärkategorin för bildval, medan `functions` kan innehålla flera funktioner. `lib/library.js` anpassar formatet vid inläsning utan att ändra källfilen. Bilden hämtas från kortets `image` om satt, annars från kategorins visuella inställningar i `data/categories.json`. Ange en relativ sökväg och gärna `imageAlt` för en individuell bild. `style` beskriver önskad konststil och genererar ingen bild automatiskt. De sex ursprungliga bildvärldarna har egna tillfälliga SVG-illustrationer. De sex nya använder en gemensam landskapsbild tills egna bilder finns. Filens föreslagna WebP-bilder saknas och används därför inte. De ursprungliga SVG-filerna kan återskapas med `python tools/build-art.py`.

Nya kategorier läggs till i `data/cards.json` under `categories` med unikt `id` och `name`. Lägg vid behov till visuella inställningar i `data/categories.json` med samma ID samt `description`, `icon`, `tint`, `image` och `alt`. Utan inställningar används standardbild. Framtida känslodimension och egna formuleringar är inte implementerade.

### Historik från den första prototypen

De nya kortens F001–F018 har andra texter än prototypens exempelkort. Vid uppgradering av den gamla IndexedDB-databasen från version 1 arkiveras därför exempelkortens historik under `DEMO-F001`–`DEMO-F018`. Inga bedömningar kopplas till fel fras och historiken kan fortfarande exporteras. Reservlagringen migreras till `frasbanken.history.v2` och originalet behålls. Importera inte gamla prototypsäkerhetskopior med F001–F018 som om de gällde det nya biblioteket; ändra i så fall dessa nycklar till DEMO-F001 osv. först.

## Verifiering

```sh
npm test
```

Tio automatiska tester verifierar samtliga 165 kort, bibehållen källdata, bilder/sökvägar, filter, viktning, undvikande av direkt upprepning, JSON-validering, sammanslagning och arkivering av prototyphistorik. Webbläsarkontroll av det nya biblioteket visar samtliga 12 kategorier och metoder utan steg. Tidigare kontroller: repetitionsflöde, beständighet efter omladdning, skavfilter, export till nedladdad JSON, återimport samt mobilvy vid 390 px. Fysisk iPhone/Safari och det faktiska GitHub Actions-arbetsflödet är ännu inte testade. Prototypen använder standardfunktioner för moderna webbläsare och kräver inte nätåtkomst till externa tillgångar, men har ingen särskild offlinelagring av själva webbplatsen.

## Tech Stack
HTML, CSS och JavaScript utan beroenden eller byggsteg. Statisk webbplats för GitHub Pages.

## Project Structure
index.html, styles.css, app.js, lib/, data/, assets/, tests/.

## Current Priority
Se JOURNAL.md.

## Future Ideas
Se IDEAS.md.


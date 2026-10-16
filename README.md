# Frasbanken 2.0

En digital konstkortlek för att göra samtalsfraser till sina egna. 165 kort i 12 kategorier, utan timer, poäng eller automatisk bedömning.

**App:** https://wglitch.github.io/Frasbanken/  
**Källkod:** https://github.com/wglitch/Frasbanken

## Användning

I vila syns konstverket och frasen samt en diskret meny (···). Säg frasen högt så länge du vill.

- Dra åt höger: tre korgar visas. Släpp med fingret/pekaren inne i Motstånd (överst, 3), Ovant (mitten, 2) eller Naturligt (nederst, 1).
- Släpp utanför: kortet går tillbaka utan att något sparas.
- Svep vänster: ångra senaste sorteringen och återställ det tidigare skavvärdet och repetitionstidpunkten. Ett tidigare obedömt kort blir obedömt igen.
- Svep uppåt: bibliotek med alla kategorier, repetitionsformer, historik, inställningar och Om appen.
- Menyn (···) erbjuder samma funktioner med knappar, även Nästa utan att bedöma. Tangentbord: vänsterpil ångrar, uppåtpil öppnar biblioteket och högerpil öppnar kortmenyn.

Ångring gäller sorteringar i den pågående kortleken. Ångring fungerar även efter kategoribyten. Import eller omladdning tömmer ångringskedjan men ändrar inte övrig sparad historik. Du kan alltid repetera ett bedömt kort och gradera om det. När bara ett kort matchar visas det igen efter sortering.

Bibliotekets kategorier och repetitionsform kombineras. Alla, Ovant & motstånd, Obedömda och Bedömda finns. Urvalet prioriterar obedömda, högre skav och äldre repetitioner med viktad slumpning, men blandar även in välbekanta kort och undviker omedelbar upprepning när alternativ finns.

Introduktionen visas en gång per webbläsare och kan stängas direkt eller öppnas från Om appen. Inställningen Minska rörelser kompletterar operativsystemets inställning för minskad rörelse.

## Kör lokalt

Med Node.js 22 eller senare:

```sh
npm start
```

Öppna http://127.0.0.1:47831. Ingen installation eller byggprocess behövs. Stoppa med Ctrl+C. Alternativ: `python -m http.server 47831 --bind 127.0.0.1`. Öppna appen via HTTP, inte genom att dubbelklicka på HTML-filen.

## Publicera på GitHub Pages

Den senaste lyckade publiceringen gjordes med **GitHub Actions**, via Publicera Frasbanken på grenen main. Samma flöde publicerar nu uppdateringar vid push till main. Alla appvägar är relativa och fungerar under `/Frasbanken/`.

Arbetsflödet finns i `.github/workflows/pages.yml` och kan även startas manuellt via **Actions → Publicera Frasbanken → Run workflow**. Välj **GitHub Actions** som källa under Settings → Pages. Flödet testar koden och publicerar endast appfilerna. Ingen backend eller API-nyckel krävs. Direktpublicering från main och rotmappen är också tekniskt möjlig eftersom appen saknar byggsteg och innehåller `.nojekyll`, men ska inte användas parallellt med Actions.

## Historik och integritet

IndexedDB-databasen `frasbanken`, version 2, object store `history`, behålls från version 1 av appen. Kort-ID är nyckel. Endast `{skav: 1|2|3|null, senast: ISO-tidpunkt}` sparas per avslutad repetition. localStorage (`frasbanken.history.v2`) används som reserv. Ångring återställer tidigare post eller tar bort en ny post atomiskt i samma lagringsmekanism. Vid skrivfel stannar kortet kvar och ett felmeddelande visas.

Historik skickas aldrig till någon server. Appen har ingen analys, inloggning eller externa bibliotek/fonttjänster. GitHub Pages levererar statiska filer och kan hantera vanliga anslutningsuppgifter, exempelvis IP-adress. Bildadresser begränsas till samma webbursprung, även för framtida kortbilder. Introduktionsflagga och rörelseinställning är också lokala.

Via biblioteket kan historiken exporteras som JSON och importeras på en annan enhet. Import validerar hela filen före skrivning (högst 5 MB), bevarar okända/borttagna ID:n och låter senaste repetitionen vinna. Vid lika tidpunkt behålls befintlig post. Historiken är bunden till webbläsare och webbursprung; rensning av webbdata eller privat läge kan ta bort den. Gör säkerhetskopior.

De ursprungliga prototypsfraserna F001–F018 skiljer sig från det nuvarande bibliotekets fraser. Deras historik arkiverades vid databasuppgradering under DEMO-F001–DEMO-F018. Den migrationen ändras inte i version 2.0. Importera inte gamla prototypbackuper med dessa ID:n utan att först prefixa dem med DEMO-.

## Kort och konstverk

`data/cards.json` är användarens oförändrade inventeringsutkast med `schemaVersion: 1`, `categories` och `cards`. Formuleringar och källmetadata är bevarade, inte språkgranskade. Kort har stabilt `id`, `type` (phrase/template/method), `text`, `primaryCategory`, `functions`, `image` och `style`. Metoder kan också ha `steps`. Byt aldrig betydelse på ett befintligt ID. Ordning och kategoribyten påverkar inte historiken.

Alla kategorier från biblioteket visas automatiskt. Visuella kategoriinställningar ligger i `data/categories.json`. Nya kategorier utan inställningar får en standardbild och behöver ingen kodändring.

Bildkedja: kortets `image` → kategorins `image` → eventuell `fallbackImage` → `assets/placeholder.svg` → neutral yta om även filen saknas. Använd relativa sökvägar, exempelvis `assets/cards/F001.webp`, och `imageAlt` för individuella bilder. Sätt vid behov `imageFit: "contain"` för att visa hela konstverket, eller `imagePosition: "35% 50%"` för beskärningens fokus. Samma visningsfält kan användas på kategoriinställningarna. `style` är metadata och skapar ingen bild automatiskt.

Ingen ny bildserie har genererats för 2.0. De befintliga tillfälliga illustrationerna ersätts separat med starkare konstverk. Originalbilderna kan återskapas med `python tools/build-art.py`.

## Arkitektur och verifiering

Vanlig HTML/CSS/JavaScript, inga paketberoenden. `app.js` hanterar vy och Pointer Events, `lib/deck.js` kortföljd/ångring, `lib/gestures.js` gestklassificering och träffytor, `lib/storage.js` beständig historik, `lib/artwork.js` lokal bildkedja, `lib/library.js` JSON-format och `lib/repetition.js` viktning/validering.

```sh
npm test
```

23 tester täcker biblioteket, bilder, filter, viktning, import/sammanslagning, sortering, sparfel, snabba upprepade handlingar, ångring med återställd tidpunkt, tomma urval, gestseparation och lokala bildadresser. Webbläsarkontroll i desktop- och 390 × 844-vy: dragning till alla tre korgar, återgång vid släpp utanför, vänstersvep, uppåtsvep, knappalternativ, sparad historik efter omladdning och introduktion en gång. Fysisk iPhone/Safari är ännu inte verifierad. Webbplatsen har ingen särskild offlinelagring av appfilerna.

Nästa steg finns i JOURNAL.md; framtida idéer i IDEAS.md.

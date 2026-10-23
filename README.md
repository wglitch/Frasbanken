# Frasbanken 2.8

En digital konstkortlek för att göra samtalsfraser till sina egna. 225 aktiva kort och 13 kategorier, utan timer, poäng eller automatisk bedömning.

**App:** https://wglitch.github.io/Frasbanken/  
**Källkod:** https://github.com/wglitch/Frasbanken

## Användning

I vila syns endast ett konstverk i helskärm och frasen ovanpå bilden. Bilden fyller skärmen med object-fit: cover; en mjuk mörk toning och längdanpassad vit text ger läsbarhet. Säg frasen högt så länge du vill.

- Gör ett kort riktningssvep från där fingret börjar: nordöst ↗ väljer Motstånd (3), öst → väljer Ovant (2) och sydöst ↘ väljer Naturligt (1). Ett drag på minst 56 skärmpixlar räcker. Molnet markerar valet; du behöver inte nå fram till det. Molnens storlek följer dragriktningen mjukt; mellan två riktningar växer båda grannmolnen. Vid släpp krymper de andra på cirka 180 ms och det valda på cirka 720 ms, tills alla försvinner automatiskt. Små rörelser nära riktningsgränsen behåller det markerade valet.
- Dra tillbaka nära startpunkten innan du släpper för att avbryta. Små rörelser registrerar inget.
- Svep vänster: ångra senaste sorteringen och återställ det tidigare skavvärdet och repetitionstidpunkten. Ett tidigare obedömt kort blir obedömt igen.
- Svep uppåt: bibliotek med alla kategorier, repetitionsformer, historik, inställningar och Om appen.
- Håll fingret stilla på kortet i ungefär en halv sekund, eller högerklicka, för samma funktioner med knappar, även Nästa utan att bedöma. Tangentbord: vänsterpil ångrar, uppåtpil öppnar biblioteket och högerpil öppnar kortmenyn. En skärmläsaråtkomlig menyknapp finns också och blir synlig när den får tangentbordsfokus.

Ångring gäller sorteringar i den pågående kortleken. Ångring fungerar även efter kategoribyten. Import eller omladdning tömmer ångringskedjan men ändrar inte övrig sparad historik. Du kan alltid repetera ett bedömt kort och gradera om det. När bara ett kort matchar visas det igen efter sortering.

Bibliotekets kategorier och repetitionsform kombineras. Välj flera kategorier samtidigt för att blanda deras kort; tydliga ramar och bockar visar urvalet. Alla kategorier återställer till hela leken. Urvalet sparas lokalt till nästa besök. Varje kategori har ett utsnitt ur befintlig konst och en kort funktionsförklaring. Alla, Ovant & motstånd, Obedömda och Bedömda finns. Urvalet prioriterar obedömda, högre skav och äldre repetitioner med viktad slumpning, men blandar även in välbekanta kort och undviker omedelbar upprepning när alternativ finns.

Vid högerdrag lossnar helskärmsbilden till ett lätt roterat kort med rundade hörn och skugga. Nästa kort förladdas bakom det aktiva med en reserverad slumpdragning genom samma repetitionsalgoritm; inget registreras innan sorteringen sparas. Utgående kort accelererar mot korgen på 200 ms, medan det inkommande glider från vänster på 280 ms med 20 ms förskjutning. Rörelserna överlappar till totalt 300 ms. Gester är låsta tills övergången är klar. Avbrutet svep återgår mjukt till helskärm. Minskad rörelse använder en 90 ms toning utan förflyttning; fingerdragningen följer fortfarande handen. Eventuell haptik används bara om webbläsaren stöder det.

Introduktionen visas en gång per webbläsare och kan stängas direkt eller öppnas från Om appen. Inställningen Minska rörelser kompletterar operativsystemets inställning för minskad rörelse.

Molnen visar bara symbolerna ϟ, ∿ och ◡. Betydelserna Motstånd, Ovant och Naturligt finns kvar i introduktionen, knappmenyn och för skärmläsare.

Inställningen **Visa hela konstverken** visar hela det stående konstkortet med bevarade proportioner och luft runtom där skärmens format kräver det. Georgia-texten och toningen ligger kvar på bilden; svep, förhandsvisning och ångring fungerar även här. Inställningen sparas lokalt. Avstängt fyller bilden åter hela skärmen.

Instruktionskort visas med kursiv rubrik och etiketten Instruktion. Talbara fraser och frasmallar behåller rak stil.

## Ikon och hemskärmsläge

I Safari på iPhone: öppna appen, välj Dela och Lägg till på hemskärmen. Öppna sedan med Frasbanken-ikonen. Manifest och Apple-metadata begär app-/helskärmsläge så att webbläsarens adressfält kan försvinna. iOS styr statusfältet med klocka, batteri och nätverk; dess fullständiga döljning kan inte garanteras. Ikonen finns som SVG och PNG, Apple-ikon i 180 × 180 och separat delningsbild i 1200 × 630. Ingen offlinelagring tillkommer med hemskärmsläget.

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

`data/cards.json` är det redaktionellt reviderade arbetsbiblioteket med `schemaVersion: 1`, `categories` och `cards`. Beslut finns i `reviews/2026-10-17-kortbeslut.md`; utgångna och parkerade kort bevaras i `data/archive/cards-2026-10-17.json` och `data/archive/cards-2026-10-18.json` och läses inte av appen. Kort har stabilt `id`, `type` (phrase/template/method), `text`, `primaryCategory`, `functions`, `image` och `style`. Metoder kan också ha `steps`; `notes` lagrar kommentarer och avsikt. Byt aldrig betydelse på ett befintligt ID. Ordning och kategoribyten påverkar inte historiken; historik för arkiverade kort bevaras också.

Alla kategorier från biblioteket visas automatiskt. Visuella kategoriinställningar ligger i `data/categories.json`. Nya kategorier utan inställningar får en standardbild och behöver ingen kodändring.

Bildkedja: kortets `image` → kategorins `image` → eventuell `fallbackImage` → `assets/placeholder.svg` → neutral yta om även filen saknas. Använd relativa sökvägar, exempelvis `assets/cards/F001.webp`, och `imageAlt` för individuella bilder. Använd `imagePosition: "35% 50%"` för beskärningens fokus, även på kategoriinställningar. Repetitionsvyn använder alltid cover för att fylla skärmen och bevarar bildens proportioner. `style` är metadata och skapar ingen bild automatiskt.

Alla 225 aktiva kort har egna WebP-konstverk i `assets/art/cards`, högst 1024 × 1536 pixlar. Tre reviderade motiv används för F041/F052/F060. PNG-original och granskningsgallerier behålls lokalt. De ursprungliga webbversionerna skapades med Pillow genom `python tools/build-card-webp.py --source-root "sökväg till lokala originalprojektet"`; filkopplingar, storlekar och kontrollsummor finns i `assets/art/manifest.json`. Endast aktuellt och nästa kort förladdas i repetitionsvyn.

Version 2.7 lägger till 74 text- och bildgodkända kort med nya ID:n A001–A074. Alla 151 äldre kort och bildfiler är oförändrade; historiknycklarna behålls. Återkopplingskategorin heter nu Spiraltrappan med samma kategori-ID `aterkoppla`. Schackbrädet (`ledarskap`) samlar ledarskap, mandat och ansvar. De nya korten använder samma Georgia-typografi som de äldre. Kopplingen från granskningsnummer till slutligt kort-ID finns i `reviews/2026-10-23-tillskott.json`. De nya WebP-filerna kopieras från den godkända lokala bildproduktionen; hela webbuppsättningen är cirka 81,64 MiB. PNG-original, prompter och granskningsgallerier behålls lokalt utanför webbplatsen.

## Arkitektur och verifiering

Vanlig HTML/CSS/JavaScript, inga paketberoenden. `app.js` hanterar vy och Pointer Events, `lib/deck.js` kortföljd/ångring och skrivskyddad förhandsvisning, `lib/card-motion.js` överlappande animationer och animationslås, `lib/gestures.js` gestklassificering och riktningsval, `lib/storage.js` beständig historik, `lib/artwork.js` lokal bildkedja, `lib/library.js` JSON-format och `lib/repetition.js` viktning/validering.

```sh
npm test
```

45 tester täcker biblioteket, bilder, filter, viktning, import/sammanslagning, sortering, sparfel, snabba upprepade handlingar, ångring med återställd tidpunkt, tomma urval, gestseparation, lokala bildadresser, oförändrat korturval vid förhandsvisning, parallella animationer, animationslås, avbrott och minskad rörelse. Webbläsarkontroll i desktop- och 320 × 568-vy av helskärmskonst, längdanpassning, 225 WebP-filer med kontrollsummor, förladdat nästa kort, övergångar, återgång utanför, ångring, bibliotek och minskad rörelse. Tidigare kontroll i 390 × 844-vy: dragning till alla tre korgar, återgång vid släpp utanför, vänstersvep, uppåtsvep, knappalternativ, sparad historik efter omladdning och introduktion en gång. Fysisk iPhone/Safari är ännu inte verifierad. Webbplatsen har ingen särskild offlinelagring av appfilerna.

Nästa steg finns i JOURNAL.md; framtida idéer i IDEAS.md.

# Current Next Step

Provkör helskärmskonsten och sorteringens rörelsekänsla på fysisk iPhone/Safari. Kontrollera safe areas, långtrycksmeny och korgarnas precision i handen. Bildproduktion och övriga funktioner ligger utanför denna iteration.

# Elevator Pitch
Frasbanken är en lugn repetitionsplats där samtalsfraser får bli en naturlig del av användarens eget språk.

# Journal

## 2026-10-17 – Helskärmskonst och kortanimation

Done: Repetitionsvyn fyller skärmen utan ram, marginaler eller synliga kontroller. Frasen ligger över konstverket med läsbarhetstoning och anpassad storlek. Högerdrag lyfter ett fysiskt kort över ett förladdat nästa kort. Sortering ger en 200 ms utgående swoosh och 280 ms inkommande rörelse från vänster, överlappande till 300 ms. Animationen låser mot dubbelregistrering, avbrott städar lager och minskad rörelse tonar i 90 ms. Menyn nås med långtryck, högerklick, tangentbord och skärmläsare. 29 tester passerar. Desktop och 320 × 568 kontrollerade för stor text, cover, alla korgar, ångring, släpp utanför, bibliotek och minskad rörelse.

Learned: Förhandsbilden måste använda samma reserverade slumpdragning och samma urvalsalgoritm som nästa kort. Absolut positionerade gradienter får inte skapa falsk skrollhöjd som krymper texten. Rotationsankaret behålls under återgången för att undvika ett litet hopp.

Next: Publicera via befintligt GitHub Actions-flöde och verifiera webbadressen. Därefter fysisk iPhone/Safari-kontroll med användaren.

Open Questions: Fysisk iPhone/Safari och verkliga safe areas är ännu inte verifierade. JSON, lokal lagring, kategorier och repetitionsregler är oförändrade. Ingen ny bildproduktion.

## 2026-10-16 – Frasbanken 2.0

Done: Huvudvyn ombyggd till en digital konstkortlek med endast bild, fras och diskret knappalternativ. Pointer Events ger högerdrag till tre korgar, återgång utanför, vänstersvep som återställer historik och uppåtsvep till biblioteket. Alla kategorier visas automatiskt i ett skrollbart rutnät. Introduktion en gång, Om appen med integritetstext, lokala bildfallbacks och förberedda bildinställningar tillagda. 165 källkort och befintligt historikformat bevarade. 23 tester passerar. Gestflödet verifierat i webbläsare vid desktop och 390 × 844, inklusive alla korgar, ångring, släpp utanför, sista kategorin, knappsortering, beständighet efter omladdning och återöppnad introduktion.

Learned: Ångring behöver återställa både skav och senaste tidpunkt, eller ta bort en ny historikpost. Biblioteket får inte ha horisontellt dolda kategorier. Konstproduktionen är en separat uppgift. Bilder begränsas till samma webbursprung och historik skickas inte till servern.

Next: Fysisk iPhone/Safari-kontroll med användaren. Publicering slutförd: commit f2d8c0b047e0abf9cbfe01ca3bc6d9991d7810da, Actions run 38935625970 lyckades. Den publika sidan verifierades med HTTP 200, ny kortvy, 165 kort och 12 kategorier. Inga konsolfel i den publicerade vyn. Denna resultatanteckning sparas lokalt för nästa session.

Open Questions: Fysisk iPhone/Safari och nya konstverk återstår. Kontroll av GitHub visade att den senaste lyckade publiceringen kördes av Publicera Frasbanken (run 38929568455). Actions-flödet behåller därför automatisk publicering från main, och ingen Pages-inställning har ändrats av agenten.

## 2026-10-16 – Första versionen live, session avslutad

Done: Frasbanken är live på https://wglitch.github.io/Frasbanken/ via GitHub Pages från main och rotmappen. Verifierat HTTP 200 samt tillgängligt kortbibliotek med 165 kort och 12 kategorier. Användaren samlar nu tankar inför nästa version.

Learned: Den bygglösa appen kan publiceras direkt från main. GitHub Actions behöver inte aktiveras för den nuvarande lösningen.

Next: Gå igenom användarens återkoppling och välj nästa konkreta förbättring innan ny implementation.

Open Questions: Återkoppling på repetitionsupplevelsen, bildvärldarna och korttexterna kommer senare. GitHub Actions finns förberett men användaren vill vänta med att byta publiceringssätt. Denna sessionsanteckning har endast sparats lokalt.

## 2026-10-16 – GitHub

Done: Publikt repository wglitch/Frasbanken skapat av användaren och initialiserat via GitHub-anslutningen. Samtliga 27 projektfiler är uppladdade till main, inklusive 165 kort, bilder, tester och Pages-arbetsflöde. Uppladdningen verifierades via GitHubs offentliga API och råfilen för kortbiblioteket. Tio tester passerar lokalt.

Learned: Repositoryts namn har stor begynnelsebokstav: Frasbanken. Det var tomt och behövde ett första commit före samlad uppladdning.

Next: Användaren väljer GitHub Actions under Settings → Pages och startar Publicera Frasbanken manuellt under Actions. GitHub visar ännu inga workflow-körningar och den förväntade webbplatsadressen svarar 404.

Open Questions: Pages-inställningen kräver användarens inloggade GitHub-session. Den tillgängliga webbläsaren är utloggad och anslutningen saknar verktyg för Pages-inställningar.

## 2026-10-16 – Inlagt kortbibliotek

Done: Användarens JSON med 165 kort i 12 kategorier är inlagd oförändrad. Inläsningen stöder primaryCategory, källmetadata och metoder utan separata steg. Sex nya kategorier har symboler och gemensam tillfällig landskapsbild. Gamla exempelkorts historik arkiveras separat för att undvika ID-kollisioner. Tio tester passerar och alla kategorier samt metodvisningen har verifierats i webbläsaren.

Learned: Källfilens F001–F018 betyder andra fraser än de första exempelkorten. Befintlig prototyphistorik får inte kopplas till dem. GitHub-anslutningen kan skriva filer men saknar möjlighet att skapa repositoryn; Git saknar en befintlig lokal GitHub-inloggning.

Next: Användaren skapar frasbanken på GitHub med README, därefter laddar vi upp alla projektfiler och kontrollerar Actions.

Open Questions: Repositoryt wglitch/frasbanken saknas fortfarande eller är inte tillgängligt via anslutningen (404). Publik synlighet är godkänd. Vissa korttexter behöver senare granskas; de har bevarats ordagrant.

## 2026-10-16
Done: Projektets dokumentstruktur skapad från de gemensamma mallarna före första kodändringen. Körbar statisk prototyp med 18 testkort, sex egna SVG-illustrationer, tre korttyper, filtrering, viktat urval, IndexedDB med reservlagring och export/import. GitHub Pages-arbetsflöde och README klara. Åtta tester passerar. Webbläsarkontroll av mobilvy, repetition, omladdning, skavfilter, nedladdad export och återimport genomförd.

Learned: Historiken kan hållas fristående från kortbiblioteket och sparas först vid Nästa kort. Lokal förhandsvisning använder port 47831 för att undvika tidigare webbplatscache på en annan port.

Next: Fysisk iPhone-kontroll och användarens första provrepetition. Inget GitHub-repository har valts och ingen publicering har gjorts.

Open Questions: Slutliga bilder och fraser tillhandahålls senare. Arbetsmappen behålls tills en flytt kan godkännas.


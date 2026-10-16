# Current Next Step

Provkör Frasbanken 2.0 på fysisk iPhone/Safari, särskilt släppytornas precision och svepgester. Samla återkoppling på kortkänslan. Nya konstverk tas fram separat; fortsätt publicera direkt från main och / (root).

# Elevator Pitch
Frasbanken är en lugn repetitionsplats där samtalsfraser får bli en naturlig del av användarens eget språk.

# Journal

## 2026-10-16 – Frasbanken 2.0

Done: Huvudvyn ombyggd till en digital konstkortlek med endast bild, fras och diskret knappalternativ. Pointer Events ger högerdrag till tre korgar, återgång utanför, vänstersvep som återställer historik och uppåtsvep till biblioteket. Alla kategorier visas automatiskt i ett skrollbart rutnät. Introduktion en gång, Om appen med integritetstext, lokala bildfallbacks och förberedda bildinställningar tillagda. 165 källkort och befintligt historikformat bevarade. 23 tester passerar. Gestflödet verifierat i webbläsare vid desktop och 390 × 844, inklusive alla korgar, ångring, släpp utanför, sista kategorin, knappsortering, beständighet efter omladdning och återöppnad introduktion.

Learned: Ångring behöver återställa både skav och senaste tidpunkt, eller ta bort en ny historikpost. Biblioteket får inte ha horisontellt dolda kategorier. Konstproduktionen är en separat uppgift. Bilder begränsas till samma webbursprung och historik skickas inte till servern.

Next: Publicera den verifierade ändringen på main och kontrollera Pages. Därefter fysisk iPhone/Safari-kontroll med användaren.

Open Questions: Fysisk iPhone/Safari och nya konstverk återstår. Pages fortsätter från main; det förberedda Actions-flödet startas nu bara manuellt så att det inte konkurrerar med nuvarande publicering.

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


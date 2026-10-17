# Current Next Step

Verifiera publiceringen av Frasbanken 2.2 och prova sedan på fysisk iPhone/Safari: nya konstverk, textöverlägg, svep och skrollning av långa instruktioner. 151 WebP-bilder är kopplade till aktiva kort, totalt 50.09 MiB; originalen är lokalt bevarade. Molnområden och bibliotekssvep från nederkanten återstår som separata förbättringar.

# Elevator Pitch
Frasbanken är en lugn repetitionsplats där samtalsfraser får bli en naturlig del av användarens eget språk.

# Journal

## 2026-10-18 – Webbkonst och publiceringskandidat 2.2

Done: Konverterat 151 aktiva kortbilder till WebP vid högst 1024 × 1536 och kvalitet 82, totalt 50.09 MiB. De tre v2-motiven används; varje kort har image och imageAlt. Originalen bevaras lokalt och hålls utanför Git. Reproducerbart konverteringsverktyg och manifest med kontrollsummor tillagda. Appens cacheversion och information uppdaterade till 2.2. Alla 30 tester passerar. Samtliga 151 bilder avkodas i webbläsare; två kortbilder laddas vid start. Sortering och ångring för alla tre betyg, bibliotekets 12 kategorier och 320 × 568, 390 × 844 samt 1280 × 900 verifierade utan sidledsöverflöd eller konsolfel.

Learned: Full bildupplösning kan behållas med ungefär 89 procent mindre total filstorlek jämfört med första PNG-samlingen. På små skärmar blir långa instruktioner skrollbara i befintlig layout.

Next: Pusha och verifiera GitHub Pages-publiceringen, därefter fysisk iPhone/Safari-kontroll.

Open Questions: Molnområden och bibliotekssvep från nederkanten är separata kommande ändringar. Den verkliga iPhone-vyn återstår att kontrollera.


## 2026-10-18 – Återkoppling på konstkort

Done: Infört 13 granskningspunkter: tre texträttningar, kategoribyte för F041, instruktionslayout, fler komplimanger och parkering av W001/N025. Skapat tre separata v2-bildförslag med inbyggd image_gen och ett ändringsunderlag i HTML/PDF med 13 kort och bevarade granskningsnummer. 29 tester och mobilkontroller passerar. Ingen publicering.

Learned: Instruktioner behöver en tydlig visuell skillnad mot repliker. Kategorimotivet ska stödja frasens avsikt, och granskningsnummer måste vara stabila även när kort parkeras.

Next: Samla reaktion på ändringsunderlaget och de nya bildförslagen före webboptimering.

Open Questions: Är motiv och beskärning för 041/052/060 rätt? Ska de åtta komplimangexemplen delas upp i egna kort?


## 2026-10-18 – Distansgranskning

Done: Skapat en fristående HTML med inbäddade bilder och en PDF med 153 sidor, en per aktivt kort. Fast granskningsnummer 001–153, kort-ID, frasöverlägg och mobilbeskärning 390 × 844. HTML stöder sökning, kategorifilter, dold text och helbild. Samtliga 153 bilder och textytor samt kontroller verifierade i webbläsare; PDF-sidantal och stickprov på layout kontrollerade. Filerna ligger i reviews/art/full-library-v1/distansgranskning och har kopierats till G:\Min enhet\Frasbanken - bildgranskning. Appen är inte ändrad eller publicerad.

Learned: Google Drive är monterad som G:, men ingen befintlig Frasbanken-bildmapp hittades där. PDF lämpar sig för genomgång på distans; HTML öppnas i webbläsare efter nedladdning. Granskningen visar appens textstil och toning, men verklig iPhone kan skilja sig i typsnitt och skärmyta.

Next: Samla användarens kommentarer med granskningsnummer och kort-ID; ändra utpekade motiv eller överlägg före webboptimering och integration.

Open Questions: Synkronisering till Drive-molnet och visning på användarens telefon behöver bekräftas av användaren.


## 2026-10-17 – Konst till hela kortleken

Done: Skapat 150 nya konstverk med inbyggd bildgenerering och återanvänt tre godkända Pausknappen-bilder; samtliga 153 aktiva kort i 11 kategorier har nu egna stående PNG-original. Sparat bildinstruktioner, filkopplingar och ett galleri med kategorifilter, sökning, frasöverlägg och mobilbeskärning. Verifierat 153 unika bildfiler, korrekta ID:n, korttexter och kategorier samt galleriets funktioner. Alla 29 apptester passerar. Ingen publicering eller inkoppling i appen.

Learned: Ett framträdande gemensamt kategorimotiv kan varieras med individuella scener och konststilar. Originalen är tillsammans cirka 467 MB och behöver optimerade webbversioner före publicering. Bildinstruktionerna är sparade för riktade förbättringar.

Next: Granska galleriet översiktligt tillsammans och provkör beskärning och läsbarhet på telefon; optimera och integrera därefter bilderna.

Open Questions: Visuell webbläsarkontroll kunde inte startas i miljön; fysisk iPhone-kontroll återstår. Detta är en första bildomgång och alla motiv har inte detaljgranskats. Stafettpinnen saknar aktiva kort och har därför inga nya individuella bilder.

## 2026-10-17 – Första konstprovet för Pausknappen

Done: Genererat tre stående konstförslag med inbyggd bildgenerering, sparade med fullständiga bildinstruktioner i reviews/art/pausknappen-v1. F010 visar en bro tillbaka, F028 fruset vatten och F077 en gemensam paus i samtalstrassel. Ingen fras är inbakad i bilderna och inga bilder har kopplats in i appen eller publicerats.

Learned: Användarens princip är ett gemensamt, framträdande huvudmotiv – här en stor pausknapp – som omtolkas per fras genom scen, detaljer och konststil. De två första förslagen ligger närmare måleriska landskap, medan det tredje tydligare varierar formspråket med kubistiska former.

Next: Samla användarens reaktion på de tre förslagen före vidare produktion och mobil beskärningskontroll.

Open Questions: Är motivets storlek, stilvariationen och graden av surrealism rätt? Förslagen är ännu inte provade med frasöverlägg i appen.

## 2026-10-17 – Kortbeslut efter användarens genomgång

Done: Infört överenskomna rättningar och bevarat avsiktlig skärpa, dubbeltydighet, pivotering och nejorienterade frågor. Biblioteket har 153 aktiva kort efter 11 utgångna och 3 parkerade kort samt två nya repliker med ID N040/N041. Originalbibliotek, arkiv och beslutslista är sparade. Alla 29 tester passerar; arkivtäckning, 25 bevarade originaltexter och historik för utgångna ID:n har verifierats. Ingen publicering eller bildproduktion har gjorts.

Learned: F066 och F069 är instruktioner; F072 är fysisk gränssättning enligt beteende–reaktion–uppmaning. F059 ger utrymme att backa från ett drastiskt uttalande. Metodernas och frasernas avsikt behöver bevaras även när en mildare omskrivning verkar språkligt enklare.

Next: Prova en gemensam bildvärld för sex fraser i Pausknappen; lämna instruktionerna F066/F069 utanför det första konstprovet.

Open Questions: F072:s förslag finns aktivt med originalet sparat i notes. Namnet Spegelverkstaden är provisoriskt. Hänvisningarna till F093 och F101 tolkades som F092 respektive F102; båda kortparen har behållit originaltexten. Stafettpinnen är tills vidare tom.

## 2026-10-17 – Redaktionell genomgång av kortbiblioteket

Done: Granskat samtliga 165 kort i 12 kategorier och sparat originaltext, förslag och motivering per kort i reviews/2026-10-17-kortgranskning.md; 57 kort utan konkret ändringsförslag och 108 med rättning, förtydligande eller diskussionspunkt. App, JSON och historik är oförändrade.

Learned: Åtta kort har tydliga textfel, varav sju behöver originalkällan för säker återställning. De två delegeringskorten handlar snarare om kriterier och återkoppling. Metodkorten blandar övningar med principer, engelska minnesord och kroppssignaler.

Next: Ta ställning till textfelen och kategoriförslagen före ändringar; välj därefter sex färdiggranskade fraser för ett konstprov inom en bildvärld.

Open Questions: Originaltexterna bakom F043/F046, F066/F069/F072 och F081/F084 behöver kontrolleras. Vilka skarpa tonvarianter och metodkort ska ingå i den första konstomgången?

## 2026-10-17 – Helskärmskonst och kortanimation

Done: Repetitionsvyn fyller skärmen utan ram, marginaler eller synliga kontroller. Frasen ligger över konstverket med läsbarhetstoning och anpassad storlek. Högerdrag lyfter ett fysiskt kort över ett förladdat nästa kort. Sortering ger en 200 ms utgående swoosh och 280 ms inkommande rörelse från vänster, överlappande till 300 ms. Animationen låser mot dubbelregistrering, avbrott städar lager och minskad rörelse tonar i 90 ms. Menyn nås med långtryck, högerklick, tangentbord och skärmläsare. 29 tester passerar. Desktop och 320 × 568 kontrollerade för stor text, cover, alla korgar, ångring, släpp utanför, bibliotek och minskad rörelse.

Learned: Förhandsbilden måste använda samma reserverade slumpdragning och samma urvalsalgoritm som nästa kort. Absolut positionerade gradienter får inte skapa falsk skrollhöjd som krymper texten. Rotationsankaret behålls under återgången för att undvika ett litet hopp.

Next: Fysisk iPhone/Safari-kontroll med användaren. Version 2.1 är publicerad: commit 2c8dd15ee1718f1007c6e2dac5a4a5adce837a08, Actions run 38985756531 lyckades. HTTP 200, helskärmslayout, cover, laddade bilder/förhandsbild, 165 kort och 12 kategorier verifierade på den publika adressen. Inga konsolfel. Förhandsbild sparad i preview.jpg. Resultatanteckningen sparas lokalt för nästa session.

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


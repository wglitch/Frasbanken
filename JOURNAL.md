# Current Next Step

Kontrollera GitHub Actions efter uppladdning till det publika repositoryt wglitch/Frasbanken. Aktivera GitHub Pages med GitHub Actions som källa om det inte redan är gjort. Därefter provkör på en fysisk iPhone.

# Elevator Pitch
Frasbanken är en lugn repetitionsplats där samtalsfraser får bli en naturlig del av användarens eget språk.

# Journal

## 2026-10-16 – GitHub

Done: Publikt repository wglitch/Frasbanken skapat av användaren och initialiserat via GitHub-anslutningen. Projektet har förberetts för en samlad uppladdning med samtliga 165 kort, bilder, tester och Pages-arbetsflöde. Tio tester passerar lokalt.

Learned: Repositoryts namn har stor begynnelsebokstav: Frasbanken. Det var tomt och behövde ett första commit före samlad uppladdning.

Next: Verifiera uppladdningen och kontrollera Actions samt Pages.

Open Questions: GitHub Pages kan behöva aktiveras under repositoryts Settings → Pages.

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


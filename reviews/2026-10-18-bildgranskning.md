# Beslut efter bildgranskning 2026-10-18

Numren hänvisar till den första granskningsomgången med 153 kort. Ursprungligt granskningsunderlag och bildmanifest bevaras oförändrade. Appens aktiva bibliotek har nu 151 kort. Ingen publicering har gjorts.

| Granskningsnummer | Kort-ID | Åtgärd |
| --- | --- | --- |
| 006 | F006 | Mildrat till: Det vill jag inte gå in på. Nu går vi vidare. Användaren godkände uttryckligen formuleringen. |
| 041 | F041 | Primär kategori Utgången; utforska kvar som sekundär funktion. Nytt bildförslag med en sista fråga vid utgången. Frasen är oförändrad. |
| 045 | F045 | Instruktion markeras med kursiv rubrik och etiketten Instruktion. |
| 052 | F052 | Nytt bildförslag: ägaren väljer lugnt bort ett erbjudande som inte passar i den egna trädgården. |
| 060 | F060 | Nytt bildförslag: flera fungerande portar ställs mot en sönderslagen mur; tydlig tillrättavisning av metoden. |
| 062 | F062 | Instruktionslayout. |
| 066 | F066 | Instruktionslayout. |
| 069 | F069 | Instruktionslayout. |
| 105 | W001 | SOAR parkerat efter uttryckligt godkännande. ID och original finns i data/archive/cards-2026-10-18.json. |
| 108 | W007 | För det första … För det andra … Och till sist … |
| 109 | W008 | Fyra fler komplimangexempel tillagda, totalt åtta. Instruktionen är kursiv och exemplen raka. Bedöm gärna om exemplen senare ska delas upp i egna kort. |
| 137 | N025 | Evidence–Conclusion–Decision parkerat efter uttryckligt godkännande; modellen återkommer i svenska frasmallar på andra kort. |
| 149 | N037 | Kan du förklara vad du ändrade så att inte du behöver göra samma ändring nästa gång? |

Instruktionslayouten gäller alla kort med type method, även bakomvarande förhandskort. Fras och template behåller rak stil. Historik och urvalslogik är oförändrade. Tre nya bilder ligger som separata v2-filer i reviews/art/revisions-2026-10-18 och har ännu inte ersatt originalen eller kopplats in i appen. Bildinstruktioner finns i samma mapps prompts.json; inbyggd image_gen användes.

Verifiering: 29 tester passerar, inklusive arkivtäckning i bibliotekstestet. Instruktionskort F045/F066/W008 och frasmall W007 kontrollerade i webbläsare vid 390 x 844 utan textklippning. Ändringsunderlagets 13 kort renderade utan textklippning; PDF och nya bildförslag visuellt stickprovskontrollerade. Google Drive-kopior kontrolleras mot lokala filer med SHA-256. Synkronisering till molnet behöver bekräftas av användaren.
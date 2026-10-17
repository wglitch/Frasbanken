# Frasbanken – genomförda kortbeslut

Datum: 2026-10-17. Bygger på användarens svar på den första kortgranskningen.

## Resultat

- 153 aktiva kort; 11 utgångna kort och 3 parkerade kort sparas i data/archive/cards-2026-10-17.json.
- Två nya repliker har fått nya ID:n: N040 (avbryta och sammanfatta) och N041 (avvisa en tolkning). N017 finns kvar.
- Ursprungsversionen med 165 kort finns i reviews/cards-before-2026-10-17.json. Den äldre granskningsrapporten är ett historiskt underlag; denna beslutslista gäller vid skillnader.
- JSON-strukturen, lagringen och repetitionslogiken är oförändrade. Borttagna kort-ID:n återanvänds inte. Befintlig historik för dem finns kvar i webbläsaren och i historikexporten.
- De 12 kategorierna finns kvar. Stafettpinnen är nu tom efter omplacering till frågor respektive återkoppling; inga nya kategorier eller namn har införts.
- Ändringarna är lokala och ännu inte publicerade.

## Bevarad avsikt

Raka uppmaningar, skarpa gränser, pivotering och avsiktlig dubbeltydighet är träningsvärden, inte generella språkfel. Original som användaren valt att behålla har bevarats, även om en tidigare språkgranskning föreslog en mildare eller mer öppen formulering. W018–W022 är avsiktligt nejorienterade frågor.

## Tolkningar och öppna val

- Kommentaren om oklart tempus hänvisade till F093, men beskrev F092. Både F092 och F093 har behållit originaltexten.
- Kommentaren om vad respektive hur man tänkte hänvisade till F101, men beskrev F102. Både F101 och F102 har behållit originaltexten.
- F072 använder förslaget ”Du har handen på min axel. Jag gillar inte det. Ta bort handen.” Användarens återställda original finns i notes; välj originalet om dess rytm föredras.
- F096 ligger kvar i återkopplingskategorin; namnet Spegelverkstaden är öppet för diskussion.
- N011 har ett konkret exempel på känsla, hantering och tacksamhet; exempeltexten är testdata, inte ett påstående om användaren.
- W008 har fyra återställda exempel på processinriktad uppmuntran. Ingen större utökning görs nu.
- F023 ligger kvar i Pausknappen. Ingen särskild ändring av dess kategoritillhörighet har begärts.

## Utgångna och parkerade kort

| ID | Beslut | Kommentar |
| --- | --- | --- |
| W003 | Utgår ur aktiv lek | Den nya frasen N040 får eget ID; metodkortet arkiveras. |
| W004 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| W005 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| W009 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| W014 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| W016 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| N005 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| N012 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| N018 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| N019 | Utgår ur aktiv lek | Originalet bevaras i arkivet. |
| N020 | Utgår ur aktiv lek | Principen flyttad till notes på N027. |
| W011 | Parkerat | Utanför nuvarande frasövning; originalet bevaras för senare diskussion. |
| W013 | Parkerat | Utanför nuvarande frasövning; originalet bevaras för senare diskussion. |
| W015 | Parkerat | Utanför nuvarande frasövning; originalet bevaras för senare diskussion. |

## Aktiva kort som ändrats

Även ändrad typ, kategori, funktionstagg och notes räknas som en ändring.

| ID | Före | Nu | Övriga ändringar |
| --- | --- | --- | --- |
| F006 | Det har inte du med att göra, nästa fråga. | Det har inte du med att göra. Nästa fråga. | primaryCategory: grans; functions: grans |
| F009 | Hur tänkte du… | Hur tänkte du när …? |  |
| F011 | Vi får återuppta detta ett annat tillfälle. | Vi får återuppta det här vid ett annat tillfälle. | primaryCategory: pausa; functions: pausa |
| F016 | Jag stoppar där. | Jag stoppar där. | notes: Jag stoppar där innebär att jag skulle kunna säga mer men väljer att stanna. Det lämnar plats för följdfrågor och är mindre definitivt än att avsluta. |
| F017 | Det känns obekvämt när du frågar det. | Det känns obekvämt när du frågar det. | primaryCategory: grans; functions: grans |
| F020 | Det låter som det finns mer här | Det låter som att det finns mer här. |  |
| F022 | Jag är inte säker på vad du frågar egentligen… | Jag är inte säker på vad du frågar egentligen. | type: phrase; notes: Dubbeltydigheten är avsiktlig: vad du egentligen frågar är inte samma sak som vad du menar med frågan. |
| F028 | Det måste jag få tänka på en stund. Ge mig ett ögonblick… | Det behöver jag tänka på en stund. Ge mig ett ögonblick. | type: phrase |
| F029 | Det jag ska säga nu kan vara svårt att greppa så ha lite tålamod med mig. | Det jag ska säga nu kan vara svårt att greppa så ha lite tålamod med mig. | notes: Behåll att det som ska sägas är svårt att greppa; svårigheten är själva poängen, inte en brist som ska skrivas bort. |
| F037 | Vad tror du det här säger om dig? | Vad har du lärt dig om dig själv av det här? |  |
| F039 | Det låter som det finns fler lager här… | Det låter som att det finns fler lager här. | type: phrase |
| F041 | Det är några andra här som jag också vill prata med, men först vill jag fråga dig om det där du sa. | Innan jag går vidare vill jag fråga om det du sa. |  |
| F042 | Av anledning X lämnar jag den här konversationen nu. | Jag lämnar samtalet nu eftersom … |  |
| F043 | Vad skulle du säga är den röda tråden? Jag kommer lämna det | Vad skulle du säga är den röda tråden? | primaryCategory: utforska; functions: utforska |
| F045 | Spegla (återupprepa några utvalda ord) | Upprepa några av den andres ord och ge plats för ett svar. |  |
| F046 | här samtalet nu, när du är redo att fortsätta på ett konstruktivt sätt kan du höra av dig. | Jag kommer lämna det här samtalet nu men fortsätter gärna på ett konstruktivt sätt när du är redo för det. | primaryCategory: avsluta; functions: avsluta / grans; notes: Återställd och omformulerad av användaren 2026-10-17; ursprungstexten var delad mellan F043 och F046. |
| F048 | Intressant fråga, men det viktiga här är ju... | Intressant fråga, men det viktiga här är ju... | notes: Avsiktlig pivot: avfärda frågan med en artighetsfras och för samtalet tillbaka till det viktiga. |
| F049 | Vad får dig att tro att du har rätt? | Vad grundar du din uppfattning på? |  |
| F053 | Jag känner mig attackerad/kritiserad kan du säga det där på ett annat sätt? | Jag känner mig attackerad. Kan du säga det på ett annat sätt? | primaryCategory: grans; functions: grans |
| F054 | Behandla mig inte som en karikatyr, tillskriv mig inte åsikter som jag inte har uttryckt. | Tillskriv mig inte åsikter som jag inte har uttryckt. |  |
| F057 | När du sa … så förändrades ditt tonfall, hur kommer det sig? | Jag lade märke till att ditt tonfall ändrades när du sa … Vad hände där? |  |
| F058 | Det är inte mitt ansvar, du borde prata med X. | Det ligger inte inom mitt ansvar. Du kan prata med … |  |
| F059 | Hörde jag dig rätt, kan du upprepa? | Hörde jag rätt, kan du säga det igen? | notes: Ger samtalspartnern möjlighet att backa från ett drastiskt uttalande; uttrycker inte främst osäkerhet om vad som hördes. |
| F060 | Det finns många sätt att göra rätt på, men det där var inte ett av dem. | Det finns många sätt att göra rätt på, men det där var inte ett av dem. | primaryCategory: grans; functions: grans; notes: Avsiktligt tillrättavisande: flera sätt kan vara rätt, men just detta sätt avvisas. Behåll originaltexten. |
| F062 | Det får mig att tänka på… (kort) plus fråga tillbaka (typ: vad har du för råd?) | Knyt kort an till en egen erfarenhet och ställ sedan en fråga tillbaka. | type: method; primaryCategory: relation; functions: relation |
| F064 | Det var olyckligt (att det hände/att du valde dom orden) | Det var olyckligt. | primaryCategory: konflikt; functions: konflikt; notes: Brett uttryck i konflikt, inte begränsat till medkänsla. |
| F066 | Var berättarrösten. Beskriv sker som vad nu precis | Beskriv det som sker precis just nu. | primaryCategory: pausa; functions: pausa / styra; notes: Instruktion, inte en replik. Används för att förtydliga det pågående samspelet och vinna tid att formulera sig. Originalinstruktionen var kursiverad. |
| F068 | Du nämnde … berätta mer om det. | Du nämnde … Berätta mer om det. | functions: utforska / spegla |
| F069 | VAR TYST (och vänta på fortsättning) Vid oacceptabla beteenden: beteendet säg hen hur neutralt och säg | Var tyst och vänta på fortsättning. | notes: Instruktion. Det efterföljande textfragmentet i inventeringen hörde till F072 och har tagits bort här. |
| F070 | Låt mig förtydliga vad jag hörde innan jag svarar... | Låt mig förtydliga vad jag hörde innan jag svarar... | notes: Avsikten är att förtydliga vad jag hörde så att det blir tydligt för samtalspartnern. Behåll förtydliga, inte det mer neutrala återge. |
| F071 | Jag ska ta en stund och reflektera över hur jag ska svara på det här. | Jag behöver en stund för att tänka på hur jag vill svara. |  |
| F072 | ("Din göra hand rätt. ska axel, det gillar min på är bort den.") inte jag, ta | Du har handen på min axel. Jag gillar inte det. Ta bort handen. | primaryCategory: grans; functions: grans; notes: Fysisk gränssättning: beteende – reaktion – uppmaning. Användarens återställda original: ”Din hand är på min axel. Jag gillar inte det. Ta bort den.” Nuvarande text är ett språkligt förslag; originalet bevaras här. |
| F076 | Jag förstår inte frågan, och skulle uppskatta om du kunde förtydliga den. | Jag förstår inte frågan, och skulle uppskatta om du kunde förtydliga den. | notes: Behåll originalets tydliga begäran om ett förtydligande. |
| F077 | Det känns som att den här konversationen inte leder någonvart just nu, jag föreslår en paus. | Det känns som att vi inte kommer vidare just nu. Kan vi ta en paus? |  |
| F078 | Jag har svårt att förstå hur det du säger är relevant för det vi pratar om, kan vi komma tillbaka till ämnet? | Jag ser inte kopplingen till det vi pratade om. Kan vi återgå till ämnet? |  |
| F080 | Vad döljer du? | Vad mer behöver jag känna till? |  |
| F081 | Hur kan det här påverka andra på lång sikt? Jag förstår att du har | Hur kan det här påverka andra på lång sikt? |  |
| F082 | Jag vet vad jag såg/hörde/upplevde (Återupprepa vid behov) | Jag vet vad jag upplevde. | primaryCategory: grans; functions: grans |
| F084 | starka känslor kring det här, men det är inte acceptabelt att uttrycka sig på det sättet. | Jag förstår att du har starka känslor kring det här, men det är inte acceptabelt att uttrycka sig på det sättet. |  |
| F085 | Varför försvarar du det här så hårt? | Hur kommer det sig att det här är så viktigt för dig? |  |
| F086 | Hjälp mig förstå hur du kom fram till det? | Hjälp mig att förstå hur du kom fram till det. |  |
| F088 | Jag hör vad du säger, men jag håller inte med och det är okej. | Jag hör vad du säger, men jag håller inte med. |  |
| F089 | Jag uppskattar att du delar med dig, men jag är inte säker på att det här är rätt forum. | Jag uppskattar att du delar med dig, men jag är inte säker på att det här är rätt forum. | primaryCategory: grans; functions: grans |
| F091 | Vad tänker du att de som inte håller med dig har missförstått? | Vad tänker du att de som inte håller med dig inte har förstått? | notes: Undersöker vad personen tror att meningsmotståndarna inte har förstått; behåll fokus på förståelse. |
| F092 | Om det inte fungerade, vad skulle nästa steg bli? | Om det inte fungerade, vad skulle nästa steg bli? | notes: Tempuset och det hypotetiska resonemanget är avsiktliga; behåll originaltexten. Användaren hänvisade till F093 i sin kommentar om detta. |
| F095 | Det är intressant att vi ser på det här på olika sätt, jag uppskattar att höra din syn. | Vi ser olika på det här, och jag uppskattar att höra ditt perspektiv. | primaryCategory: relation; functions: relation |
| F096 | När du gör/säger X så får det mig att känna Y, jag skulle uppskatta om . du gjorde Z istället | När du … känner jag … Jag skulle uppskatta om du … | primaryCategory: aterkoppla; functions: aterkoppla; notes: Primär funktion är återkoppling. Kategorinamnet Spegelverkstaden är provisoriskt och ska diskuteras. |
| F100 | Vi behöver inte vara överens om allt för att ha en bra dialog. | Vi behöver inte vara överens om allt för att ha en bra dialog. | primaryCategory: relation; functions: relation |
| F102 | Hur gick dina tankar där i den stunden? | Hur gick dina tankar där i den stunden? | notes: Hur tankarna gick är en annan fråga än vad personen tänkte. Behåll originaltexten. Användaren hänvisade till F101 i sin kommentar om detta. |
| F104 | Att vi tycker olika kan vara en styrka, det ger fler perspektiv. | Att vi tycker olika kan vara en styrka, det ger fler perspektiv. | primaryCategory: relation; functions: relation / konflikt; notes: Lyfter avsiktligt oliktänkande som en styrka och fördjupar med fler perspektiv. Konflikt behöver inte vara farlig. |
| W002 | Freestyle-tal: varför är vi här – gemensam upplevelse – vad har jag att säga – call to action | Håll ett kort tal enligt formen: | steps: Varför är vi här? / En gemensam upplevelse. / Vad har jag att säga? / Vad vill jag att lyssnaren gör? |
| W006 | 1–2–3: en sak, två fördjupningar, tre konkreta steg | Prata om vilket ämne som helst med metoden 1–2–3. | steps: En sak. / Två fördjupningar. / Tre konkreta steg. |
| W007 | Tactical verbal pattern: Först av allt… För det andra… Och till sist… | Först … För det andra … Och till sist … | type: template |
| W008 | Go-to-komplimanger med fokus på ansträngning | Ge en uppriktig komplimang med fokus på processen, inte resultatet. | steps: Bra kämpat! / Stark insats! / Det syns att du utmanar dig själv. Fortsätt så! / Det syns att du har lagt mycket tid på det här.; notes: Exempellistan återställd från användarens minne. Den kan utökas senare; välj bara ord som du menar. |
| W010 | STAR: Situation – Task – Action – Result | Berätta om en situation: sammanhang – uppgift – vad du gjorde – hur det gick. |  |
| W012 | Recover from mistakes: acceptera, slappna av, återgå till nuet, kompensera inte | När du tappar tråden: stanna upp, slappna av och återgå till det du vill säga. Gå inte tillbaka för att korrigera. |  |
| W017 | Story: krok – show don’t tell – konflikt | Berätta med en tydlig öppning, en konkret scen och något som står på spel. |  |
| W018 | Skulle det vara helt omöjligt? | Skulle det vara helt omöjligt att …? | type: template; notes: Nejorienterad fråga. Avsikten är att öppna för ett nej som kan kännas tryggare att säga; ändra inte till en jaorienterad eller allmänt öppen fråga. |
| W019 | Är det helt galet att tänka sig…? | Är det helt galet att tänka sig…? | notes: Nejorienterad fråga. Avsikten är att öppna för ett nej som kan kännas tryggare att säga; ändra inte till en jaorienterad eller allmänt öppen fråga. |
| W020 | Är det helt uteslutet att…? | Är det helt uteslutet att…? | notes: Nejorienterad fråga. Avsikten är att öppna för ett nej som kan kännas tryggare att säga; ändra inte till en jaorienterad eller allmänt öppen fråga. |
| W021 | Skulle det ge väldigt stora konsekvenser om…? | Skulle det ge väldigt stora konsekvenser om…? | notes: Nejorienterad fråga. Avsikten är att öppna för ett nej som kan kännas tryggare att säga; ändra inte till en jaorienterad eller allmänt öppen fråga. |
| W022 | Är det orimligt? | Är det orimligt? | notes: Nejorienterad fråga. Avsikten är att öppna för ett nej som kan kännas tryggare att säga; ändra inte till en jaorienterad eller allmänt öppen fråga. |
| N001 | Svara på oväntade frågor: be om förtydligande – upprepa kärnan – experience eller exploration | Vinn tid genom att be om ett förtydligande. Berätta sedan om egna erfarenheter kopplade till frågan, eller utforska vad det skulle kunna ge. | notes: Vägvalet efter förtydligandet är egen erfarenhet eller utforskande; båda ska inte behöva genomföras. |
| N002 | Det får mig att tänka på… | Det får mig att tänka på… | notes: Avsikten är en pivot: styra samtalet till något annat. Primär kategori Fyren. |
| N011 | När någon frågar hur du mår: känsla – handling – tacksamhet | När någon frågar hur du mår: känsla – hur du hanterar det – tacksamhet. | steps: Jag mår dåligt, men jag har bra stöd av min familj. Tack för att du frågade.; notes: Övningen visar hur man hanterar känslan, inte bara vilken känsla man har. Familjestödet är ett exempel och ska ersättas med något sant för användaren. |
| N015 | Okej. | Okej. | notes: Tar emot kritik utan att behöva försvara sig eller hålla med: nu har du sagt det, nu går jag vidare. |
| N016 | Jag släpper det. | Jag släpper det. | notes: Muren: en gräns för det egna engagemanget. Jag går inte vidare med det du säger; jag släpper det. |
| N017 | Det står för dig, jag tar inte det. | Det står för dig, jag tar inte det. | notes: Avvisar press att agera, hålla med eller ta ställning i en konflikt. Behåll originalrepliken. |
| N026 | På grund av X blev min slutsats Y och beslutet jag fattade var Z. | På grund av … blev min slutsats … och beslutet jag fattade var … |  |
| N027 | Beslutet jag fattade var X, baserat på Y. | Beslutet jag fattade var … utifrån … | notes: Försvara beslutet, inte dig själv. Flyttat från principkort N020. Beslutet ska vara i fokus, inte jaget. |
| N029 | Vill du veta varför det blev så eller ska vi prata om vad vi ska göra annorlunda nästa gång? | Vill du veta varför det blev så eller ska vi prata om vad vi ska göra annorlunda nästa gång? | notes: Det förflutna och framtiden ställs avsiktligt mot varandra för att föra samtalet konstruktivt framåt. Behåll originaltexten. |
| N032 | Acceptera inte en felaktig premiss. | Jag håller inte med om utgångspunkten för frågan. | type: phrase |
| N033 | Det är beslutet jag har landat i. Nästa fråga. | Det är beslutet jag har landat i. Nu går vi vidare. |  |
| N035 | Tack, det betyder mycket – när det kommer från dig. | Tack, det betyder mycket. | notes: ”När det kommer från dig” kan läggas till om man verkligen menar det, men ingår inte i standardrepliken. |
| N036 | Vad är det du tittar efter, så kan jag kontrollera det extra noga nästa gång? | Vad är det du tittar efter, så kan jag kontrollera det extra noga nästa gång? | primaryCategory: utforska; functions: utforska / aterkoppla; notes: Behåll originalet: efterfråga vad chefen granskar för att själv kunna kontrollera det extra noga nästa gång. |
| N037 | Kan du förklara vad du ändrade så att du inte behöver göra om det nästa gång? | Kan du förklara vad du ändrade så att inte du behöver göra det nästa gång? | primaryCategory: aterkoppla; functions: aterkoppla / utforska; notes: Betona DU: möjliggör lärande genom att framställa det som en lättnad för chefen att slippa göra om arbetet. |
| N039 | Jag bestämde X för att Y. Vill du vara delaktig i sådana beslut? | Jag beslutade … för att … Vill du vara delaktig i sådana beslut? | primaryCategory: grans; functions: grans / besluta; notes: Gränssättning gentemot detaljstyrning från en chef. Frågan gäller delaktighet i sådana beslut, inte bara hur nästa beslut ska gå till. |

## Nya kort

| ID | Text | Kategori |
| --- | --- | --- |
| N040 | Får jag avbryta? Jag vill sammanfatta så vi kommer vidare. | styra |
| N041 | Det är din tolkning, jag håller inte med. | grans |

## Första konstprovet – förslag

Sex talbara fraser i Pausknappen: F010, F028, F071, F077, N004 och F023. De ger återkomst, kort betänketid, ett medvetet svar, gemensam paus, återkopplingslöfte och ärlig okunskap. F066 och F069 är instruktioner och lämnas utanför detta första prov. Inga bilder har producerats i denna omgång.

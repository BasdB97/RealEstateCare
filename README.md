# Real Estate Care 2025

Een applicatie gemaakt met Vue en Ionic voor Real Estate Care B.V. Met de applicatie kunnen inspecteurs naar addressen om inspecties uit te voeren aan een pand. Zaken als schade, achterstallig onderhoud, modificaties en technische installaties kunnen worden vastgelegd en opgeslagen.
De applicatie beschikt over een login met authenticatie, koppeling naar een web API om data in JSON vorm op te halen, offline caching van rapporten om ze later op te slaan en mogelijkheid om het uiterlijk van de applicatie te configureren.

## Live applicatie
Bekijk de live app op: https://bdb-realestatecare.netlify.app/

## Uitleg project

- **Inspecties uitvoeren:** Inspecteurs kunnen op locatie toegewezen rapportages openen en eventueel aanpassen waar nodig. Foto's kunnen per inspectie worden toegevoegd. Alle rapporten worden eerst lokaal opgeslagen en vervolgens, als dit mogelijk is, naar de server verstuurd.
- **Uitgevoerde rapporten:** Wanneer een rapport volledig is uitgevoerd wordt deze als 'completed' bestempeld en op een andere pagina weergegeven. De inspecteur heeft zo duigelijk onderscheidt tussen wel- en niet uitgevoerden rapporten.
- **Kennisbank:** Er is een kennisbank waar inspecteurs documenten met betrekking tot inspecties of links naar bijvoorbeeld testprocedures kunnen raadplegen en opslaan.
- **Instellingen:** Hier zijn de gegevens van de ingelogde inspecteur zichtbaar en kunnen worden aangepast. Ook kan de interface voorkeur worden aangepast, op dit moment werkt alleen de schakeling tussen dark en light mode.
- **Zoekfunctie:** De zoek functie kan worden gebruikt om naar document of inspecties te zoeken. DIT WERKT NOG NIET.
- **Informatie:** Op deze pagina staat informatie over de app en contact & support.
- **Authenticatie:** Er is een login scherm met werknemers ID en wachtwoord. Vervolgens wordt er gevraagd naar een 6-cijferige code.

- **Tech Stack:** Vue 3, Ionic UI componenten, Tailwindcss styling, Pinia state management en Axios voor de API.

## Installatie:

1. **Vereisten:** Node.js 18+ en npm.
2. **Installeer dependencies:**

```bash
npm install
```

3. **Start de applicatie:**

```bash
npm run dev
```

4. **Open de applicatie in de browser:**

```bash
http://localhost:5173
```

## Wat werkt:

- **Login met authenticatie:** Er is een login scherm dat werkt met een werknemers ID en wachtwoord. Deze staan direct op de server opgeslagen. Deze gegevens kunnen later veilig uit een een database worden opgehaald. Er wordt een willekeurig 6-cijferig getal gegenereerd die de 2-stap authenicatie nabootst. Deze code kan in de toekomst worden veranderd naar een code uit een app of sms.
  Bij elke login wordt de database opnieuw ingeladen. Dit is zodat altijd dezelfde gegevens worden getoond, ook als er rapporten worden aangepast.
- **Toegewezen / uitgevoerde rapportages:** De rapportages zijn volgens de casus verwerkt in de applicatie. Deze worden met behulp van een API opgehaald uit [JSONBin](https://jsonbin.io). Toegewezen rapportages kunnen worden aangepast waar nodig. De aangepaste rapporten kunnen als concept worden opgeslagen zodat er later nog aan gewerkt kan worden, of ze kunnen worden afgerond. In beide gevallen wordt het rapport eerst lokaal opgeslagen en daarna geprobeerd om het op de server op te slaan. Als er geen internet verbinding is blijft het rapport in de lokaal opslag tot dat er weer verbinding is.
  De rapportages staan netjes onder elkaar en kan per adres worden uitgeklapt. Er kan ook worden gezocht naar addressen.
- **Kennisbank:** Op dit moment staan er 3 links in de database. Waarvan 1 link naar een website. De andere 2 links verwijzen naar PDF's die opgeslagen zijn in de public folder. Op deze manier is het zichtbaar dat er zowel PDF's door het bedrijf kunnen worden opgeslagen als dat links naar websites ook werken.
- **Instellingen:** De gegevens van de ingelogde inspecteur zijn zichtbaar, deze kunnen nog niet worden aangepast. Ook kan de interface voorkeur worden aangepast, op dit moment werkt alleen de schakeling tussen dark en light mode. De keuze om alleen dark mode te laten werken is zodat de app ook in donkere modus er goed uit ziet.
- **Informatie:** Informatie over de app en contact & support wordt weergegeven. Dit kan later worden verbeterd door dit automatisch op te halen uit een database.

## Wat niet werkt / nog te implementeren:

- **Betere beveiliging van gegevens:** Kwetsbare gegevens als de API key en de url staat nu hardcoded in de code. Deze moeten later worden opgeslagen in een .env file. Er is hier voor gekozen omdat de JSON Bin geen gevoelige gegevens bevat en deze manier het hosten op Netlify vergemakkelijkt.

### Punten die later kunnen worden toegevoegd:

- **Zoekfunctie:** De zoekfunctie kan worden gebruikt om naar documenten of inspecties te zoeken.
- **Geluid en meldingen:** De geluiden en meldingen kunnen worden aangepast.
- **Gegevens inspecteur aanpassen:** De gegevens van de ingelogde inspecteur kunnen worden aangepast.
- **2-stap authenticatie:** De 2-stap authenticatie via sms of app laten werken.
- **Opslag gegevens niet in localstorage:** De gegevens opslaan in een database.
- **Regelmatige controle of er internet verbinding is:** De regelmatige controle of er internet verbinding is om de gegevens op te slaan.

## Security, Usability, Accessibility, and Style Guide Accountability

### Security:

De applicatie wordt gehost op Netlify. Op deze manier is de applicatie beveiligd tegen bekende aanvallen (bijv. XSS).
Op dit moment staan alle gegevens in een JSONBin. Als de applicatie naar productie gaat zal er overgegaan moeten worden naar een database.
Bij het inloggen worden gegevens opgeslagen in de localstorage, dit is in lijn met de opdracht maar moet uiteraard beter worden opgeslagen voor daadwerkelijke productie.
Tevens moet de authenticatie worden verbeterd door gebruik te maken van een app of sms.
De API key en URL staan hardcoded in de code. Dit moet uiteraard beter worden opgeslagen voor daadwerkelijke productie.

### Usability:

#### 10 heuristieken van Jakob Nielsen:

1. **Visuele feedback:** De gebruiker krijgt visuele feedback bij acties. Zoals het laden van een pagina en het indrukken van knoppen.
2. **Het systeem en de echte wereld komen overeen:** Er wordt gesproken in de taal van de gebruiker (Nederlands). De gebruikte taal is goed te begrijpen en er worden duidelijke en herkenbare iconen gebruikt.
3. **Gebruiker heeft controle en vrijheid:** De gebruiker heeft controle over de acties die hij uitvoert. De gebruiker kan teruggaan naar vorige pagina's en de formulieren zijn makkelijk aan te passen. Dit kan nog verder uitgebreid worden.
4. **Wees consistent:** Er is gekozen voor een herkenbaar design (Logo linksboven, navigatiebalk onderaan, consistente kleuren en iconen). Dit kan nog verder geoptimaliseerd worden door te kijken en te leren van bestaande apps.
5. **Maak geen fouten:** Als de gebruiker een fout maakt, wordt deze op de juiste manier gemeld. Zoals bij het inloggen met een verkeerde ID en wachtwoord.
6. **Zorg dat de bezoeker niks hoeft te onthouden:** De applicatie onthoudt de gegevens van de gebruiker en deze kunnen later worden opgeslagen in een database.
7. **Flexibiliteit en efficiency:** De applicatie is speciaal gemaakt voor de inspecteurs van het bedrijf. Er is een zoekbalk in de toegewezen rapportages voor het zoeken naar addressen. Nieuwe gebruikers kunnen eenvoudig door de lijst heen scrollen. De app werkt efficient en werkt goed op mobiele devices.
8. **Hou het minimaal en verfijnd:** De applicatie heeft een simpele interface en is makkelijk te gebruiken. Er is gekozen voor duidelijke en alleen nodige tekst.
9. **Maak foutmeldingen minder eng:** De foutmeldingen zijn duidelijk en eenvoudig te begrijpen. Deze kan altijd nog naar wens verbeterd of aangepast worden.
10. **Bied een helpende hand:** De applicatie heeft niet direct een uitleg in de app. Hier is voor gekozen om zo min mogelijk afleidende teksten op de pagina te zetten. Documenten en een help functie kan op de pagina 'informatie' worden toegevoegd, als hier een wens voor is. De helpende hand kan ook worden toegevoegd aan de pagina's waar nodig.

### Style Guide:

Ik heb de styling gedaan met Tailwindcss. Deze is makkelijk te gebruiken en heeft een goede documentatie. Ik merkte dat de combinatie tussen Tailwindcss en Ionic componenten niet altijd goed werkte. Dit is omdat Tailwindcss de styles op een andere manier toepast dan Ionic componenten. Ik heb hier tijdens het maken van de applicatie veel tijd in gestoken om de combinatie goed te krijgen.
Ik ben nog niet volledig tevreden met de styling, dit kan ik later nog verfijnen. Op dit moment voldoet de applicatie aan de gebruiksvriendelijkheidseisen en aan de casus.

## WCAG 2.1 Analyse:

Ionic componenten ondersteunen het gebruik van toetsenbord en screenreaders. Deze zijn goed te gebruiken voor gebruikers met een beperking. Waar nodig zijn extra labels toegevoegd.
Alle afbeeldingen zijn voorzien van een alt tekst.
Er is gekozen voor kleuren met een goede contrast ratio, zowel in dark als in light mode.

## Eind woord:

Ik heb veel geleerd over het maken van een Progressive web app. Door in het diepe te moeten springen na een tijd van theorie was ik erg op mijzelf aangewezen om het project volgens de opdracht van het bedrijf tot een mooi einderesultaat te brengen.
Ik heb geleerd welke tools en libraries ik kan toepassen om een mooie en gebruiksvriendelijke applicatie te maken en ik weet welke manieren van werken ik minder makkelijk vind.

Deze applicatie voldoet volgens mij aan de eisen van de opdracht maar kan nog zeker uitgebreid en verbeterd worden.

# Real Estate Care 2025

Een applicatie gemaakt met Vue en Ionic voor Real Estate Care B.V. Met de applicatie kunnen inspecteurs naar adressen om inspecties uit te voeren aan een pand. Zaken als schade, achterstallig onderhoud, modificaties en technische installaties kunnen worden vastgelegd en opgeslagen.
De applicatie beschikt over een login met authenticatie, koppeling naar een web API om data in JSON vorm op te halen, offline caching van rapporten om ze later op te slaan en mogelijkheid om het uiterlijk van de applicatie te configureren.

## Live applicatie
Bekijk de live app op: https://bdb-realestatecare.netlify.app/

## Uitleg project

- **Inspecties uitvoeren:** Inspecteurs kunnen op locatie toegewezen rapportages openen en eventueel aanpassen waar nodig. Foto's kunnen per inspectie worden toegevoegd. Alle rapporten worden eerst lokaal opgeslagen en vervolgens, als dit mogelijk is, naar de server verstuurd.
- **Uitgevoerde rapporten:** Wanneer een rapport volledig is uitgevoerd wordt deze als 'completed' bestempeld en op een andere pagina weergegeven. De inspecteur heeft zo duidelijk onderscheidt tussen wel- en niet uitgevoerde rapporten.
- **Kennisbank:** Er is een kennisbank waar inspecteurs documenten met betrekking tot inspecties of links naar bijvoorbeeld testprocedures kunnen raadplegen en opslaan.
- **Instellingen:** Hier zijn de gegevens van de ingelogde inspecteur zichtbaar en kunnen worden aangepast. Ook kan de interface voorkeur worden aangepast, op dit moment werkt alleen de schakeling tussen dark en light mode.
- **Zoekfunctie:** De zoek functie kan worden gebruikt om naar document of inspecties te zoeken. Deze functionaliteit is nog niet geïmplementeerd.
- **Informatie:** Op deze pagina staat informatie over de app en contact & support.
- **Authenticatie:** Er is een login scherm met werknemers ID en wachtwoord. Vervolgens wordt er gevraagd naar een 6-cijferige code.

- **Tech Stack:** Vue 3, Ionic UI componenten, TailwindCSS styling, Pinia state management en Axios voor de API.

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

- **Login met authenticatie:** Er is een login scherm dat werkt met een werknemers ID en wachtwoord. Deze staan direct op de server opgeslagen. Deze gegevens kunnen later veilig uit een een database worden opgehaald. Er wordt een willekeurig 6-cijferig getal gegenereerd die de 2-stap authenticatie nabootst. Deze code kan in de toekomst worden veranderd naar een code uit een app of sms.
  Bij elke login wordt de database opnieuw ingeladen. Dit is zodat altijd dezelfde gegevens worden getoond, ook als er rapporten worden aangepast.
- **Toegewezen / uitgevoerde rapportages:** De rapportages zijn volgens de casus verwerkt in de applicatie. Deze worden met behulp van een API opgehaald uit [JSONBin](https://jsonbin.io). Toegewezen rapportages kunnen worden aangepast waar nodig. De aangepaste rapporten kunnen als concept worden opgeslagen zodat er later nog aan gewerkt kan worden, of ze kunnen worden afgerond. In beide gevallen wordt het rapport eerst lokaal opgeslagen en daarna geprobeerd om het op de server op te slaan. Als er geen internet verbinding is blijft het rapport in de lokale opslag tot dat er weer verbinding is.
  De rapportages staan netjes onder elkaar en kan per adres worden uitgeklapt. Er kan ook worden gezocht naar adressen.
- **Kennisbank:** Op dit moment staan er 3 links in de database. Waarvan 1 link naar een website. De andere 2 links verwijzen naar PDF's die opgeslagen zijn in de public folder. Op deze manier is het zichtbaar dat er zowel PDF's door het bedrijf kunnen worden opgeslagen als dat links naar websites ook werken.
- **Instellingen:** De gegevens van de ingelogde inspecteur zijn zichtbaar, deze kunnen nog niet worden aangepast. Ook kan de interface voorkeur worden aangepast, op dit moment werkt alleen de schakeling tussen dark en light mode. De keuze om alleen dark mode te laten werken is zodat de app ook in donkere modus er goed uit ziet.
- **Informatie:** Informatie over de app en contact & support wordt weergegeven. Dit kan in latere versies worden verbeterd door dit automatisch op te halen uit een database.

## Wat niet werkt / nog te implementeren:

- **Betere beveiliging van gegevens:** Kwetsbare gegevens als de API key en de URL staat nu hardcoded in de code. Deze moeten later worden opgeslagen in een .env file. Er is hier voor gekozen omdat de JSON Bin geen gevoelige gegevens bevat en deze manier het hosten op Netlify vergemakkelijkt.

### Punten die later kunnen worden toegevoegd:

- **Zoekfunctie:** De zoekfunctie kan worden gebruikt om naar documenten of inspecties te zoeken.
- **Geluid en meldingen:** De geluiden en meldingen kunnen worden aangepast.
- **Gegevens inspecteur aanpassen:** De gegevens van de ingelogde inspecteur kunnen worden aangepast.
- **2-stap authenticatie:** De 2-stap authenticatie via sms of app laten werken.
- **Opslag gegevens niet in localstorage:** De gegevens opslaan in een database.
- **Regelmatige controle of er internet verbinding is:** De regelmatige controle of er internet verbinding is om de gegevens op te slaan.

## Security, Usability, Accessibility, and Style Guide Accountability

### Security:

Vue.js maakt in templates automatisch gebruik van content-escaping, dit voorkomt XSS aanvallen (https://vuejs.org/guide/best-practices/security)
Ingevoerde gegevens van de inspecteur worden aan de client zijde gevalideerd.
Bij het inloggen worden gegevens opgeslagen in de localstorage, dit is in lijn met de opdracht maar moet uiteraard beter worden opgeslagen voor daadwerkelijke productie.
Toegang en authenticatie wordt nu gesimuleerd. In productie moet dit worden vervangen worden voor authenticatie via sms of app, en met http-tokens.
De API key en URL staan hardcoded in de code, voor het gemak van de opdracht. In productie worden deze waarden verplaatst naar server-side variables.

Deze toepassingen zijn passend voor het prototype van de opdracht en zijn in lijn met OWASP.

### Usability:

#### 10 heuristieken van Jakob Nielsen:

1. **Visuele feedback:** De gebruiker krijgt visuele feedback bij acties. Zoals het laden van een pagina en het indrukken van knoppen.
2. **Het systeem en de echte wereld komen overeen:** Er wordt gesproken in de taal van de gebruiker (Nederlands). De gebruikte taal is goed te begrijpen en er worden duidelijke en herkenbare iconen gebruikt.
3. **Gebruiker heeft controle en vrijheid:** De gebruiker heeft controle over de acties die hij uitvoert. De gebruiker kan teruggaan naar vorige pagina's en de formulieren zijn makkelijk aan te passen. Dit kan nog verder uitgebreid worden.
4. **Wees consistent:** Er is gekozen voor een herkenbaar design (Logo linksboven, navigatiebalk onderaan, consistente kleuren en iconen). Dit kan nog verder geoptimaliseerd worden door te kijken en te leren van bestaande apps.
5. **Maak geen fouten:** Als de gebruiker een fout maakt, wordt deze op de juiste manier gemeld. Zoals bij het inloggen met een verkeerde ID en wachtwoord.
6. **Zorg dat de bezoeker niks hoeft te onthouden:** De applicatie onthoudt de gegevens van de gebruiker lokaal; in productie worden deze gegevens worden opgeslagen in een database.
7. **Flexibiliteit en efficiency:** De applicatie is speciaal gemaakt voor de inspecteurs van het bedrijf. Er is een zoekbalk in de toegewezen rapportages voor het zoeken naar adressen. Nieuwe gebruikers kunnen eenvoudig door de lijst heen scrollen. De app werkt efficiënt en is geoptimaliseerd voor mobiele devices.
8. **Hou het minimaal en verfijnd:** De applicatie heeft een simpele interface en is makkelijk te gebruiken. Er is gekozen voor duidelijke en alleen nodige tekst.
9. **Maak foutmeldingen minder eng:** De foutmeldingen zijn duidelijk en eenvoudig te begrijpen. Deze kan altijd nog naar wens verbeterd of aangepast worden.
10. **Bied een helpende hand:** De applicatie heeft niet direct een uitleg in de app. Hier is voor gekozen om zo min mogelijk afleidende teksten op de pagina te zetten. Documenten en een help functie kan op de pagina 'informatie' worden toegevoegd, als hier een wens voor is. De helpende hand kan ook worden toegevoegd aan de pagina's waar nodig.

### Style Guide & Best Practices:

De componenten worden opgebouwd met de composition API. Hierdoor zijn de componenten herbruikbaar en wordt de logica gescheiden van de presentatie. (https://vuejs.org/guide/extras/composition-api-faq.html)
Custom componenten zijn gemaakt voor herbruikbaarheid (zoals DashboardCard en EditReport). Dit verbetert onderhoudbaarheid en schaalbaarheid. In toekomstige versies kunnen er meer componenten gemaakt worden van de bestaande code, om dit nog beter te maken.
Alle interacties maken gebruik van Ionic mobile-first componenten. (https://ionicframework.com)
Styling gebeurt via Tailwindcss. Dark-mode wordt afgevangen via TailwindCSS conventie. (https://tailwindcss.com/docs/dark-mode)
Routing gebeurt via een Vue Router. De routes zijn duidelijk gestructureerd en makkelijk uit te breiden.
Voor de API calls wordt gebruik gemaakt van Axios. Deze scheidt de service-laag van de componenten. (https://axios-http.com/)


## Accessibility (WCAG 2.1):

Ionic levert standaard componenten die goed te gebruiken zijn in combinatie met een toetsenbord en screenreader. Alle interactieve elementen zijn via focusbaar via toetsenbord en bedienbaar zonder muis.
Alle afbeeldingen, inclusief foto's die door de inspecteur worden geüpload, zijn voorzien van een alt-tekst.
De kleuren zijn gekozen volgens de contrastvereisten van WCAG 2.1, zonder veel af te wijken van de huisstijl. Dark en light mode zijn getest op goede leesbaarheid.
Invoervelden zijn voorzien van aria-labels, of van een IonLabel. Hierdoor biedt het meer context voor screenreaders.
Foutmeldingen worden duidelijk weergegeven.

Deze versie voldoet aan de basis eisen van WCAG 2.1.

## Eind woord:

Ik heb veel geleerd over het maken van een Progressive web app. Door in het diepe te moeten springen na een tijd van theorie was ik erg op mijzelf aangewezen om het project volgens de opdracht van het bedrijf tot een mooi eindresultaat te brengen.
Ik heb geleerd welke tools en libraries ik kan toepassen om een mooie en gebruiksvriendelijke applicatie te maken en ik weet welke manieren van werken ik minder makkelijk vind.

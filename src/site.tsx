    // ============================================================
//  JOREN DE COCK — VOLLEDIGE WEBSITE IN 1 BESTAND
// ============================================================
//
//  ▸ ALLE inhoud + opmaak staat in dit bestand.
//  ▸ Je hoeft GEEN AI te gebruiken om aan te passen — gewoon
//    de waardes hieronder bewerken en opslaan.
//
//  --------------------------------------------------------
//  WAAR STAAT WAT IN DIT BESTAND?
//  --------------------------------------------------------
//   1. FOTO / PDF / VIDEO MAPPEN (uitleg waar bestanden zetten)
//   2. PROJECTEN          → lijst van alle projecten
//   3. INFO               → tekst + foto's + links
//   4. INSTELLINGEN       → breedtes per maat (S/M/L/XL)
//   5. COMPONENTEN        → header, project rij, detail, info
//      (deze hoef je normaal niet aan te raken)
//
//  --------------------------------------------------------
//  1. FOTO / PDF / VIDEO MAPPEN — HOE WERKT HET?
//  --------------------------------------------------------
//
//  Zet je bestanden in de map `public/` van je github repo:
//
//     public/
//       images/
//         project-01/
//           cover.jpg
//           01.jpg
//           02.jpg
//         project-02/
//           cover.jpg
//           ...
//         info/
//           portret.jpg
//           atelier.jpg
//       pdfs/
//         project-01.pdf
//
//  In de code verwijs je er dan naar met een pad dat START
//  met een schuine streep `/`. Bijvoorbeeld:
//
//     cover: "/images/project-01/cover.jpg"
//     pdfs:  [{ label: "plannen", file: "/pdfs/project-01.pdf" }]
//     videos:["https://www.youtube.com/embed/XXXXX"]   (youtube of vimeo embed)
//
//  Wanneer je de site naar github pusht worden deze bestanden
//  automatisch mee gepubliceerd.
//
// ============================================================

import { Link, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ============================================================
//  2. PROJECTEN
// ============================================================
//
//  Per project stel je in:
//    id          → uniek, komt in de url (bv. /projects/atelier)
//    title       → titel die verschijnt bij hover
//    year        → jaartal (toont op detailpagina)
//    location    → plaats (optioneel)
//    size        → "S" | "M" | "L" | "XL"  (breedte van de foto)
//    align       → "left" | "center" | "right"  (positie op de rij)
//    cover       → pad naar coverfoto
//    description → tekst op de detailpagina (\n\n = nieuwe alinea)
//    images      → extra foto's op de detailpagina
//    videos      → embed-urls (youtube/vimeo), optioneel
//    pdfs        → lijst pdf's, optioneel
//
//  Een project toevoegen: kopieer een blok hieronder en pas aan.
//  Een project verwijderen: verwijder het hele blok.
//
// ============================================================

export type ProjectSize = "S" | "M" | "L" | "XL";
export type ProjectAlign = "left" | "center" | "right";

export interface Project {
  id: string;
  title: string;
  year: number;
  location?: string;
  size: ProjectSize;
  align: ProjectAlign;
  cover: string;
  description: string;
  images?: string[];
  videos?: string[];
  pdfs?: { label: string; file: string }[];
}

// voorbeeldtekst en voorbeeldfoto's — vervangen door eigen materiaal.
// de voorbeeldfoto's staan tijdelijk op unsplash zodat je iets ziet.
// vervang door "/images/<projectmap>/01.jpg" enz. zodra je eigen foto's
// in public/images/ staan.
const DEMO = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1800&q=80",
  "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1800&q=80",
  "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1800&q=80",
];
const DEMO_TEXT =
  "korte beschrijving van dit project. vervang deze tekst door je eigen verhaal: het concept, het programma, de site, de materialen.\n\ngebruik een lege regel voor een nieuwe alinea.";

export const projects: Project[] = [
  {
    id: "project-01",
    title: "Ruimtes in Ruimtes",
    year: "Zelfstandig Werk II - 28052026",
    size: "L",
    align: "left",
    cover: DEMO[0], // vervang door "/images/project-01/cover.jpg"
    description: "Samen met Leonardo Spreutels en Olivia Kemel maakten we een intelligente ruine waarbij tal van functies gestappeld werden. Modulariteit vormt de leidraad binnen dit project: niet alleen voor het initiële gebruik, maar vooral ook voor de levensvatbaarheid op lange termijn.Het ontwerp streeft naar een flexibele ruimtelijke structuur die toekomstige aanpassingen mogelijk maakt, zonder de kwaliteiten van de bestaande toestand te verliezen. We ontwierpen een speelse plattegrond en circulatiesysteem, met als doel verbindingen en transparantie te creëren tussen het publieke domein en het programma. Die openheid wordt zowel in plan als in doorsnede uitgewerkt: via dubbele en driedubbele hoogtes, niveauverschillen binnen dezelfde verdieping, doorzichten en overlappende routes. Zo wordt niet alleen de functionele organisatie versterkt, maar ook de ruimtelijke ervaring. Daarbij wordt telkens gewerkt met een wisselend grid, zowel in plan als in snede. Dit grid ondersteunt de modulariteit, maar laat tegelijk ruimte voor variatie, spel en onverwachte relaties tussen de verschillende programmaonderdelen. De oorspronkelijke structuur krijgt een nieuwe rol: ze wordt niet louter behouden als dragend element, maar actief ingezet als ruimtestructurerend principe. Zo ontstaat een ontwerp waarin flexibiliteit en ruimtelijke beleving elkaar versterken. Bij de afbeeldingen hieronder vind je een korte versie van ons eind PDF weer" ,
    images: DEMO,   // vervang door ["/images/project-01/01.jpg", ...]
    // videos: ["https://www.youtube.com/embed/XXXXX"],
    // pdfs:   [{ label: "plannen", file: "/pdfs/project-01.pdf" }],
  },
  { id: "project-02", title: "Corycopsis Spicata", year: "Expressie IV - 20052026", size: "M", align: "right",
    cover: DEMO[4],
    description: "Het mooiste venster van de wereld… wat is dat eigenlijk? Is het het mooie kleurtje dat het geeft, het materiaal, de extravagante vorm, of het uitzicht dat je ziet? Misschien is het wel een combinatie van al die elementen. Of gaat het net om de belevenis die je eraan koppelt. Met deze zinnen begon mijn kortverhaal over het mooiste venster van de wereld. Waarbij we vanuit ons eigen ervaring met een venster van start gingen met het bouwen aan onze voorstelling ervan. Na enkele weken te assembleren eindigde Expressie bij een kortfilm die we toonden in een zaaltje in Merelbeke.",
    images: DEMO },
  { id: "project-03", title: "Monochromatic Modeling", year: "Media IV - 03042026", size: "S", align: "center",
    cover: DEMO[3],
    description: "We leerden in de workshopweek van Media met illustrator te werken en vandaaruit te lasercutten. we maakten per twee een compositie van torens waar elke toren opgemaakte naar hun eigen architecturale stijl. Bij mij was dit Art Deco." ,
    images: DEMO },
  { id: "project-04", title: "Beweging 3", year: "Ontwerp II - 27032026", size: "XL", align: "left",
    cover: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80",
    description: "In de laatste beweging van Ontwerp II moesten we nu op de gekozen site elk een eigen ééngezinswoning ontwerpen. Hierbij had ik de woning het dichtst bij de industrie gelegen gekregen ook de plek waar de autos van de bewoners stonden van de cluster. Hiermee werd er eerder een pad gecreerd onder mijn woning waar ik rekening mee moest houden. Vanuit dit startpunt ben ik begonnen ontwerpen van mijn woning waarbij ik zelf de kapstokzin Dubbele Lijn heb gekozen. Kort gezegd is Dubbele Lijn een compacte flexibele ééngezinswoning waar bij de twee sterktelijnen centraal staan in het ontwerp zijn maar elk heel anders zijn. de ene volgt de lijn van de cluster en het fietspad onder de woning waarbij maximale flexibiliteit centraal staat de andere staat hier loodrecht op en zorgt voor een interresante connectie met de verwilderde tuin.",
    images: DEMO },
  { id: "project-05", title: "Uvx-Xyz Poster", year: "Media III - 02032026", size: "M", align: "right",
    cover: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80",
    description: "Als finale opdracht ontwierpen we een poster waar we allerlei media zoals rhino, photoshop, grasshopper en zo veel meer moesten combineren. Hieruit maakten we dan een eigen verzonnen toren.",
    images: DEMO },
  { id: "project-06", title: "Uvx-Xyz Boekje", year: "Media III- 02032026", size: "S", align: "left",
    cover: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1600&q=80",
    description: "We moesten een boekje maken waarin we allerlei opdrachten moesten in bundelen dat we in de loop van de weken van het vak gemaakt hebben met onderandere rhino, grasshopper, photoshop en autocad.", 
    images: DEMO },
  { id: "project-07", title: "Beweging 2", year: "Ontwerp II - 08012026", size: "L", align: "right",
    cover: "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=1800&q=80",
    description: "Voor Beweging 2 moesten we vanuit de referentie die we in Beweging 1 hebben geanalyseerd een fragment ontworpen waarbij je elementen van het oorspronkelijke gebouw gebruikt om verder op te ontwerpen. tergelijketijd ontwierpen we in groep de cluster in Kwatrecht waar dan in de laatste beweging onze eigen ééngezinswoning zal komen vanuit het fragment.",
    images: DEMO },
  { id: "project-08", title: "Beeld/Beeld", year: "Expressie III - 21112025", size: "S", align: "center",
    cover: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1400&q=80",
    description: "Samen met Thano Del'Haye en Tristen Cremers maakten we een fotosequentie van enkele bomen uit de Coupure. Elke boom heeft zijn eigen karakter en deze wilden we dan ook mooi tentoonstellen door ze in sequentie op ware grote te tonen. We trokken de foto met een speciaal gemaakte lens die aan iedere boom kon bevestigd kon worden en verstelbaar was naargelang de situatie.",
    images: DEMO },
  { id: "project-09", title: "Beweging 1", year: "Ontwerp II - 30112025", size: "L", align: "left",
    cover: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1600&q=80",
    description: "Samen met Alexander de Paepe, Alexandre Fobe, Benjamin Declercq en Zjef De Locht analyseerde we in Beweging 1 het gebouw HANGAR 2020 van Gens architecten uit Frankrijk en het dorp Kwatrecht. Dit deden we aan de hand van maquettes, plannen, tekeningen, fascinatiebeelden enzovoort. met deze informatie bouwen we dan verder om uiteindelijk in Kwatrecht vijf eengezinswoningen te plaatsten.",
    images: DEMO },
  { id: "project-10", title: "Axo", year: "Zelfstandig Werk I - 04042025", size: "M", align: "right",
    cover: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
    description: " Een Axometrie op schaal 1-25 van de woning die we eerder maakten in Compact Wonen. Waar er de nodige aandacht moest zijn op correcte bouwknopen.", 
    images: DEMO },
  { id: "project-11", title: "Plein-Place", year: "Expressie II - 04042025", size: "M", align: "left",
    cover: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?w=1400&q=80",
    description: "Samen met Zjef De Locht ontwierpen we een sokkel voor het Meiserplein in Brussel. De sokkel weerspiegelt de texturen die we terugvonden op het plein. Deze deelden we op in categorieën en lieten we in onze sokkel tot levend komen door hoogte, kleur en volgorde.", 
    images: DEMO },
  { id: "project-12", title: "Samen Wonen/Werken", year: "Ontwerp I - 28032025", size: "XL", align: "center",
    cover: "https://images.unsplash.com/photo-1496564203457-11bb12075d90?w=1800&q=80",
    description: "Aan Dok Noord in Gent bevindt zich een kunstgalerij genaamd 019, gehuisvest in een voormalige staalfabriek. Het doel was om deze plek deels om te vormen tot een werkruimte waar kunst gemaakt en tentoongesteld kan worden, en deels tot wooneenheden voor kunstenaars. Een bijkomende uitdaging waren de twee richtlijnen waar ik me aan moest houden: Kopse kanten open en Tuin rondom rond, buiten wordt binnen wordt buiten. Deze zinnen vormden het uitgangspunt voor mijn ontwerpbenadering. Ik probeerde een sfeer te creëren waarin je, op elk moment en op elke plek binnen of buiten niet helemaal zeker weet of je je nu echt binnen bevindt, of juist buiten.", 
    images: DEMO },
  { id: "project-13", title: "Knoop Tegen-Knoop", year: "Expressie I - 07032025", size: "M", align: "left",
    cover: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
    description: DEMO_TEXT, images: DEMO },
  { id: "project-14", title: "Compact Wonen", year: "Ontwerp I - 07012025", size: "L", align: "right",
    cover: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
    description: "Om van Heusden naar de Gentse Meersen te geraken, is het momenteel onaangenaam om er te voet of met de fiets naartoe te gaan. Als oplossing stellen we de bouw van een fietsbrug over de Schelde voor, ter hoogte van de ingang van de Meersen. Aan deze brug wordt een compacte woning van 80 m2 toegevoegd, bedoeld voor twee personen, waarvan één instaat voor het beheer van de brug. Omdat de woning op een slibrijke ondergrond komt te staan, is er gekozen voor te starten vanuit een paalfundering. We mochten echter ook niet volledig kiezen hoe we begonnen aan het gebouw we starten met een referentie van een bestaand gebouw. Hier was dit de Nordic Pavilioen in Venice van Sverre Fehn." ,
    images: DEMO },
  { id: "project-15", title: "Graf", year: "Media I - 22112024", size: "S", align: "left",
    cover: "https://images.unsplash.com/photo-1490735891913-40897c6045cf?w=1400&q=80",
    description: "Tekening van een graf en zijn omgeving in de Westbegraafplaats in Gent. Waarbij het meetbare en niet-meetbare samenkomt.", 
    images: DEMO },
  { id: "project-16", title: "Box Box Box", year: "Media I - 22112024" , size: "S", align: "center",
    cover: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600&q=80",
    description: "In deze tekenopdracht moesten we vier houtskooltekeningen maken van gestapelde kartonnen dozen. De opdracht was om deze zo realistisch mogelijk weer te geven, met behulp van diverse tekentechnieken.", 
    images: DEMO },
  { id: "project-17", title: "Bar", year: "Ontwerp I - 29102024" , size: "L", align: "right",
    cover: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80",
    description: "In de binnentuin van het klooster in de Hoogstraat in Gent ontworpen we een bar. Daarbij was het belangrijk om, via observaties van de tuin, bepaalde kenmerken te selecteren waarmee je het ontwerp van de bar kon laten samenvloeien met de bestaande structuur, zodat het geheel past binnen het bestaande gebouw. Ik heb ervoor gekozen om mijn bar in een van de hoeken van de binnentuin te plaatsen. Als vertrekpunt gebruikte ik de afmetingen tussen elementen op de gevel, en nam die over als basis voor de afmetingen van mijn ontwerp. Daarnaast heb ik twee witte lijnen die over de volledige gevel van het binnenhof lopen, doorgetrokken in het ontwerp van mijn bar, zodat er een visuele continuïteit ontstaat tussen oud en nieuw.", 
    images: DEMO },
  { id: "project-18", title: "Extentie 1op1/Verschaald", year: "Ontwerp I - 11102024", size: "M", align: "left",
    cover: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1400&q=80",
    description: "De eerste ontwerpopdracht bestond uit twee delen. In deel één ontwierp ik samen met medestudent Tristen Cremers een extensie die aansloot bij het klooster aan de Hoogstraat, de locatie van ons project. In deel twee werkten we individueel verder: we vertaalden kenmerken van de gezamenlijke extensie naar abstracte, verschaalde vormen. Tegen het einde kregen deze opnieuw een gevoel van schaal door toevoeging van schaalfiguren.",
    images: DEMO },
];

// ============================================================
//  3. INFO
// ============================================================
//
//  - about: tekst over jezelf (\n\n = nieuwe alinea)
//  - photos: lijst foto's met size en align (zoals projecten),
//            zonder titel — er verschijnt niets bij hover.
//  - links: knoppen (instagram, email, ...)
//  - pdfs:  cv of ander document (optioneel)
//
// ============================================================

export const info = {
  name: "Joren De Cock",
  role: "Joren De Cock - Architectuur student - KU Leuven Sint-Lucas Gent",
  about:
    "Op deze website verzamel ik verschillende projecten die ik als architect in opleiding aan de KU Leuven heb gemaakt, zowel binnen als buiten de opleiding. Je kan het zien als een soort portfolio van werk waar ik trots op ben. Bij sommige projecten vloeiden er meer uren en zweet in dan bij andere. Naast schoolopdrachten vind je hier misschien ook persoonlijke projecten die voortkomen uit mijn eigen interesse. Die hebben misschien niet rechtstreeks te maken met mijn opleiding, maar hebben wel altijd een link met de richting architectuur. Hoewel ik deze site in de eerste plaats voor mezelf heb opgebouwd, is iedereen welkom om een kijkje te nemen.",
  photos: [
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80", size: "M" as ProjectSize, align: "left" as ProjectAlign },
    { src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1400&q=80", size: "L" as ProjectSize, align: "right" as ProjectAlign },
    { src: "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=1400&q=80", size: "S" as ProjectSize, align: "center" as ProjectAlign },
  ],
  links: [
    { label: "instagram", url: "https://www.instagram.com/jorendecock" },
    { label: "email", url: "mailto:decock.joren@gmail.com" },
  ],
  pdfs: [] as { label: string; file: string }[],
};

// ============================================================
//  4. INSTELLINGEN — breedte per maat
// ============================================================
//
//  Pas hier de percentages aan als je een maat breder of smaller
//  wil. Op mobiel (gsm) is alles altijd 100% breed.
//
// ============================================================

const WIDTH_MAP: Record<ProjectSize, string> = {
  S:  "md:w-[22%]",
  M:  "md:w-[34%]",
  L:  "md:w-[46%]",
  XL: "md:w-[60%]",
};

const ALIGN_MAP: Record<ProjectAlign, string> = {
  left:   "md:mr-auto",
  center: "md:mx-auto",
  right:  "md:ml-auto",
};

// uniforme verticale afstand tussen alle media (projecten, detail, info)
const GAP = "gap-6";

// ============================================================
//  5. COMPONENTEN — opmaak van de pagina's
//     (normaal niet aanpassen)
// ============================================================

// ------------------------------------------------------------
//  HEADER
// ------------------------------------------------------------

function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isProjects = pathname === "/";
  const isInfo = pathname.startsWith("/info");
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="flex items-baseline justify-between px-5 py-4 text-[15px] md:text-[20px] lowercase tracking-tight">
        <span className="select-none">jorendecock.archi</span>
        <nav className="flex gap-5 md:gap-8">
          <Link to="/" className={isProjects ? "nav-active" : ""}>
            projecten
          </Link>
          <Link to="/info" className={isInfo ? "nav-active" : ""}>
            info
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ------------------------------------------------------------
//  PROJECT RIJ (hoofdpagina)
//
//  - desktop: titel verschijnt bij hover NAAST de foto (vaste afstand)
//  - mobiel:  titel verschijnt bij tap ONDER de foto (volledig leesbaar)
// ------------------------------------------------------------

function ProjectRow({ p }: { p: Project }) {
  // op desktop: titel komt aan de tegenovergestelde kant van de uitlijning
  // (zodat hij in de witruimte staat) op een VASTE afstand van 16px.
  const titleSideDesktop =
    p.align === "right"
      ? "md:right-auto md:left-0 md:-translate-x-[calc(100%+16px)]"
      : "md:left-auto md:right-0 md:translate-x-[calc(100%+16px)]";

  return (
    <li className={`w-full ${WIDTH_MAP[p.size]} ${ALIGN_MAP[p.align]}`}>
      <Link to="/projects/$slug" params={{ slug: p.id }} className="group block">
        <div className="relative">
          <img src={p.cover} alt="" loading="lazy" className="block w-full" />
          {/* desktop overlay: titel naast de foto, op vaste afstand */}
          <span
            className={`pointer-events-none absolute bottom-0 hidden md:block whitespace-nowrap text-[17px] tracking-tight opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${titleSideDesktop}`}
          >
            {p.title}
          </span>
        </div>
        {/* mobiel: titel ONDER de foto bij tap/hover */}
        <span className="mt-2 block md:hidden text-[15px] tracking-tight opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100">
          {p.title}
        </span>
      </Link>
    </li>
  );
}

export function ProjectsIndex() {
  return (
    <section className="px-5 pb-32 pt-4">
      <ul className={`flex flex-col ${GAP}`}>
        {projects.map((p) => (
          <ProjectRow key={p.id} p={p} />
        ))}
      </ul>
    </section>
  );
}

// ------------------------------------------------------------
//  PROJECT DETAIL
// ------------------------------------------------------------

export function ProjectDetail({ project }: { project: Project }) {
  const media: { type: "img" | "video"; src: string }[] = [
    { type: "img", src: project.cover },
    ...(project.images ?? []).map((src) => ({ type: "img" as const, src })),
    ...(project.videos ?? []).map((src) => ({ type: "video" as const, src })),
  ];

  return (
    <article className="px-5 pb-32 pt-4">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-[18px] md:text-[22px] tracking-tight">{project.title}</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">
          {project.year}{project.location ? ` · ${project.location}` : ""}
        </p>
        <p className="mx-auto mt-6 max-w-prose whitespace-pre-line text-[15px] leading-relaxed">
          {project.description}
        </p>
        {project.pdfs && project.pdfs.length > 0 && (
          <ul className="mt-6 flex justify-center gap-4 text-[13px]">
            {project.pdfs.map((pdf) => (
              <li key={pdf.file}>
                <a href={pdf.file} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                  {pdf.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* masonry layout via css columns: foto's vullen verticaal de witruimte
          op zodat portret/landschap netjes naast elkaar passen zonder gaten. */}
      <div className="columns-1 md:columns-2 gap-6 [column-fill:_balance]">
        {media.map((m, i) => (
          <div key={i} className="mb-6 break-inside-avoid">
            {m.type === "img" ? (
              <img src={m.src} alt="" loading="lazy" className="block w-full" />
            ) : (
              <div className="aspect-video w-full bg-muted">
                <iframe
                  src={m.src}
                  title=""
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-[13px] lowercase">
        <Link to="/" className="underline underline-offset-4">terug naar projecten</Link>
      </div>
    </article>
  );
}

// ------------------------------------------------------------
//  INFO PAGINA
//
//  Foto's krijgen GEEN titel bij hover (zoals gevraagd).
// ------------------------------------------------------------

export function InfoPage() {
  return (
    <section className="px-5 pb-32 pt-4">
      <div className="mx-auto mb-12 max-w-prose text-center">
        <h1 className="text-[18px] md:text-[22px] tracking-tight">{info.name}</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">{info.role}</p>
        <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed">{info.about}</p>

        {info.links.length > 0 && (
          <ul className="mt-6 flex justify-center gap-4 text-[13px]">
            {info.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}

        {info.pdfs.length > 0 && (
          <ul className="mt-3 flex justify-center gap-4 text-[13px]">
            {info.pdfs.map((pdf) => (
              <li key={pdf.file}>
                <a href={pdf.file} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                  {pdf.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className={`flex flex-col ${GAP}`}>
        {info.photos.map((ph, i) => (
          <li key={i} className={`w-full ${WIDTH_MAP[ph.size]} ${ALIGN_MAP[ph.align]}`}>
            <img src={ph.src} alt="" loading="lazy" className="block w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}

// ------------------------------------------------------------
//  ROOT LAYOUT + foutpagina's
// ------------------------------------------------------------

const queryClient = new QueryClient();

export function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-[16px] lowercase">pagina niet gevonden</h1>
        <Link to="/" className="mt-4 inline-block underline lowercase">terug naar projecten</Link>
      </div>
    </div>
  );
}

export function ErrorView({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-[16px] lowercase">er ging iets mis</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-4 underline lowercase"
        >
          opnieuw proberen
        </button>
      </div>
    </div>
  );
}

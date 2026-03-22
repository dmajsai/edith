"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronDown, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from "@/components/Modal";

/* ─────────────────── helpers ─────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ═══════════════════ DATA ═══════════════════ */

/* ── Services ── */
type Category = "eskuvo" | "temetesi" | "unnepi";

interface ServiceCard {
  title: string;
  img: string;
  category: Category;
  modalEyebrow: string;
  modalContent: React.ReactNode;
}

const services: ServiceCard[] = [
  /* ── Esküvői ── */
  {
    title: "Az ünnep születése – Az esküvő",
    img: "/img/Esküvői szertartások 1..jpg",
    category: "eskuvo",
    modalEyebrow: "Esküvői szertartás",
    modalContent: (
      <>
        <p>Van egy nap, amely nem ismételhető. Egyetlen reggel, egyetlen délután, egyetlen pillanatsor, amelyben két ember kimondja azt, amit a szíve már régóta tud. Ez a nap nem próbálható újra, nem lehet „majd máskor". Éppen ezért különösen törékeny és különösen értékes.</p>
        <p><strong>Az esküvő nem csupán esemény. Az esküvő ünnep.</strong></p>
        <p>És az ünnep nem attól válik ünneppé, hogy megtörténik – hanem attól, hogy figyelemmel, szeretettel és szándékkal formáljuk. A hangokból, a szavakból, a tekintetekből. A helyből, ahol megáll az idő egy pillanatra, hogy teret adjon annak, ami igazán fontos.</p>
        <p>A ceremónia stílusa, a részletek finomsága, az elhangzó beszéd mind-mind fényt ad ehhez a naphoz. Egy olyan beszéd, amely nem sablonokból épül, nem visszhangja más esküvőknek, hanem csak és kizárólag rólatok szól. A ti történetetekről. A ti csendjeitekről, nevetéseitekről, egymásra találásotokról.</p>
        <p className="italic" style={{ color: "var(--gold)" }}>Amikor a szavak pontosan odaérnek, ahová kell, akkor az esküvő nemcsak különleges lesz – hanem emlékké válik, amely érzésként marad meg.</p>
        <p className="font-cinzel text-sm tracking-wider mt-6" style={{ color: "var(--pearl-white)" }}>A hely, ahol az ígéret megszületik</p>
        <p>Hogy hol történjen mindez? Ott, ahol a szívetek otthon érzi magát. Egy kertben, ahol a fény átszűrődik a lombokon. Egy tóparton, ahol a víz csendje kíséri az ígéreteket. Egy erdei tisztáson, egy kilátón, egy hajón, egy barlang különleges ölelésében.</p>
        <p>Én abban szeretnék mellettetek állni, hogy az esküvőtök valóban ünneppé váljon.</p>
      </>
    ),
  },
  {
    title: "Megerősítő szertartás",
    img: "/img/Megerősítő szertartás 1..jpg",
    category: "eskuvo",
    modalEyebrow: "Esküvői szertartás",
    modalContent: (
      <>
        <p>A megerősítő szertartás egy különleges alkalom, amikor egy már házas pár – legyen az 5, 10, 25 vagy akár 50 éve együtt – újra kimondja egymásnak: <em>„Igen, újra téged választanálak."</em></p>
        <p>Ez a szertartás nem jogi aktus, hanem az összetartozás ünneplése. Egy pillanat, amikor megállunk, visszatekintünk az együtt megtett útra, és hálát adunk azért, ami van.</p>
        <p>A megerősítő szertartás stílusa teljesen szabad: lehet visszafogott és bensőséges, vagy éppen nagyszabású ünnepség része. Készülhet meglepetésként is a házastárs számára, vagy közös tervezéssel, a gyerekek, unokák aktív bevonásával.</p>
        <p className="italic" style={{ color: "var(--gold)" }}>Mert a szeretetet nem elég egyszer kimondani – érdemes időről időre megünnepelni.</p>
      </>
    ),
  },

  /* ── Temetési ── */
  {
    title: "A polgári búcsúztató feladata",
    img: "/img/Egy temetési polgári búcsúztató feladata.jpg",
    category: "temetesi",
    modalEyebrow: "Polgári búcsúztatás",
    modalContent: (
      <>
        <p>Egy temetési polgári búcsúztató feladata különös súlyt és kivételes felelősséget hordoz: jelen lenni akkor, amikor a szavak elfogynak, és mégis szükség van rájuk. Ez a hivatás nem a szereplésről szól, hanem a háttérben maradó, figyelmes szolgálatról. Arról az emberi és szakmai jelenlétről, amely a gyász legnehezebb óráiban kapaszkodót kínál azoknak, akik elveszítették szerettüket.</p>
        <p>A polgári búcsúztatói hivatás szépsége és nemessége abban rejlik, hogy hidat teremt az elmondhatatlan és a kimondható között. Segít formát adni a veszteségnek, szavakba önteni az emlékeket, érzéseket, hálát és szeretetet, amelyek a családtagokban és barátokban élnek, de amelyeket ebben a megrendült állapotban nehéz megfogalmazni.</p>
        <p>A búcsúztató nem saját gondolatait mondja el, hanem a család hangjává válik: figyel, kérdez, megért, majd mindezt úgy rendezi egységgé, hogy az elhunyt életét, emberi méltóságát és egyediségét tükrözze.</p>
        <p>Ez a feladat azért szép, mert a legnagyobb fájdalomban is az emberi méltóságot szolgálja. Nem tolakodó vigaszt nyújt, hanem csendes, őszinte gondolatokkal segít elfogadni a búcsú pillanatát. Teret ad a könnyeinknek, az emlékezésnek, és annak a szeretetnek, amely a halállal nem szűnik meg, csak más formában él tovább.</p>
        <p className="italic" style={{ color: "var(--gold)" }}>A polgári búcsúztató munkája akkor válik igazán nemessé, amikor a szertartás végén a család úgy érezheti: szerettüktől a lehető legnagyobb tisztelettel, a legmélyebb szeretettel és méltósággal búcsúztak el.</p>
      </>
    ),
  },
  {
    title: "A búcsúztatás menete",
    img: "/img/Polgári temetési búcsúztatók 1..jpg",
    category: "temetesi",
    modalEyebrow: "Polgári búcsúztatás",
    modalContent: (
      <>
        <p
          className="font-cinzel text-[10px] tracking-[0.28em] uppercase"
          style={{ color: "var(--gold)" }}
        >
          Hogyan zajlik egy szertartás lépésről lépésre
        </p>
        <p><strong>Szertartás megrendelése és egyeztetése</strong></p>
        <p>A honlapomon feltüntetett elérhetőségek bármelyikén fel tudja venni velem a kapcsolatot. Fontos, hogy a kapcsolatfelvétel minden esetben egyeztetek Önnel a szertartás részleteiről, a búcsúztató szövegéről.</p>
        <div className="border-l-2 pl-4 py-1 my-4" style={{ borderColor: "rgba(196,164,86,0.4)", background: "rgba(196,164,86,0.04)" }}>
          <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "var(--gold)" }}>Fontos – első e-mail tartalma</p>
          <ul className="space-y-1 text-sm" style={{ color: "var(--silver)" }}>
            <li>◈ az elhunyt neve</li>
            <li>◈ a temetés időpontja, helye, helyszíne</li>
            <li>◈ milyen temetést szeretne megrendelni (egyházi, polgári)</li>
            <li>◈ az Ön telefonszáma és neve</li>
          </ul>
        </div>
        <p><strong>Az elhunyt életútjának megbeszélése</strong></p>
        <p>Figyelemmel arra, hogy az elhunyt életútjával, a temetéssel kapcsolatos megbeszélések kiemelt odafigyelést igényelnek, a legtöbb esetben a személyes megbeszélést helyezem előtérbe. A kötetlen beszélgetés mintegy 1,5–2 órát vesz igénybe, kronológiai sorrendben haladva érintjük az elhunyt életét.</p>
        <p>Amennyiben Ön is a személyes találkozót preferálja, természetesen Önnek és a családjának megfelelő időpontot egyeztetve találkozunk otthonában vagy megfelelő helyszínen. Nagyobb távolság esetén online beszélgetésben is megoldható, amelyhez több családtag eltérő helyszínről is tud csatlakozni.</p>
        <p className="italic" style={{ color: "var(--gold)" }}>Szeretek hallani megtörtént humoros történeteket, egyéniséget kifejező jelzőket és bármilyen információt, ami segít a méltó búcsúbeszéd megírásában.</p>
      </>
    ),
  },
  {
    title: "Búcsúztatói helyszínek",
    img: "/img/Polgári temetési búcsúztatók 2..jpg",
    category: "temetesi",
    modalEyebrow: "Polgári búcsúztatás",
    modalContent: (
      <>
        <p>Egy hamvasztás utáni búcsúztatásnál sokféle méltó és elegáns helyszín szóba jöhet:</p>
        <ul className="list-none space-y-3 pl-0">
          <li><strong className="text-[#dce9f7]">Temetői ravatalozó</strong> — Klasszikus és visszafogott megoldás, könnyen megszervezhető.</li>
          <li><strong className="text-[#dce9f7]">Templom vagy kápolna</strong> — Mélyen ünnepélyes, emelkedett légkör.</li>
          <li><strong className="text-[#dce9f7]">Emlékpark, arborétum, kert</strong> — Természetközeli, nyugodt hangulat, tavasztól őszig különösen gyönyörű.</li>
          <li><strong className="text-[#dce9f7]">Polgári szertartóhely</strong> — Elegáns, letisztult, világnézetileg semleges.</li>
          <li><strong className="text-[#dce9f7]">Kulturális helyszín</strong> — Különösen illik, ha az elhunyt kötődött a művészethez.</li>
          <li><strong className="text-[#dce9f7]">Természetes helyszín</strong> — Erdő, tópart, hegyvidék – meghitt, szimbolikus búcsú.</li>
        </ul>
        <p className="italic mt-4" style={{ color: "var(--gold)" }}>A választásnál figyelembe vesszük az elhunyt kívánságait, a család világnézetét, a vendégek számát és a megközelíthetőséget.</p>
      </>
    ),
  },
  {
    title: "Zene kiválasztása a búcsúztatáshoz",
    img: "/img/Temetési zene 2..jpg",
    category: "temetesi",
    modalEyebrow: "Polgári búcsúztatás",
    modalContent: (
      <>
        <p>A temetési búcsúztató zenéje nem pusztán hangok egymásutánja, hanem az emlékezés egyik legmélyebb nyelve. Amikor a szavak már nehezen formálódnak, a zene képes kimondani mindazt, amit a szív hordoz: a fájdalmat, a hálát, a szeretetet és az elengedés csendes bátorságát. Az alkalomhoz illő dallam megállítja az időt egy pillanatra, teret ad a gyásznak, és segít abban, hogy az érzések biztonságosan felszínre kerülhessenek.</p>
        <p>Az elhunythoz illő zene kiválasztása azért különösen fontos, mert hidat képez az élet és az emlékezet között. Egy olyan dallam, amely az ő személyiségét, ízlését, életszeretetét vagy csendes bölcsességét tükrözi, nemcsak róla mesél, hanem visszahozza őt közénk egy utolsó, bensőséges pillanatra. Ilyenkor a zene emlékké válik: felidéz egy mosolyt, egy közös pillanatot, egy hangulatot, amely örökre összeköt bennünket vele.</p>
        <p>A gondosan megválasztott zene tiszteletet fejez ki – tiszteletet az életút iránt, amely lezárul, és azok iránt is, akik búcsúznak. Segít abban, hogy a búcsú ne csak fájdalmas legyen, hanem méltóságteljes és igaz.</p>
        <p className="italic" style={{ color: "var(--gold)" }}>Mert amikor a dallam valóban az elhunytat szólaltatja meg, a búcsú nem csupán elengedés, hanem szeretettel teli megőrzés is: annak kimondása, hogy volt, fontos volt, és velünk marad.</p>
      </>
    ),
  },
  {
    title: "Memoár írása",
    img: "/img/Memoár írása.jpg",
    category: "temetesi",
    modalEyebrow: "Polgári búcsúztatás",
    modalContent: (
      <>
        <p>Ha csak a szűkebb ismeretségi körömben tekintek körül, megindító gazdagság tárul elém: értékes emberek sokasága, különleges és megismételhetetlen életutak, megélt tapasztalatok, megszerzett tudás és csendes bölcsesség. Mindannyian magukban hordoznak valami tiszteletre méltót – egy tartást, egy szeretettel átszőtt szemléletet, amely nyomot hagyott a világban. Ők azok, akiknek élete önmagában is történet: élő lenyomata egy kornak, egy családnak, egy közösségnek.</p>
        <p>A memoár nem csupán emlékezés, hanem ajándék az utókornak: híd múlt és jövő között. Lehetőség arra, hogy amikor egy élet földi küldetése beteljesül, a visszatekintés mindig tiszta, méltó és szeretetteljes legyen. A gondosan megalkotott memoár megkönnyíti a hozzátartozók dolgát is, amikor búcsúztatót állítanak össze – hiteles, belülről fakadó képet ad az emberről, akitől búcsúznak, nem csupán adatokkal, hanem lélekkel, gondolatokkal, értékekkel.</p>
        <p className="italic" style={{ color: "var(--gold)" }}>Bátorítok minden kedves olvasót, hogy gondolja végig élete legfontosabb állomásait – hívjanak meg egy hosszú, őszinte beszélgetésre, osszák meg velem történetüket, hogy belőle egy időtálló, szívből született memoár születhessen.</p>
      </>
    ),
  },
  {
    title: "Emlékfilm készítése",
    img: "/img/Emlékfilm készítése.jpg",
    category: "temetesi",
    modalEyebrow: "Polgári búcsúztatás",
    modalContent: (
      <>
        <p>Napjaink egyik legmeghittebb és legkülönlegesebb mozzanata a búcsúztatás során az Emlékfilm bemutatása, amely az elhunyt életútját idézi meg képekben és hangulatokban.</p>
        <p>Régi fényképek, családi emlékek, iskolai bizonyítványok, megsárgult okiratok és személyes relikviák kelnek új életre, finom zenei aláfestéssel kísérve – egy olyan időtlen történetté formálva, amely túlmutat a szavakon. Egy-egy mosoly, tekintet vagy kézírás többet mond minden beszédnél: az élet teljességét, az emberi kapcsolatok mélységét és az együtt megélt pillanatok értékét hordozza.</p>
        <p>Az Emlékfilm nem csupán felidézi az eltelt éveket, hanem hidat teremt múlt és jelen között, segítve a csendes emlékezést és a méltó búcsút.</p>
        <p>Az Életútfilm elkészítésére akkor is lehetőség van, ha a család a temetési szertartás során nem kívánja azt bemutatni. A film megtekinthető a temetést követő Szeretetvacsorán (halotti toron), vagy akár egy későbbi alkalommal, szűk családi körben – amikor az emlékezés már csendesebb, személyesebb formát ölt.</p>
        <p className="italic" style={{ color: "var(--gold)" }}>Ez az emlékfilm nem csupán a búcsú része, hanem maradandó ajándék a család számára: egy megőrzött életút, amelyhez bármikor vissza lehet térni, szeretettel és tisztelettel.</p>
      </>
    ),
  },

  /* ── Ünnepi ── */
  {
    title: "Ünnepi köszöntő beszédek írása",
    img: "/img/Ünnepi beszédek írása különleges alkalmakra.jpg",
    category: "unnepi",
    modalEyebrow: "Ünnepi köszöntők",
    modalContent: (
      <>
        <p>Egy kivételes alkalomra szóló, igazán jól megkomponált ünnepi köszöntő, amely családtagokkal, barátokkal és kollégákkal folytatott beszélgetésekből, az ő történeteikből építkezik, azért válik mélyen személyessé és életre szólóvá, mert nem kívülről szemléli az ünnepeltet, hanem az életén keresztül szól hozzá.</p>
        <p>Ezek a történetek nem „száraz tények", hanem közös emlékek lenyomatai: apró pillanatok, amelyekben az ünnepelt valódi arca megmutatkozik. Amikor valaki magára ismer egy humoros anekdotában, egy megható emlékben, vagy egy váratlanul pontos jellemzésben, az azt az érzést kelti benne, hogy valóban látják, értik és fontos mások számára.</p>
        <p>Az ilyen köszöntő azért felejthetetlen élmény, mert érzelmi hidat épít múlt és jelen között. Egyszerre idéz fel nevetést és csendes meghatottságot, és éppen ettől válik hitelessé. A humor oldja a feszültséget, a szomorúbb történetek mélységet adnak, az emlékezetes sztorik pedig megmutatják, milyen hatással volt az ünnepelt mások életére.</p>
        <p>Az ajándék fénye egyértelműen emelkedik, ha a köszöntőt a jeles alkalmon felolvassák, vagy különleges nyomtatásban, igényes mappában adják át. A felolvasás ünnepélyessé teszi a pillanatot, közös figyelmet teremt, és lehetőséget ad arra, hogy az érzelmek ott és akkor megszülessenek.</p>
        <p className="italic" style={{ color: "var(--gold)" }}>Legyen szó nagy születésnapi buliról vagy meghitt családi összejövetelről, egy ilyen köszöntő nem csupán része az ünnepnek, hanem maga is ajándékká válik – olyanná, amely valóban személyes, időtálló és emlékezetes.</p>
        <p><strong>Tipikus alkalmak:</strong> kerek születésnap, nyugdíjba vonulás, ballagás, évfordulók, családi ünnepségek.</p>
      </>
    ),
  },
];

/* ── FAQ ── */
const faqItems = [
  {
    q: "Mi az a hajós temetés vagy más néven vízi búcsúztatás?",
    a: "A hajós temetés egy urnás búcsúztatási forma, amely során a temetési szertartás egy hajón vagy vízparton történik, majd a család a folyó vagy tó közepén bio lebomló urnában helyezi a vízre az elhunyt hamvait hajóról, csónakról vagy kompról. Ez egy természetközeli, meghitt és békés búcsúzási lehetőség.",
  },
  {
    q: "Mit jelent pontosan a dunai hajós temetés?",
    a: "A dunai hajós temetés során egy erre a célra biztosított hajóval indulunk a folyóra, ahol meghitt szertartás keretében történik a hamvak szórása vagy vízbe helyezése egy vízben oldódó urnában. A Duna méltósága és folyása szimbolikusan is segít az elengedésben.",
  },
  {
    q: "Miben más a hajós temetés, mint a hagyományos temetés?",
    a: "A legnagyobb különbség a szabadságban és személyre szabhatóságban rejlik. A hajós temetés nem kötött helyhez vagy időponthoz, nincs szükség sírhelyre, temetői költségekre. A család választhatja ki a helyszínt, az időpontot, a zenét, a búcsúbeszéd stílusát és hosszát. Az egész esemény intimebb, személyesebb és gyakran érzelmileg megnyugtatóbb is.",
  },
  {
    q: "Mennyibe kerül egy hajós temetés?",
    a: "A hajós temetés költséghatékony alternatíva lehet a hagyományos temetkezéssel szemben — nincs sírhelyvásárlás, síremlék-állítás vagy karbantartás. Az ár attól függ, milyen szolgáltatásokat kér a család: például élő virágdekorációt, életút filmet, vagy hosszabb hajó utat. Minden esetben egyedi igény alapján készítek árajánlatot. Vízparti búcsúztatás komplett szervezéssel 200 000 Ft-tól, hajós temetés komplett szervezéssel 260 000 Ft-tól indul.",
  },
  {
    q: "Hány fő vehet részt a hajós búcsúztatáson?",
    a: "A résztvevők számához ajánlok hajókat, amelyek 22 főtől egészen 400 fő befogadóképességűek. A kompokra 50–60 fő is fel tud szállni. A vízparti búcsúztatásoknál csak a közvetlen családtagok (2–7 fő) szállhatnak csónakba, a többi jelenlévővel együtt a vízpartról nézzük a vízi urna folyóba helyezését. Az eseményt teljes mértékben a család igényeihez igazítom.",
  },
  {
    q: "Mi történik, ha rossz az időjárás?",
    a: "Teljes mértékben rugalmas vagyok az időpont módosításában. Rossz idő esetén vagy átszervezzük az alkalmat, vagy a kezdési órát igazítjuk a természethez — mindig tisztelettel és empátiával a család felé. Dunai hajós búcsúztatás egyébként bármilyen időjárás esetén megtartható, az év 365 napján, hiszen a hajók klimatizáltak.",
  },
  {
    q: "Milyen urna kerülhet vízbe?",
    a: "Kizárólag biológiailag lebomló, vízben oldódó urnát használunk, amely teljes mértékben természetes anyagból készül. A leggyakoribb típusok: só urna, agyag urna, papír henger urna, papír urnapárna. Az urna süllyedési ideje függ a hamvak mennyiségétől, súlyától, a széltől és az áramlattól. Ha kérdése van a vízi urnák kiválasztásával kapcsolatban, keressen bizalommal.",
  },
  {
    q: "Ki szervezi meg a vízi temetést és ki tartja a búcsúztatást?",
    a: "A búcsúztatást én magam írom és vezetem, minden esetben az elhunyt életéhez és a család kívánságaihoz igazítva. A vízi temetés teljeskörű szervezését — hajó foglalást, dekorálást, életút film készítést, hangosítást, vízügyi engedély megkérését — teljes körűen magam végzem és intézem Ön helyett.",
  },
  {
    q: "Lehet-e virágot a vízre helyezni?",
    a: "Igen, lehetőség van arra, hogy a családtagok élő szálas virágokat, virágszirmokat vagy lebomló koszorút helyezzenek a vízre az urna után. Mesterséges virágokat, drót- vagy szatén szalagot nem használunk, hogy a természet tisztaságát megőrizzük.",
  },
  {
    q: "Milyen ruházat ajánlott a hajós temetésre?",
    a: "Kényelmes, de alkalomhoz illő, visszafogott öltözet ajánlott. Nincs szigorú előírás, de a fekete vagy sötét színek helyett sok család a természetes tónusokat részesíti előnyben. Nyáron ajánlott az összetett fehér-sötét öltözet. A vízparton és a hajón pára és közvetlen napsugárzás is számíthat — érdemes erre is felkészülni.",
  },
  {
    q: "Hogyan történik a vízi temetés időpontjának egyeztetése?",
    a: "A kapcsolatfelvétel után közösen egyeztetünk időpontot, figyelembe véve a család igényeit és az időjárás alakulását. Ezt követően egyeztetek a kiválasztott hajózási céggel, csónakossal vagy révésszel. A hajó foglalása után pontosítjuk a família kéréseit és megbeszéljük a búcsúztatón elhangzó életutat és zenéket.",
  },
  {
    q: "Mikor választható a hajós temetés Budapesten?",
    a: "A hajós temetés Budapesten egész évben ideális, hiszen a fűthető-hűthető hajókon akár egész évben megoldható. Az időpont egyeztetés során figyelembe veszem a család igényeit és az időjárási körülményeket is.",
  },
  {
    q: "Hogyan zajlik a temetés a Dunán és a Tiszán?",
    a: "A temetés a folyók egy meghatározott folyószakaszán történik. A család és barátok a hajón vesznek részt az elbúcsúzásban, amelyet zene, vers, búcsúbeszéd vagy csendes jelenlét kísérhet. A hamvak szórása vagy vízre helyezése a hajóról történik — akár a családtag is elengedheti a biológiailag lebomló vízi urnát.",
  },
  {
    q: "A vízi urna mennyi idő alatt süllyed el?",
    a: "Változó: a párna urnák 3–6 percig úsznak, a vastagabb henger alakú papír urnák akár 10–15 percig. Az agyag urnák szinte azonnal alámerülnek — ezt a típust akkor érdemes választani, ha egy pontos helyen szeretnék elengedni a szerette vízi urnáját.",
  },
  {
    q: "A vízügyi engedélyt ki kéri meg? Egyáltalán engedélyezik a hamvak vízbe szórását?",
    a: "Természetesen engedélyezi az adott vízügyi igazgatóság, attól függően melyik folyón és mely szakaszán szeretné. A vízügyi hozzájárulói engedély az ügyintézésem része — ezzel Önnek nem kell foglalkoznia. Amint megkapom, PDF-ben továbbítom e-mailben.",
  },
  {
    q: "Budapesten hol lehet vízi urnát elengedni?",
    a: "Budapesten a hamvak szórása kizárólag az Újpesti vasúti összekötő híd feletti, vagy a Rákóczi híd alatti Duna-szakaszon végezhető. A partélektől 100 méteres vízfelületen belül tilos. A Ráckevei (Soroksári)-Duna teljes területén és az Ipoly folyóban tilos a hamvak vízbe szórása. Kijelölt fürdőzőhely felett 500 méteren belül, illetve az alatt 100 méteren belül szintén tilos. Az engedélyezési eljárást és a helyszín kiválasztását teljes körűen intézem.",
  },
];

/* ── Prices ── */
const eskuvoiArak = [
  { name: "Esküvői szertartás (Budapest és 30 km-es vonzáskörzete)", price: "60 000 Ft" },
  { name: "Esküvői szertartás utazással (30 km-en kívül)", price: "60 000 Ft + 10 000 Ft útiköltség" },
  { name: "Megerősítő szertartás (Budapest és 30 km-es vonzáskörzete)", price: "50 000 Ft" },
  { name: "Megerősítő szertartás utazással (30 km-en kívül)", price: "50 000 Ft + 10 000 Ft útiköltség" },
];

const temetesiArak = [
  { name: "Polgári búcsúztatás személyes életúttal", price: "60 000 Ft" },
  { name: "Búcsúztatás személyes életút mellőzésével", price: "45 000 Ft" },
  { name: "Hangosítás mobil hangfalakkal", price: "20 000 Ft" },
  { name: "Urna ravatal felállítása", price: "30 000 Ft" },
  { name: "Hétvégi felár", price: "40 000 Ft" },
  { name: "Munkaidő utáni felár (16:00 után)", price: "40 000 Ft" },
  { name: "Életút film (100 képig)", price: "50 000 Ft" },
  { name: "Vízi hajós temetés szervezése", price: "60 000 Ft" },
  { name: "Temetőn kívüli búcsúztatás szervezése", price: "65 000 Ft" },
  { name: "Memoár írása", price: "70 000 Ft-tól" },
  { name: "Csónakos/hajó bérlés", price: "20 000–50 000 Ft" },
  { name: "Komp bérlése", price: "25 000–60 000 Ft" },
  { name: "Vízügyi engedély ügyintézése", price: "Díjtalan" },
  { name: "Légügyi engedély ügyintézése", price: "40 000 Ft" },
];

/* ── Testimonials ── */
const testimonials = [
  {
    name: "Kovács Ildikó",
    text: "\u201EÉletem egyik legnehezebb napján Edit\u2019h olyan méltósággal és empátiával vezette a szertartást, hogy a család minden tagja úgy érezte: szerettünktől a lehető legszebben búcsúzhattunk el.\u201D",
  },
  {
    name: "Tóth Gergely és Boglárka",
    text: "\u201EAz esküvői szertartásunk pontosan olyan volt, amilyennek álmodtuk \u2013 személyes, megható, és minden szó a helyén volt. Köszönjük, hogy az ünnepünket igazán ünneppé tetted!\u201D",
  },
  {
    name: "Németh család",
    text: "\u201EÉdesanyánk búcsúztatója a róla szóló szavakon keresztül újra visszahozta közénk \u2013 nevettünk, sírtunk, és végül békével engedtük el. Köszönjük a gondosságot és a szívből jövő munkát.\u201D",
  },
];

/* ── Blog preview ── */
const blogPreviews = [
  {
    title: "Mitől igazán személyes egy búcsúztatás?",
    excerpt: "A személyes hangvételű búcsúbeszéd nem sablonokból épül. Miért fontos, hogy az elhunyt egyénisége tükröződjön a szertartásban — és hogyan segíthetek ebben.",
    date: "2025. június",
  },
  {
    title: "Esküvői szertartás a szabadban — tippek és tapasztalatok",
    excerpt: "Tópart, erdei tisztás vagy hegycsúcs? A szabadtéri esküvő varázsa és a szervezés buktatói — saját élményeim és tanácsaim.",
    date: "2025. május",
  },
  {
    title: "Mikor érdemes memoárt íratni?",
    excerpt: "Nem csak utólag, hanem előre is készülhetünk. Miért ajándék egy időben megírt memoár az egész családnak.",
    date: "2025. április",
  },
];

/* ═════════════════════════════════════════════ */
/*                  SECTIONS                    */
/* ═════════════════════════════════════════════ */

/* ─── 1. Hero ─── */
function HeroSection() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offset * 0.35}px)` }}
      >
        <Image
          src="/img/hero.jpeg"
          alt="Edit'h – Méltóság minden pillanatnak"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(5,12,24,0.55) 0%, rgba(5,12,24,0.3) 40%, rgba(5,12,24,0.7) 100%)",
        }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#f5f9ff] mb-6 drop-shadow-lg"
          style={{ animation: "reveal-from-bottom 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}
        >
          Edit<span className="text-[#c4a456]">&apos;h</span>
        </h1>
        <div
          className="flex items-center justify-center gap-4 mb-8"
          style={{ animation: "reveal-from-bottom 1s ease 0.5s both" }}
        >
          <span
            className="w-16 h-px origin-left"
            style={{ background: "linear-gradient(to right, transparent, #c4a456)", animation: "line-expand 0.9s ease 0.7s both" }}
          />
          <span className="text-[#c4a456] text-sm">◈</span>
          <span
            className="w-16 h-px origin-right"
            style={{ background: "linear-gradient(to left, transparent, #c4a456)", animation: "line-expand 0.9s ease 0.7s both" }}
          />
        </div>
        <p
          className="font-cormorant italic text-xl sm:text-2xl md:text-3xl text-[#dce9f7] tracking-wide"
          style={{ animation: "reveal-from-bottom 1s ease 0.8s both" }}
        >
          Méltóság minden pillanatnak
        </p>
      </div>

      <button
        onClick={() => document.getElementById("rolam")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#c4a456]/70 hover:text-[#c4a456] transition-colors"
        aria-label="Tovább a tartalomhoz"
        style={{ animation: "scroll-bounce 2s ease-in-out 1.4s infinite" }}
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}

/* ─── 2. Rólam ─── */
function RolamSection() {
  const { ref, visible } = useInView();
  return (
    <section id="rolam" className="section-padding" style={{ background: "var(--navy)" }}>
      <div ref={ref} className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center fade-up ${visible ? "is-visible" : ""}`}>
        <div>
          <span className="eyebrow">Bemutatkozás</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f9ff] mt-2 mb-8">Rólam</h2>
          <div className="space-y-5 font-inter text-base text-[#8fa8c8] leading-relaxed">
            <p>Szertartásvezetőként és polgári búcsúztatóként hiszem, hogy minden ember élete egyedi történet, amelyet méltósággal kell ünnepelni – legyen szó az élet legszebb vagy legnehezebb pillanatairól.</p>
            <p>Munkám során arra törekszem, hogy az esküvők, a búcsúztatások és az ünnepi alkalmak valóban azoknak az embereknek szóljanak, akikért összegyűltünk. Nem sablonokat mondok, hanem meghallgatom a történeteteket, és azokból építem fel a szertartást.</p>
            <p>Budapest és vonzáskörzetében vállalok szertartásvezetést, de távolabbra is szívesen utazom, ha a pillanat megkívánja.</p>
          </div>
        </div>
        <div
          className="relative aspect-[3/4] rounded-sm overflow-hidden"
          style={{ border: "1px solid rgba(196,164,86,0.15)" }}
        >
          <Image
            src="/img/Esküvői szertartások 2..jpg"
            alt="Edit'h portré"
            fill
            className="object-cover"
            style={{
              animation: visible ? "ken-burns 9s ease-out both" : "none",
              transform: visible ? undefined : "scale(1.07)",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(5,12,24,0.5) 100%)" }} />
          {/* subtle gold corner accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right, var(--gold), transparent 60%)", opacity: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Szolgáltatásaim ─── */
function SzolgaltatasokSection() {
  const { ref, visible } = useInView();
  const [activeTab, setActiveTab] = useState<Category>("eskuvo");
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  const tabs: { key: Category; label: string }[] = [
    { key: "eskuvo",   label: "Esküvői szertartások" },
    { key: "temetesi", label: "Polgári búcsúztatók" },
    { key: "unnepi",   label: "Ünnepi köszöntők" },
  ];

  const filtered = services.filter((s) => s.category === activeTab);
  const modalService = modalIdx !== null ? services[modalIdx] : null;

  return (
    <section id="szolgaltatasaim" className="section-padding" style={{ background: "var(--midnight)" }}>
      <div ref={ref} className={`max-w-6xl mx-auto fade-up ${visible ? "is-visible" : ""}`}>
        <div className="text-center mb-14">
          <span className="eyebrow">Amit kínálok</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f9ff] mt-2 mb-6">Szolgáltatásaim</h2>
          <div className="flex items-center justify-center gap-4 max-w-xs mx-auto">
            <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #c4a456)" }} />
            <span className="text-[#c4a456] text-xs">◈</span>
            <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #c4a456)" }} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`font-inter text-[10px] md:text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 border ${
                activeTab === key
                  ? "border-[#c4a456] text-[#c4a456] bg-[#c4a456]/10"
                  : "border-white/10 text-[#8fa8c8] hover:border-[#c4a456]/40 hover:text-[#c4a456]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className={`grid gap-6 ${
          filtered.length === 1
            ? "grid-cols-1 max-w-sm mx-auto w-full"
            : filtered.length === 2
            ? "sm:grid-cols-2 max-w-2xl mx-auto w-full"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}>
          {filtered.map((s, i) => {
            const globalIdx = services.indexOf(s);
            return (
              <button
                key={s.title}
                onClick={() => setModalIdx(globalIdx)}
                className="service-card card-enter group text-left"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(5,12,24,0.85) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="font-cinzel text-sm md:text-base text-[#f5f9ff] leading-snug">{s.title}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Service modal */}
      {modalService && (
        <Modal
          isOpen={modalIdx !== null}
          onClose={() => setModalIdx(null)}
          title={modalService.title}
          eyebrow={modalService.modalEyebrow}
          img={modalService.img}
        >
          {modalService.modalContent}
        </Modal>
      )}
    </section>
  );
}

/* ─── 4. Áraim ─── */
function AraimSection() {
  const { ref, visible } = useInView();
  const [showEskuvo, setShowEskuvo] = useState(false);
  const [showTemetesi, setShowTemetesi] = useState(false);

  return (
    <section id="araim" className="section-padding" style={{ background: "var(--navy)" }}>
      <div ref={ref} className={`max-w-5xl mx-auto fade-up ${visible ? "is-visible" : ""}`}>
        <div className="text-center mb-14">
          <span className="eyebrow">Árazás</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f9ff] mt-2">Áraim</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ── Esküvői árak card ── */}
          <div className="price-card flex flex-col">
            {/* ghost watermark number – decorative */}
            <div aria-hidden className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
              <span
                className="font-cinzel font-bold leading-none pr-6 pb-2"
                style={{ fontSize: "clamp(90px,13vw,150px)", color: "rgba(196,164,86,0.038)", letterSpacing: "-0.04em" }}
              >
                60<br/>000
              </span>
            </div>

            {/* eyebrow + title */}
            <div className="relative z-10 px-9 pt-9 pb-0">
              <span className="block font-inter text-[8px] tracking-[0.48em] uppercase mb-3" style={{ color: "var(--gold)" }}>Esküvői szertartások</span>
              <h3 className="font-cinzel text-2xl md:text-3xl text-[#eef4fc] leading-snug">Szertartásvezetés</h3>
              <p className="font-inter text-[12px] leading-relaxed mt-2.5 max-w-[70%]" style={{ color: "var(--muted)" }}>
                Esküvők és megerősítő szertartások, Budapesten és vidéken.
              </p>
            </div>

            {/* price row */}
            <div className="relative z-10 px-9 pt-5 pb-4 flex items-end gap-3">
              <span
                className="font-cinzel leading-none tracking-tighter"
                style={{ fontSize: "clamp(36px,5vw,52px)", color: "var(--gold)", animation: "gold-glow-pulse 4s ease-in-out infinite" }}
              >
                60 000
              </span>
              <div className="flex flex-col pb-1">
                <span className="font-inter text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>Ft-tól</span>
              </div>
            </div>

            {/* separator */}
            <div className="relative z-10 mx-9" style={{ height: "1px", background: "linear-gradient(to right, rgba(196,164,86,0.28), rgba(196,164,86,0.06) 70%, transparent)" }} />

            {/* features */}
            <div className="relative z-10 px-9 py-5 flex-1 space-y-3">
              {[
                "Budapest és 30 km-es vonzáskörzete",
                "Személyes konzultáció és szövegírás",
                "Egyedi, sablonmentes szertartás",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span style={{ color: "var(--gold)", fontSize: "8px", flexShrink: 0 }}>◈</span>
                  <span className="font-inter text-[12px] leading-relaxed" style={{ color: "var(--silver)" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* separator */}
            <div className="relative z-10 mx-9" style={{ height: "1px", background: "linear-gradient(to right, rgba(196,164,86,0.16), transparent)" }} />

            {/* CTAs */}
            <div className="relative z-10 px-9 pb-9 pt-5 flex flex-col gap-3">
              <button
                onClick={() => setShowEskuvo(true)}
                className="w-full py-3.5 font-inter text-[9px] tracking-[0.35em] uppercase transition-all duration-300"
                style={{ color: "var(--gold)", border: "1px solid rgba(196,164,86,0.25)", background: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(196,164,86,0.07)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(196,164,86,0.55)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(196,164,86,0.25)"; }}
              >
                Részletes árlista
              </button>
              <button
                onClick={() => document.getElementById("kapcsolat")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-3 font-inter text-[9px] tracking-[0.35em] uppercase transition-all duration-300"
                style={{ color: "var(--muted)", border: "1px solid rgba(143,168,200,0.12)", background: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(196,164,86,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(143,168,200,0.12)"; }}
              >
                Ajánlatot kérek
              </button>
            </div>
          </div>

          {/* ── Temetési árak card ── */}
          <div className="price-card flex flex-col">
            {/* ghost watermark number */}
            <div aria-hidden className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
              <span
                className="font-cinzel font-bold leading-none pr-6 pb-2"
                style={{ fontSize: "clamp(90px,13vw,150px)", color: "rgba(196,164,86,0.038)", letterSpacing: "-0.04em" }}
              >
                45<br/>000
              </span>
            </div>

            {/* eyebrow + title */}
            <div className="relative z-10 px-9 pt-9 pb-0">
              <span className="block font-inter text-[8px] tracking-[0.48em] uppercase mb-3" style={{ color: "var(--gold)" }}>Polgári búcsúztatók</span>
              <h3 className="font-cinzel text-2xl md:text-3xl text-[#eef4fc] leading-snug">Búcsúztatás</h3>
              <p className="font-inter text-[12px] leading-relaxed mt-2.5 max-w-[70%]" style={{ color: "var(--muted)" }}>
                Személyes búcsúztatás, emlékfilm, hangosítás, vízi temetés.
              </p>
            </div>

            {/* price row */}
            <div className="relative z-10 px-9 pt-5 pb-4 flex items-end gap-3">
              <span
                className="font-cinzel leading-none tracking-tighter"
                style={{ fontSize: "clamp(36px,5vw,52px)", color: "var(--gold)", animation: "gold-glow-pulse 4s ease-in-out 0.5s infinite" }}
              >
                45 000
              </span>
              <div className="flex flex-col pb-1">
                <span className="font-inter text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>Ft-tól</span>
              </div>
            </div>

            {/* separator */}
            <div className="relative z-10 mx-9" style={{ height: "1px", background: "linear-gradient(to right, rgba(196,164,86,0.28), rgba(196,164,86,0.06) 70%, transparent)" }} />

            {/* features */}
            <div className="relative z-10 px-9 py-5 flex-1 space-y-3">
              {[
                "Személyes életút-beszélgetés",
                "Méltó, bensőséges szertartás",
                "Emlékfilm, hangosítás, kiegészítők",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span style={{ color: "var(--gold)", fontSize: "8px", flexShrink: 0 }}>◈</span>
                  <span className="font-inter text-[12px] leading-relaxed" style={{ color: "var(--silver)" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* separator */}
            <div className="relative z-10 mx-9" style={{ height: "1px", background: "linear-gradient(to right, rgba(196,164,86,0.16), transparent)" }} />

            {/* CTAs */}
            <div className="relative z-10 px-9 pb-9 pt-5 flex flex-col gap-3">
              <button
                onClick={() => setShowTemetesi(true)}
                className="w-full py-3.5 font-inter text-[9px] tracking-[0.35em] uppercase transition-all duration-300"
                style={{ color: "var(--gold)", border: "1px solid rgba(196,164,86,0.25)", background: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(196,164,86,0.07)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(196,164,86,0.55)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(196,164,86,0.25)"; }}
              >
                Részletes árlista
              </button>
              <button
                onClick={() => document.getElementById("kapcsolat")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-3 font-inter text-[9px] tracking-[0.35em] uppercase transition-all duration-300"
                style={{ color: "var(--muted)", border: "1px solid rgba(143,168,200,0.12)", background: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(196,164,86,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(143,168,200,0.12)"; }}
              >
                Ajánlatot kérek
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[#5a7a9a] text-xs mt-8 italic">
          * Az árak tájékoztató jellegűek. Ünnepnapokon 50%-os felár kerül felszámításra. Egyedi ajánlatkérés a Kapcsolat szekcióban.
        </p>
      </div>

      {/* Esküvői árak modal */}
      <Modal isOpen={showEskuvo} onClose={() => setShowEskuvo(false)} title="Esküvői szertartás árak" eyebrow="Árlista">
        <div className="space-y-3">
          {eskuvoiArak.map((item) => (
            <div key={item.name} className="flex justify-between items-baseline gap-4 py-2" style={{ borderBottom: "1px solid rgba(143,168,200,0.1)" }}>
              <span className="text-[#dce9f7] text-sm">{item.name}</span>
              <span className="font-cinzel text-[#c4a456] text-sm whitespace-nowrap">{item.price}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-6 italic" style={{ color: "var(--muted)" }}>Ünnepnapokon 50%-os felár kerül felszámításra. Az útiköltség a szerződésben meghatározottak szerint kerül kiszámításra.</p>
      </Modal>

      {/* Temetési árak modal */}
      <Modal isOpen={showTemetesi} onClose={() => setShowTemetesi(false)} title="Polgári búcsúztatói árak" eyebrow="Árlista">
        <div className="space-y-3">
          {temetesiArak.map((item) => (
            <div key={item.name} className="flex justify-between items-baseline gap-4 py-2" style={{ borderBottom: "1px solid rgba(143,168,200,0.1)" }}>
              <span className="text-[#dce9f7] text-sm">{item.name}</span>
              <span className="font-cinzel text-[#c4a456] text-sm whitespace-nowrap">{item.price}</span>
            </div>
          ))}
        </div>
        <p className="text-xs mt-6 italic" style={{ color: "var(--muted)" }}>Az árak Budapest vonzáskörzetére vonatkoznak. Hétvégi, ünnepnapi és munkaidőn kívüli felár a fentiek szerint.</p>
      </Modal>
    </section>
  );
}

/* ─── 5. GYIK ─── */
function GyikSection() {
  const { ref, visible } = useInView();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="gyik" className="section-padding" style={{ background: "var(--midnight)" }}>
      <div ref={ref} className={`max-w-3xl mx-auto fade-up ${visible ? "is-visible" : ""}`}>
        <div className="text-center mb-14">
          <span className="eyebrow">Vízi temetés</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f9ff] mt-2">Gyakran Ismételt Kérdések</h2>
          <p className="font-cormorant italic text-lg text-[#8fa8c8] mt-4 max-w-xl mx-auto">
            Minden, amit a hajós és vízi búcsúztatásról tudni érdemes.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="border border-white/[0.06] transition-colors duration-300"
              style={{ background: openIdx === i ? "rgba(196,164,86,0.04)" : "rgba(255,255,255,0.02)" }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-inter text-sm md:text-base text-[#dce9f7]">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`}
                  style={{ color: "var(--gold)" }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIdx === i ? "500px" : "0", opacity: openIdx === i ? 1 : 0 }}
              >
                <p className="px-6 pb-5 font-inter text-sm text-[#8fa8c8] leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. Blog preview ─── */
function BlogSection() {
  const { ref, visible } = useInView();
  return (
    <section id="blog-section" className="section-padding" style={{ background: "var(--navy)" }}>
      <div ref={ref} className={`max-w-6xl mx-auto fade-up ${visible ? "is-visible" : ""}`}>
        <div className="text-center mb-14">
          <span className="eyebrow">Gondolatok</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f9ff] mt-2">Blog</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPreviews.map((post) => (
            <article
              key={post.title}
              className="group border border-white/[0.06] bg-white/[0.02] hover:border-[#c4a456]/30 transition-all duration-300 p-6"
            >
              <span className="block font-inter text-[10px] tracking-[0.3em] uppercase text-[#c4a456] mb-3">{post.date}</span>
              <h3 className="font-cinzel text-base text-[#f5f9ff] mb-3 leading-snug">{post.title}</h3>
              <p className="font-inter text-sm text-[#8fa8c8] leading-relaxed">{post.excerpt}</p>
              <span className="inline-block mt-4 font-inter text-[10px] tracking-[0.25em] uppercase text-[#c4a456]/60 group-hover:text-[#c4a456] transition-colors">
                Hamarosan →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. Kapcsolat ─── */
function KapcsolatSection() {
  const { ref, visible } = useInView();
  return (
    <section id="kapcsolat" className="section-padding" style={{ background: "var(--midnight)" }}>
      <div ref={ref} className={`max-w-4xl mx-auto fade-up ${visible ? "is-visible" : ""}`}>
        <div className="text-center mb-14">
          <span className="eyebrow">Elérhetőségek</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f9ff] mt-2">Kapcsolat</h2>
          <p className="font-cormorant italic text-lg text-[#8fa8c8] mt-4">
            Keressen bizalommal — minden megkeresésre személyesen válaszolok.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Phone */}
          <a
            href="tel:+3630000000"
            className="group flex flex-col items-center gap-4 p-8 border border-white/[0.06] bg-white/[0.02] hover:border-[#c4a456]/30 transition-all duration-300"
          >
            <Phone size={28} className="text-[#c4a456]" />
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-[#8fa8c8] group-hover:text-[#c4a456] transition-colors">Telefon</span>
            <span className="font-inter text-sm text-[#dce9f7]">+36 30 000 0000</span>
          </a>

          {/* Email */}
          <a
            href="mailto:hello@edith.hu"
            className="group flex flex-col items-center gap-4 p-8 border border-white/[0.06] bg-white/[0.02] hover:border-[#c4a456]/30 transition-all duration-300"
          >
            <Mail size={28} className="text-[#c4a456]" />
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-[#8fa8c8] group-hover:text-[#c4a456] transition-colors">E-mail</span>
            <span className="font-inter text-sm text-[#dce9f7]">hello@edith.hu</span>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-8 border border-white/[0.06] bg-white/[0.02] hover:border-[#c4a456]/30 transition-all duration-300"
          >
            <svg className="w-7 h-7 text-[#c4a456]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-[#8fa8c8] group-hover:text-[#c4a456] transition-colors">Facebook</span>
            <span className="font-inter text-sm text-[#dce9f7]">Facebook oldal</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 8. Ajánlások ─── */
function AjanlasokSection() {
  const { ref, visible } = useInView();
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  /* auto-advance on mobile */
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="ajanlasok" className="section-padding" style={{ background: "var(--navy)" }}>
      <div ref={ref} className={`max-w-6xl mx-auto fade-up ${visible ? "is-visible" : ""}`}>
        <div className="text-center mb-14">
          <span className="eyebrow">Vélemények</span>
          <h2 className="font-display text-4xl md:text-5xl text-[#f5f9ff] mt-2">Ajánlások</h2>
        </div>

        {/* Desktop: 3 cols */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* Tablet: 2 cols */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {testimonials.slice(0, 2).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* Mobile: slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.name} className="w-full flex-shrink-0 px-1">
                  <TestimonialCard {...t} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev} aria-label="Előző" className="p-2 text-[#8fa8c8] hover:text-[#c4a456] transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-[#c4a456] w-6" : "bg-[#8fa8c8]/30"
                  }`}
                  aria-label={`Ajánlás ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Következő" className="p-2 text-[#8fa8c8] hover:text-[#c4a456] transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="border border-white/[0.06] bg-white/[0.02] p-7 flex flex-col">
      <p className="font-cormorant italic text-base md:text-lg text-[#dce9f7] leading-relaxed flex-1">{text}</p>
      <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop: "1px solid rgba(143,168,200,0.1)" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#c4a456] font-cinzel text-sm" style={{ background: "rgba(196,164,86,0.12)" }}>
          {name.charAt(0)}
        </div>
        <span className="font-inter text-xs tracking-wider text-[#8fa8c8]">{name}</span>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════ */
/*                  PAGE                        */
/* ═════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RolamSection />
      <SzolgaltatasokSection />
      <AraimSection />
      <GyikSection />
      <BlogSection />
      <KapcsolatSection />
      <AjanlasokSection />
    </>
  );
}

import type { BlogPost } from "@/data/blog";

const link = {
  farbstoffe: "[Farbstoffe](/produkte/farbstoffe)",
  sets: "[Sets](/produkte/sets)",
  dekorationen: "[Dekorationen](/produkte/dekorationen)",
  produkte: "[Sortiment](/produkte)",
  kontakt: "[Kontakt](/kontakt)",
};

export const blogStories: BlogPost[] = [
  {
    slug: "ostereier-tradition-deutschland",
    title: "Ostereier in Deutschland: Traditionen und Bräuche",
    excerpt:
      "Warum bunte Eier zu Ostern gehören: Geschichte, regionale Bräuche in Deutschland und was das Färben heute für Familie und Handel bedeutet.",
    date: "2026-03-04",
    category: "Tradition",
    image: "/images/blog/easter.jpg",
    content: [
      {
        type: "p",
        text: "Bunte Eier gehören in Deutschland zum Osterfest wie der Sonntagsspaziergang und der gedeckte Frühstückstisch. Der Brauch ist älter als die modernen Farbpackungen, aber er lebt genau deshalb weiter: Er verbindet Frühling, Familie und ein sichtbares Zeichen für Neubeginn. Wer die Geschichte kennt, färbt nicht nur schneller, sondern versteht auch, warum bestimmte Farben, Muster und Rituale bis heute im Handel und zu Hause auftauchen.",
      },
      { type: "h2", text: "Woher das gefärbte Ei kommt" },
      {
        type: "p",
        text: "Das Ei steht seit der Antike für Leben und Fruchtbarkeit. Im christlichen Europa wurde es zum Bild der Auferstehung: Eine scheinbar tote Schale öffnet sich, und neues Leben kommt zum Vorschein. Weil während der Fastenzeit oft auf Eier verzichtet wurde, sammelten sich bis Ostern Vorräte. Färben machte die gekochten Eier unterscheidbar, haltbarer im Alltag und festlich genug für den Feiertag.",
      },
      {
        type: "p",
        text: "Rote Eier sind in vielen orthodoxen und osteuropäischen Traditionen die älteste festliche Farbe. In Deutschland kamen mit der Zeit Gelb, Grün, Blau und später Pastelltöne dazu. Was früher mit Zwiebelschalen, Rotkohl oder Rote-Bete-Saft entstand, erledigen heute lebensmittelgeeignete Farben mit planbarem Ergebnis. Der Sinn ist geblieben: Das Ei wird aus dem Alltag herausgehoben.",
      },
      { type: "h2", text: "Bräuche, die man in Deutschland noch sieht" },
      {
        type: "ul",
        items: [
          "Ostereier suchen: Versteckte Eier im Garten oder in der Wohnung, oft mit Schokolade ergänzt, für Kinder der Höhepunkt des Sonntags.",
          "Eierklopfen: Zwei Personen stoßen die Spitzen gegeneinander. Wessen Ei heil bleibt, gewinnt das andere.",
          "Osterbrunnen: Vor allem in der Fränkischen Schweiz schmücken bemalte Eier öffentliche Brunnen.",
          "Sorbische Ostereier: In der Lausitz werden Eier mit Wachs und feinen Mustern verziert, eine eigene Handwerkstradition.",
          "Der Ostertisch: Gefärbte Eier liegen in Schalen, Nestern oder Kränzen und bleiben oft die ganze Woche sichtbar.",
        ],
      },
      {
        type: "p",
        text: "Regional ist das Bild nicht einheitlich. Im Norden ist der Hasenbrauch stark, im Süden und in Franken die aufwendige Dekoration. Für den Handel heißt das: Ein Sortiment braucht nicht eine einzige Farbe, sondern eine kleine Spanne, aus der Familien ihren eigenen Brauch bauen.",
      },
      { type: "h2", text: "Warum Farbe den Brauch trägt" },
      {
        type: "p",
        text: "Ein naturfarbenes Ei ist Nahrung. Ein gefärbtes Ei ist ein Zeichen. Kinder erkennen sofort, dass diese Eier zum Fest gehören und nicht zum gewöhnlichen Frühstück. Klare Farben helfen auch im Verkauf: Auf dem Display muss aus zwei Metern Entfernung sichtbar sein, ob es um Pastell, kräftige Töne oder ein fertiges Set geht.",
      },
      {
        type: "p",
        text: "Drei Wirkungen erklären, warum der Brauch nicht verschwindet. Erstens schafft Farbe Wiedererkennung über Generationen. Zweitens macht sie das Ei zum Geschenk, nicht nur zur Speise. Drittens lässt sie Variation zu: Dieselbe Tradition sieht in Pastell, Marmor oder mit Aufklebern jedes Jahr etwas anders aus, ohne den Kern zu verlieren.",
      },
      { type: "h2", text: "Was sich seit den 1990er-Jahren geändert hat" },
      {
        type: "p",
        text: "Früher reichte oft eine Packung mit vier Grundfarben. Heute erwarten Haushalte und Händler planbare Ergebnisse, kindersichere Anwendung und ein klares Motiv auf der Packung. Kaltwasserfarben verkürzen die Zeit am Herd. Sets mit Schalen, Etiketten oder Aufklebern fassen den ganzen Brauch in eine Schachtel. Dekorationsmarker kommen nach dem Färben dazu, wenn das Ei schon seine Grundfarbe hat.",
      },
      {
        type: "p",
        text: "METMA produziert Eierfarben seit 1999 selbst, mit geschlossenem Prozess von der Rezeptur bis zur Packung. Der deutsche Auftritt des Sortiments richtet sich an Familien und an den Handel: nachvollziehbare Anwendung, wiedererkennbare Serien und Displays, die den Brauch in der Saison sichtbar machen.",
      },
      { type: "h2", text: "So bleibt der Brauch im Alltag tragfähig" },
      {
        type: "p",
        text: "Wer mit Kindern färbt, sollte die Schritte kurz halten und die Packungsanleitung lesen. Wer für den Tisch dekoriert, wählt wenige Farben und wiederholt sie in Servietten oder Zweigen. Wer für den Verkauf plant, stellt nicht zwanzig Einzelfarben nebeneinander, sondern eine klare Reihe: Grundfarben, ein Effekt wie Marmor oder Glitter, und ein Set für alle, die nichts einzeln zusammenstellen wollen.",
      },
      {
        type: "p",
        text: `Die Tradition erklärt, warum das Ei gefärbt wird. Das ${link.produkte} zeigt, womit das heute gelingt: ${link.farbstoffe} für die Farbe, ${link.sets} für den kompletten Ablauf und ${link.dekorationen} für Muster nach dem Färben. Fragen zum Handel beantwortet der ${link.kontakt}.`,
      },
    ],
  },
  {
    slug: "ostereier-faerben-mit-kindern",
    title: "Ostereier färben mit Kindern: Einfache und lustige Ideen",
    excerpt:
      "Sicher und ohne Chaos: Vorbereitung, altersgerechte Aufgaben und Ideen, damit Kinder Ostereier färben und das Ergebnis leuchtet.",
    date: "2026-03-08",
    category: "Mit Kindern",
    image: "/images/blog-easter.jpg",
    content: [
      {
        type: "p",
        text: "Ostereier färben mit Kindern gelingt, wenn die Erwachsenen die Vorbereitung übernehmen und die Kinder den sichtbaren Teil bekommen: Eintauchen, Vergleichen, Verzieren. Dann bleibt der Tisch bunt, ohne dass Farbe auf dem Boden oder im Mund landet. Der Nachmittag wird kürzer geplant als man denkt, und jedes Kind nimmt ein Ei mit nach Hause, das es selbst erkennt.",
      },
      { type: "h2", text: "Vorher den Platz herrichten" },
      {
        type: "ul",
        items: [
          "Tisch mit Zeitung, Wachstuch oder einer alten Decke auslegen. Eine Kante frei lassen, damit nichts heruntergeschoben wird.",
          "Eier am Vortag kochen, abschrecken und ganz auskühlen lassen. Warme Eier färben ungleichmäßig.",
          "Weiße Eier nehmen, wenn die Farbe klar werden soll. Braune Eier wirken erdiger und dunkler.",
          "Für jedes Kind einen Becher, einen Löffel und eine feste Schürze oder ein altes Hemd bereitlegen.",
          "Farben nur nach Packungsanleitung anrühren. Behälter nicht in Reichweite von Kleinkindern stehen lassen.",
        ],
      },
      {
        type: "p",
        text: "Gerissene Eier gehören nicht in die Farbe, wenn sie später gegessen werden. Für reine Deko-Eier, die nicht verzehrt werden, kann man auch ausgeblasene Schalen nehmen. Das sollte vorher feststehen, damit niemand ein Deko-Ei in die Brotdose legt.",
      },
      { type: "h2", text: "Was welches Alter selbst machen kann" },
      {
        type: "p",
        text: "Kinder unter drei Jahren schauen zu, reichen ein kaltes Ei an oder drücken einen Aufkleber fest. Die Farblösung bleibt bei der erwachsenen Person. Ab etwa vier Jahren klappt das Eintauchen mit einem Löffel, wenn der Becher schwer und nicht zu voll ist. Schulkinder können die Zeit mitzählen, ein zweites Bad für eine kräftigere Farbe machen und danach mit Markern Linien setzen.",
      },
      {
        type: "p",
        text: "Eine klare Regel hilft mehr als ständige Ermahnung: Farbe bleibt im Becher, Hände werden danach gewaschen, Eier trocknen auf dem Gitter und werden nicht sofort angefasst. Wer diese drei Sätze am Anfang sagt, korrigiert währenddessen weniger.",
      },
      { type: "h2", text: "Ablauf in vier kurzen Schritten" },
      {
        type: "ul",
        items: [
          "Farbe nach Anleitung lösen. Kaltwasserfarben sparen den extra Topf und sind am Kindertisch ruhiger.",
          "Ein Ei auf den Löffel, langsam hinein, kurz liegen lassen, herausheben. Nicht rühren, sonst stößt die Schale an den Rand.",
          "Auf ein Gitter oder einen Eierkarton legen. Erst anfassen, wenn die Oberfläche nicht mehr glänzt.",
          "Wenn die Grundfarbe trocken ist, Punkte, Namen oder einfache Gesichter mit Dekorationsmarkern ergänzen.",
        ],
      },
      {
        type: "p",
        text: "Zwei Farben reichen für eine Gruppe. Mehr Becher bedeuten mehr Verwechslung und mehr Flecken. Wer Variation will, färbt die zweite Hälfte der Eier etwas länger oder setzt danach Aufkleber. Das wirkt vielfältig, ohne sechs Schalen gleichzeitig zu betreuen.",
      },
      { type: "h2", text: "Ideen, die Kindern bleiben" },
      {
        type: "p",
        text: "Jeder sucht sich vor dem Färben ein Motiv aus der Packung aus und erzählt danach, welches Ei seins ist. Namen auf einem kleinen Etikett verhindern Streit. Ein gemeinsames Nest aus Zweigen oder einer Schale am Ende des Tisches macht aus einzelnen Eiern ein Ergebnis, das alle sehen. Im Kindergarten funktioniert dieselbe Reihe, wenn jede Gruppe nur eine Farbe betreut und die Eier danach in der Mitte zusammenkommen.",
      },
      {
        type: "p",
        text: "Marmor und Glitter sind effektvoll, aber unruhiger als eine klare Grundfarbe. Für die erste Aktion mit kleinen Kindern ist eine gleichmäßige Farbe plus Aufkleber die bessere Reihenfolge. Effektfarben lohnen sich, wenn die Gruppe schon einmal gefärbt hat und die Trockenzeit einhält.",
      },
      { type: "h2", text: "Danach: essen, aufheben, verschenken" },
      {
        type: "p",
        text: "Gekochte, mit lebensmittelechten Farben gefärbte Eier werden gekühlt und innerhalb weniger Tage gegessen. Dekorierte Eier, die lange im warmen Zimmer liegen, behandelt man als Schmuck und nicht als Snack. Hände, Löffel und Tisch werden direkt danach gereinigt, solange die Farbe noch nicht angetrocknet ist.",
      },
      {
        type: "p",
        text: `Sets mit Etiketten und Aufklebern fassen genau diesen Ablauf zusammen. Sie stehen bei den ${link.sets}. Marker und Motive liegen bei den ${link.dekorationen}, die Grundfarben bei den ${link.farbstoffe}. Für eine größere Gruppe oder den Handel lohnt eine kurze Anfrage über den ${link.kontakt}.`,
      },
    ],
  },
  {
    slug: "ostereier-kraeftig-faerben",
    title: "Ostereier kräftig färben: Tipps für leuchtende Farben",
    excerpt:
      "Blasse Eier vermeiden: Untergrund, Zeit, Temperatur und Trocknung — so werden Ostereier satt und gleichmäßig statt fleckig.",
    date: "2026-03-11",
    category: "Tipps",
    image: "/images/hero-1.jpg",
    content: [
      {
        type: "p",
        text: "Kräftige Ostereier entstehen nicht durch mehr Packungen, sondern durch einen sauberen Untergrund, die richtige Liegezeit und Geduld beim Trocknen. Blasse Stellen kommen fast immer von Fett, zu kurzem Bad oder davon, dass das Ei noch warm war. Die folgenden Punkte gelten für Tabletten und Flüssigfarben. Die genaue Menge und Zeit stehen auf der jeweiligen Packung und gehen vor.",
      },
      { type: "h2", text: "Der Untergrund entscheidet die Leuchtkraft" },
      {
        type: "p",
        text: "Weiße Schalen zeigen Gelb, Rosa und Hellblau so, wie sie auf der Packung aussehen. Braune Eier verschieben jede Farbe ins Dunkle und Erdige. Das ist kein Fehler, nur ein anderer Look. Wer leuchten will, kauft weiße Eier und prüft die Schale auf Stempel, Kalkflecken und Fettglanz.",
      },
      {
        type: "ul",
        items: [
          "Eier mit warmem Wasser und einem Tropfen Spülmittel abreiben, dann klar nachspülen und trocknen.",
          "Keine Creme oder Öl an die Schale bringen. Fett weist Farbe ab und hinterlässt helle Inseln.",
          "Eier vollständig auskühlen lassen. Wärme treibt Feuchtigkeit aus und macht die Farbe wolkig.",
          "Beschädigte Schalen aussortieren, wenn die Eier gegessen werden sollen.",
        ],
      },
      { type: "h2", text: "Zeit und Bewegung" },
      {
        type: "p",
        text: "Ein kurzes Eintauchen färbt nur die Oberfläche an. Für satte Töne bleibt das Ei so lange im Bad, wie die Anleitung für ein kräftiges Ergebnis angibt, und bei Bedarf etwas länger. Es muss ganz bedeckt sein. Wer es ständig dreht, verteilt die Farbe, kann aber auch Streifen erzeugen, wenn das Ei den Becherrand streift. Besser: einmal ablegen, Zeit nehmen, in einem Zug herausheben.",
      },
      {
        type: "p",
        text: "Eine zweite Runde nach dem Antrocknen vertieft die Farbe stärker als ein endloses erstes Bad. Dazwischen das Ei nicht mit den Fingern rubbeln. Jede Berührung auf nasser Farbe wird später ein matter Fleck.",
      },
      { type: "h2", text: "Heiß, warm oder kalt" },
      {
        type: "p",
        text: "Klassische Farblösungen werden oft heiß angesetzt und dann mit dem Ei zusammengebracht. Kaltwasserfarben sind für den Tisch und für Gruppen praktischer, weil kein kochendes Wasser neben Kindern steht. Beide Wege können leuchten. Entscheidend ist, dass Konzentration und Zeit zur gewählten Produktart passen und nicht von einer anderen Packung übernommen werden.",
      },
      {
        type: "p",
        text: "Essig wird nur verwendet, wenn die Anleitung ihn vorsieht. Er hilft manchen Farben, auf der kalkhaltigen Schale zu haften. Zu viel Essig oder Essig bei einem Produkt, das ihn nicht braucht, verbessert das Ergebnis nicht und kann die Schale stumpf machen.",
      },
      { type: "h2", text: "Trocknen ohne Flecken" },
      {
        type: "p",
        text: "Nasse Eier auf ein Gitter oder einen umgedrehten Eierkarton legen, nicht auf Küchenpapier drücken. Papier saugt Farbe ab und hinterlässt ein Muster, das niemand geplant hat. Die erste Viertelstunde nicht anfassen. Glanz oder Glitter kommt erst auf die trockene Farbe, sonst perlt er ab oder klebt in Tropfen.",
      },
      {
        type: "p",
        text: "Marmor lebt von unruhigen Übergängen. Wer dagegen eine Fläche wie aus einem Guss will, hält die Farblösung ruhig, nutzt eine Farbe pro Becher und mischt die Bäder nicht. Ein Tropfen einer zweiten Farbe im selben Becher reicht, um ein Ei fleckig statt kräftig zu machen.",
      },
      { type: "h2", text: "Wenn die Farbe trotzdem blass bleibt" },
      {
        type: "ul",
        items: [
          "Schale noch einmal entfetten und den Versuch mit einem neuen Ei starten.",
          "Liegezeit verlängern, statt Pulver oder Tabletten über die Anleitung hinaus zu häufen.",
          "Weiße statt braune Eier für den Vergleich nutzen.",
          "Alte, feucht gewordene Packungen ersetzen. Farbe verliert mit der Zeit an Kraft.",
          "Für den Handel ein Referenz-Ei neben die Packung legen, damit die Erwartung zur Serie passt.",
        ],
      },
      {
        type: "p",
        text: `Kräftige Grundtöne kommen aus den ${link.farbstoffe}. Wer danach noch Glanz, Muster oder ein fertiges Familienpaket will, findet das bei ${link.dekorationen} und ${link.sets}. Die ganze Reihe steht im ${link.produkte}.`,
      },
    ],
  },
  {
    slug: "ostereierfarbe-richtig-waehlen",
    title: "Ostereierfarbe: So wählst du die richtige Eierfarbe",
    excerpt:
      "Tabletten, Flüssigfarbe, Pastell, Brillant oder Set: welche Eierfarbe zu Familie, Effekt und Handel passt — und wann ein Set sinnvoller ist.",
    date: "2026-03-15",
    category: "Sortiment",
    image: "/images/hero-color-burst.jpg",
    content: [
      {
        type: "p",
        text: "Die richtige Ostereierfarbe ist die, deren Anwendung zum Anlass passt. Eine einzelne Tablettenschachtel reicht für den klassischen Familientisch. Ein Set ist sinnvoll, wenn Schalen, Etiketten oder Aufkleber dazugehören sollen. Effektfarben lohnen sich, wenn das Ei ein Muster tragen soll und nicht eine ruhige Fläche. Wer das vorher trennt, kauft nicht dreimal dasselbe in anderer Verpackung.",
      },
      { type: "h2", text: "Tabletten oder Flüssigfarbe" },
      {
        type: "p",
        text: "Tabletten sind portionierbar, lagerstabil und im Handel leicht zu erklären: eine Tablette, eine Farbe, ein Becher. Sie eignen sich für Haushalte, die einmal im Jahr färben und klare Grundtöne wollen. Flüssigfarbe lässt sich oft schneller anrühren und gleichmäßig verteilen. Sie ist praktisch, wenn mehrere Eier in kurzer Zeit dieselbe Farbe bekommen sollen.",
      },
      {
        type: "p",
        text: "Kaltwasser-Varianten nehmen den Topf aus dem Ablauf. Das ist der ruhigere Weg mit Kindern und auf Verkaufsflächen, wo niemand eine Herdplatte demonstrieren kann. Heiß angesetzte Farben bleiben die klassische Methode, wenn die Packung das so beschreibt. Die Produktfamilie nicht mischen: Zeit und Wassermenge immer von der Packung ablesen, die gerade offen ist.",
      },
      { type: "h2", text: "Welche Anmutung wohin gehört" },
      {
        type: "ul",
        items: [
          "Pastell: weiche Töne für einen ruhigen Tisch, helle Wohnungen und Geschenkschalen.",
          "Brillant: satte, klare Farben, wenn das Ei aus der Entfernung leuchten soll, auch auf einem Display.",
          "Marmor: jedes Ei wird anders. Gut für Körbe, weniger gut, wenn alle Eier gleich aussehen sollen.",
          "Kristall, Glanz und Glitter: kommen auf die trockene Grundfarbe und machen das Ei zum Schmuckstück.",
          "Marker und Aufkleber: für Namen, Punkte und Motive, nachdem die Farbe hält.",
        ],
      },
      {
        type: "p",
        text: "Eine gute kleine Auswahl für zu Hause sind zwei Grundfarben plus ein Verziermittel. Eine gute Reihe für den Handel zeigt dieselben drei Entscheidungen nebeneinander: Farbe, Effekt, fertiges Set. Kundinnen und Kunden müssen nicht das ganze Lager verstehen, nur diese Unterschiede.",
      },
      { type: "h2", text: "Wann ein Set die bessere Packung ist" },
      {
        type: "p",
        text: "Ein Set lohnt sich, wenn jemand zum ersten Mal färbt oder etwas verschenkt. Farbtabletten, Schalen, Etiketten oder Aufkleber liegen dann in einer Packung, und es fehlt kein Becher und kein Motiv. Für erfahrene Haushalte, die schon Schalen haben und nur Farbe nachkaufen, ist die Einzelfarbe sinnvoller und günstiger im Regal zu stapeln.",
      },
      {
        type: "p",
        text: "Häschen- und Familienmotive verkaufen sich über das Bild auf der Schachtel, nicht über die chemische Beschreibung. Die Abbildung sollte dem Ei nahekommen, das bei normaler Anwendung entsteht. Deshalb gehören Referenz und Packung zusammen, besonders bei Effektfarben, deren Ergebnis von der Bewegung im Bad abhängt.",
      },
      { type: "h2", text: "Essen, Deko und Lagerung" },
      {
        type: "p",
        text: "Zum Verzehr vorgesehene Eier nur mit Farben färben, die dafür gedacht sind, und die Packung dazu aufheben, bis die Eier aufgegessen sind. Deko-Eier, die wochenlang in der Wärme liegen, nicht mehr essen. Angebrochene Packungen trocken und geschlossen lagern. Feuchtigkeit nimmt Tabletten die Kraft, noch bevor Ostern kommt.",
      },
      {
        type: "p",
        text: "Für den Wiederverkauf zählt außerdem die Saisonbreite: Grundfarben laufen die ganze Vorsaison, Effekt und Glitter eher dicht am Fest, Sets als Geschenk in der letzten Woche. Wer nur eine Welle bestellt, sollte die drei Gruppen trotzdem im gleichen Display zeigen, sonst wirkt das Regal wie eine einzelne Farbe in vielen Schachteln.",
      },
      { type: "h2", text: "Eine einfache Entscheidung" },
      {
        type: "ul",
        items: [
          "Klassisch und klar: Tabletten in wenigen Grundfarben.",
          "Schnell und gleichmäßig für mehrere Eier: Flüssigfarbe nach Anleitung.",
          "Mit Kindern und ohne Herd: Kaltwasser, kurze Schritte, danach Aufkleber.",
          "Jedes Ei ein Unikat: Marmor oder eine Effektlinie, mit längerer Trockenzeit einplanen.",
          "Alles in einer Schachtel: Set mit Farbe und Zubehör.",
        ],
      },
      {
        type: "p",
        text: `Die Linien liegen im ${link.produkte} getrennt nach ${link.farbstoffe}, ${link.sets} und ${link.dekorationen}. Wer für eine Filiale oder eine Aktion plant, erreicht uns über den ${link.kontakt}.`,
      },
    ],
  },
  {
    slug: "ostereier-faerben-anleitung",
    title: "Ostereier färben: Die komplette Anleitung",
    excerpt:
      "Schritt für Schritt Ostereier färben: Eier vorbereiten, Farbe ansetzen, trocknen und verzieren — für zu Hause und für eine kleine Aktion.",
    date: "2026-03-18",
    category: "Anleitung",
    image: "/images/hero-slide-2.jpg",
    content: [
      {
        type: "p",
        text: "Ostereier färben ist eine kurze Handarbeit, wenn die Reihenfolge stimmt. Die meisten Flecken und blassen Stellen entstehen vor dem ersten Eintauchen: fettige Schale, zu heißes Ei, zu wenig Zeit, zu frühes Anfassen. Diese Anleitung führt von der Vorbereitung bis zum Ostertisch. Wassermenge, Tablettenzahl und Minuten immer von der offenen Packung nehmen. Sie unterscheiden sich zwischen Tabletten, Flüssigfarbe und Kaltwasser.",
      },
      { type: "h2", text: "1. Eier auswählen und kochen" },
      {
        type: "p",
        text: "Weiße Eier für leuchtende Farben, braune für einen gedeckteren Ton. Eier ohne Risse verwenden, wenn sie gegessen werden. Vor dem Kochen kurz waschen. Damit sie nicht platzen, können sie Zimmertemperatur haben und mit einer Nadel ein winziges Loch bekommen, das ist aber nicht zwingend. Kochzeit so wählen, dass das Ei fest wird. Danach abschrecken und vollständig auskühlen lassen, am besten bis zum nächsten Schritt eine Stunde oder über Nacht.",
      },
      { type: "h2", text: "2. Schale für die Farbe vorbereiten" },
      {
        type: "ul",
        items: [
          "Mit warmem Wasser und wenig Spülmittel entfetten.",
          "Klar abspülen und trocken tupfen.",
          "Stempel und Kalkreste prüfen. Grobe Stellen nehmen Farbe schlechter an.",
          "So viele Becher vorbereiten wie Farben geplant sind. Eine Farbe pro Becher.",
        ],
      },
      { type: "h2", text: "3. Farbe nach Packung ansetzen" },
      {
        type: "p",
        text: "Packung lesen, bevor Wasser in den Becher kommt. Manche Tabletten lösen sich in heißem Wasser, andere sind für kaltes Wasser gedacht. Essig nur zugeben, wenn er auf der Packung steht. Den Becher so hoch füllen, dass das Ei untergeht, ohne dass die Lösung überläuft, sobald das Ei darin liegt. Die Farbe kurz ruhen lassen, bis sich keine Wolke mehr vom Boden löst.",
      },
      {
        type: "p",
        text: "Für eine Familie reichen oft zwei bis vier Farben. Jede weitere Farbe braucht einen eigenen Behälter, einen Löffel und Platz zum Trocknen. Lieber weniger Farben und ein sauberes Ergebnis als ein voller Tisch mit vermischten Bädern.",
      },
      { type: "h2", text: "4. Eintauchen und herausheben" },
      {
        type: "ul",
        items: [
          "Ei auf einen Löffel legen und langsam versenken.",
          "Ganz bedeckt liegen lassen, so lange die Anleitung für den gewünschten Ton angibt.",
          "In einer Bewegung herausheben, nicht am Becherrand abstreifen.",
          "Für einen satteren Ton nach dem Antrocknen ein zweites Mal tauchen.",
          "Marmor und andere Effekte nur so bewegen, wie es die Packung beschreibt. Mehr Rühren macht nicht automatisch ein besseres Muster.",
        ],
      },
      { type: "h2", text: "5. Trocknen, dann verzieren" },
      {
        type: "p",
        text: "Eier auf ein Gitter oder in einen Eierkarton stellen. Die ersten Minuten nicht drehen und nicht mit Küchenpapier andrücken. Wenn die Oberfläche matt und trocken ist, kommen Glanz, Glitter, Marker oder Aufkleber dran. Namen und kleine Motive setzt man besser jetzt als in die nasse Farbe. Nasse Markerlinien verlaufen und färben die Finger.",
      },
      { type: "h2", text: "6. Aufbewahren und auf den Tisch bringen" },
      {
        type: "p",
        text: "Gefärbte gekochte Eier, die gegessen werden, gehören in den Kühlschrank und sollten innerhalb weniger Tage verbraucht werden. Eier, die als Dekoration in der warmen Stube liegen, nicht mehr essen. Eine Schale, ein Nest oder ein Kranz bündelt verschiedene Farben zu einem Bild. Einzelne Eier wirken schnell verloren, fünf in einer Schale wirken wie ein fertiger Tisch.",
      },
      { type: "h2", text: "Kleine Fehler und was dann hilft" },
      {
        type: "ul",
        items: [
          "Helle Flecken: meist Fett. Ei verwerfen oder nur noch als Deko nutzen und das nächste Ei gründlicher waschen.",
          "Blasser Ton: Liegezeit verlängern oder ein zweites Bad, nicht die doppelte Menge Farbe gegen die Anleitung.",
          "Streifen: Ei hat den Rand berührt oder wurde zu oft gedreht. Nächstes Ei ruhiger legen.",
          "Farbe an den Händen: sofort waschen. Angetrocknete Farbe braucht mehr Aufwand und färbt Handtücher.",
          "Kinder dabei: nur kalte oder handwarme Bäder, ein Becher pro Kind, Erwachsene setzen die Farbe an.",
        ],
      },
      {
        type: "p",
        text: "Dieselbe Reihenfolge trägt auch eine kleine Verkaufsaktion oder einen Workshop: Station zum Waschen, Station zum Färben, Station zum Trocknen, Station zum Verzieren. Niemand trägt ein nasses Ei über den Raum.",
      },
      {
        type: "p",
        text: `Die passenden Packungen stehen im ${link.produkte}: ${link.farbstoffe} für den Grundton, ${link.sets} wenn Zubehör dabei sein soll, ${link.dekorationen} für alles nach dem Trocknen. Für Mengen und Displays ist der ${link.kontakt} der direkte Weg.`,
      },
    ],
  },
];

export const blogStoryBySlug = Object.fromEntries(
  blogStories.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;

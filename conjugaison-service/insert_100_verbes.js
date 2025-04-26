// Script d’insertion de 100 verbes de base pour Lingobango
// Pour MongoDB, à exécuter avec mongosh

const pronoms = ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"];

const modeles = {
  "er": {
    present: ["e", "es", "e", "ons", "ez", "ent"],
    passe: ["ai é", "as é", "a é", "avons é", "avez é", "ont é"],
    futur: ["erai", "eras", "era", "erons", "erez", "eront"]
  },
  "ir": {
    present: ["is", "is", "it", "issons", "issez", "issent"],
    passe: ["ai i", "as i", "a i", "avons i", "avez i", "ont i"],
    futur: ["irai", "iras", "ira", "irons", "irez", "iront"]
  },
  "re": {
    present: ["s", "s", "", "ons", "ez", "ent"],
    passe: ["ai u", "as u", "a u", "avons u", "avez u", "ont u"],
    futur: ["rai", "ras", "ra", "rons", "rez", "ront"]
  }
};

const verbes = [
  "aimer", "parler", "donner", "jouer", "manger", "travailler", "regarder", "trouver", "penser", "aider",
  "choisir", "finir", "réussir", "grandir", "grossir", "obéir", "remplir", "agir", "bâtir", "punir",
  "vendre", "attendre", "descendre", "entendre", "perdre", "répondre", "fondre", "défendre", "tendre", "rendre",
  "être", "avoir", "aller", "faire", "dire", "pouvoir", "vouloir", "voir", "savoir", "venir",
  "devoir", "prendre", "trouver", "donner", "parler", "mettre", "tenir", "suivre", "croire", "aimer",
  "passer", "penser", "laisser", "arriver", "porter", "appeler", "partir", "jeter", "recevoir", "vivre",
  "écrire", "sortir", "lire", "ouvrir", "mourir", "servir", "courir", "valoir", "plaire", "falloir",
  "naître", "atteindre", "sentir", "produire", "obtenir", "comprendre", "apprendre", "connaître", "apparaître", "reconnaître",
  "paraître", "disparaître", "permettre", "promettre", "soumettre", "transmettre", "admettre", "souffrir", "offrir", "découvrir",
  "couvrir", "cueillir", "accueillir", "peindre", "craindre", "joindre", "éteindre", "atteindre", "conduire", "traduire"
];

const docs = verbes.map(verbe => {
  let racine = verbe;
  let modele = null;
  if (["être", "avoir", "aller", "faire", "dire", "pouvoir", "vouloir", "voir", "savoir", "venir", "devoir", "prendre", "mettre", "tenir", "suivre", "croire", "partir", "jeter", "recevoir", "vivre", "écrire", "sortir", "lire", "ouvrir", "mourir", "servir", "courir", "valoir", "plaire", "falloir", "naître", "atteindre", "sentir", "produire", "obtenir", "comprendre", "apprendre", "connaître", "apparaître", "reconnaître", "paraître", "disparaître", "permettre", "promettre", "soumettre", "transmettre", "admettre", "souffrir", "offrir", "découvrir", "couvrir", "cueillir", "accueillir", "peindre", "craindre", "joindre", "éteindre", "conduire", "traduire"].includes(verbe)) {
    // Pour les irréguliers, on mettra "TODO" ou on pourrait ajouter un vrai modèle plus tard
    return {
      verbe,
      langue: "fr",
      pronoms,
      conjugaisons: {
        present: ["TODO", "TODO", "TODO", "TODO", "TODO", "TODO"],
        passe: ["TODO", "TODO", "TODO", "TODO", "TODO", "TODO"],
        futur: ["TODO", "TODO", "TODO", "TODO", "TODO", "TODO"]
      }
    };
  }
  if (verbe.endsWith("er")) {
    racine = verbe.slice(0, -2);
    modele = modeles["er"];
  } else if (verbe.endsWith("ir")) {
    racine = verbe.slice(0, -2);
    modele = modeles["ir"];
  } else if (verbe.endsWith("re")) {
    racine = verbe.slice(0, -2);
    modele = modeles["re"];
  }
  return {
    verbe,
    langue: "fr",
    pronoms,
    conjugaisons: {
      present: modele ? modele.present.map((fin, i) => racine + fin) : ["TODO", "TODO", "TODO", "TODO", "TODO", "TODO"],
      passe: modele ? modele.passe.map((fin, i) => (i < 3 ? "ai " : "avons ") + racine + fin) : ["TODO", "TODO", "TODO", "TODO", "TODO", "TODO"],
      futur: modele ? modele.futur.map((fin, i) => racine + fin) : ["TODO", "TODO", "TODO", "TODO", "TODO", "TODO"]
    }
  };
});

db.conjugaisons.insertMany(docs);

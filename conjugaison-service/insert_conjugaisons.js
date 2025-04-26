// Ce script insère quelques conjugaisons de base pour tester l'API Lingobango
// À exécuter avec MongoDB Compass ou mongo shell sur la base 'lingobango'

db.conjugaisons.insertMany([
  {
    "verbe": "etre",
    "langue": "fr",
    "pronoms": ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"],
    "conjugaisons": {
      "present": ["suis", "es", "est", "sommes", "êtes", "sont"],
      "passe": ["ai été", "as été", "a été", "avons été", "avez été", "ont été"],
      "futur": ["serai", "seras", "sera", "serons", "serez", "seront"]
    }
  },
  {
    "verbe": "avoir",
    "langue": "fr",
    "pronoms": ["j'", "tu", "il/elle/on", "nous", "vous", "ils/elles"],
    "conjugaisons": {
      "present": ["ai", "as", "a", "avons", "avez", "ont"],
      "passe": ["ai eu", "as eu", "a eu", "avons eu", "avez eu", "ont eu"],
      "futur": ["aurai", "auras", "aura", "aurons", "aurez", "auront"]
    }
  },
  {
    "verbe": "aller",
    "langue": "fr",
    "pronoms": ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"],
    "conjugaisons": {
      "present": ["vais", "vas", "va", "allons", "allez", "vont"],
      "passe": ["suis allé", "es allé", "est allé", "sommes allés", "êtes allés", "sont allés"],
      "futur": ["irai", "iras", "ira", "irons", "irez", "iront"]
    }
  }
]);

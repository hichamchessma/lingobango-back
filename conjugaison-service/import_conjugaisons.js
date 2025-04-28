// Script d'import des conjugaisons depuis un fichier JSON dans MongoDB
// Usage: node import_conjugaisons.js

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGO_URL = 'mongodb://localhost:27017'; // adapte si besoin
const DB_NAME = 'lingobango'; // adapte si besoin
const COLLECTION = 'conjugaisons';
// Permet de passer le fichier à importer en argument (ex: node import_conjugaisons.js data/conjugaisons_en.json)
const DATA_FILE = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(__dirname, 'data', 'conjugaisons_fr.json');

async function main() {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);
    const json = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const langue = json.meta.langue;
    // Suppression uniquement des verbes de la langue à importer
    const deleteResult = await collection.deleteMany({ langue });
    console.log(`Documents supprimés pour la langue ${langue}: ${deleteResult.deletedCount}`);
    const pronomsDefaut = json.meta.pronoms;
    for (const v of json.verbes) {
      const doc = {
        verbe: v.verbe,
        langue,
        pronoms: v.pronoms || pronomsDefaut,
        conjugaisons: v.conjugaisons
      };
      await collection.updateOne(
        { verbe: doc.verbe, langue: doc.langue },
        { $set: doc },
        { upsert: true }
      );
      console.log(`Importé: ${doc.verbe}`);
    }
    console.log('Import terminé.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();

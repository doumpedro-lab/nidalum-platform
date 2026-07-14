const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config({ path: '../../apps/web/.env.local' });

// Ensure we have credentials
if (!process.env.FIREBASE_PROJECT_ID) {
  console.error("Missing FIREBASE_PROJECT_ID in env.");
  process.exit(1);
}

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seed() {
  console.log("Seeding V1 Enterprise Architecture Data...");

  // 1. system/config
  await db.collection('system').doc('config').set({
    currentLibraryVersion: "1.0",
    maintenance: false,
    announcement: "",
    minimumAppVersion: "1.0"
  });
  console.log("system/config seeded.");

  // 2. products
  await db.collection('products').doc('PRD_001').set({
    productId: 'PRD_001',
    name: 'Founder Library',
    price: 99.00,
    currency: 'EUR',
    books: ['BOOK_001', 'BOOK_002', 'BOOK_003', 'BOOK_004', 'BOOK_005'],
    music: [],
    downloads: true,
    updates: true,
    active: true
  });
  console.log("products seeded.");

  // 3. library (books)
  const books = [
    { id: 'BOOK_001', title: "I. Le Livre d'Apprentissage", cover: 'grimoire_front.png', version: '1.0', tags: ['apprentissage'], category: 'founder' },
    { id: 'BOOK_002', title: "II. Le Grand Codex", cover: 'grimoire_front.png', version: '1.0', tags: ['codex'], category: 'founder' },
    { id: 'BOOK_003', title: "III. L'Éveil du Prédateur Pacifique", cover: 'grimoire_front.png', version: '1.0', tags: ['mindset'], category: 'founder' },
    { id: 'BOOK_004', title: "IV. L'Art de l'Interrupteur Mental", cover: 'grimoire_front.png', version: '1.0', tags: ['focus'], category: 'founder' },
    { id: 'BOOK_005', title: "V. La Stratégie du Silence", cover: 'grimoire_front.png', version: '1.0', tags: ['silence'], category: 'founder' }
  ];

  for (const book of books) {
    await db.collection('library').doc(book.id).set(book);
  }
  console.log("library seeded.");

  // 4. assets
  for (const book of books) {
    // PDF Asset
    await db.collection('assets').doc(`${book.id}_PDF`).set({
      assetId: `${book.id}_PDF`,
      type: 'pdf',
      storagePath: `ebooks/pdf/${book.id}.pdf`,
      version: book.version,
      premium: true
    });
    
    // EPUB Asset
    await db.collection('assets').doc(`${book.id}_EPUB`).set({
      assetId: `${book.id}_EPUB`,
      type: 'epub',
      storagePath: `ebooks/epub/${book.id}.epub`,
      version: book.version,
      premium: true
    });
  }
  console.log("assets seeded.");

  // 5. music
  const musicTracks = [
    {
      id: 'NGOLA',
      title: "N'GOLA",
      artist: 'VAMIRØ',
      duration: 212,
      cover: 'ngola_cover.png',
      storagePath: 'music/albums/ngola.mp3',
      type: 'album',
      premium: true
    },
    {
      id: 'SOUNDSCAPE_01',
      title: "Focus Frequencies I",
      artist: 'NIDALUM Audio',
      duration: 3600,
      cover: 'frequencies_cover.png',
      storagePath: 'audio/frequencies/focus_01.mp3',
      type: 'soundscape',
      premium: true
    }
  ];

  for (const track of musicTracks) {
    await db.collection('music').doc(track.id).set(track);
  }
  console.log("music seeded.");

  console.log("Seeding complete!");
}

seed().catch(console.error);

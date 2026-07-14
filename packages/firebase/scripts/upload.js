const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const fs = require('fs');
const path = require('path');

// Ensure we have credentials
if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  console.error("Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID in env.");
  process.exit(1);
}

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

// Replace this with your actual bucket name, e.g., 'nidalum-dev.appspot.com'
const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

if (!bucketName) {
  console.error("Missing NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET in env.");
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: bucketName
});

const bucket = getStorage().bucket();

async function uploadFile(localPath, destinationPath) {
  try {
    if (!fs.existsSync(localPath)) {
      console.log(`Le fichier ${localPath} n'existe pas. Vous pouvez le placer dans ce dossier plus tard.`);
      return;
    }
    
    console.log(`Uploading ${localPath} to ${destinationPath}...`);
    await bucket.upload(localPath, {
      destination: destinationPath,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      }
    });
    console.log(`✅ File uploaded successfully: ${destinationPath}`);
  } catch (error) {
    console.error(`Erreur lors de l'upload de ${localPath}:`, error);
  }
}

async function uploadAssets() {
  console.log("Démarrage du processus d'upload vers Firebase Storage...");
  console.log(`Bucket de destination: ${bucketName}`);

  // Liste des fichiers à uploader avec leur destination dans Firebase Storage
  // Format: { local: 'assets/chemin/local.ext', remote: 'chemin/firebase.ext' }
  const filesToUpload = [
    // LIVRES PDF
    { local: '../assets/books/pdf/book_1.pdf', remote: 'books/pdf/book_1.pdf' },
    { local: '../assets/books/pdf/book_2.pdf', remote: 'books/pdf/book_2.pdf' },
    { local: '../assets/books/pdf/book_3.pdf', remote: 'books/pdf/book_3.pdf' },
    { local: '../assets/books/pdf/book_4.pdf', remote: 'books/pdf/book_4.pdf' },
    { local: '../assets/books/pdf/book_5.pdf', remote: 'books/pdf/book_5.pdf' },
    { local: '../assets/books/pdf/nidalum--52-histoires-qui-reveillent-le-createur-interieur-zsyoel.pdf', remote: 'books/pdf/nidalum--52-histoires-qui-reveillent-le-createur-interieur-zsyoel.pdf' },
    
    // MUSIQUES
    { local: '../assets/music/albums/ngola.mp3', remote: 'music/albums/ngola.mp3' },
    { local: '../assets/audio/frequencies/focus_01.mp3', remote: 'audio/frequencies/focus_01.mp3' },
  ];

  for (const file of filesToUpload) {
    const localFullPath = path.join(__dirname, file.local);
    // S'assurer que le dossier parent existe (pour éviter des erreurs si l'utilisateur veut ajouter des fichiers plus tard)
    const dir = path.dirname(localFullPath);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    await uploadFile(localFullPath, file.remote);
  }

  console.log("-----------------------------------------");
  console.log("🎉 Terminé ! Les fichiers trouvés ont été envoyés.");
  console.log("Placez simplement vos PDF et MP3 dans packages/firebase/assets/... avec le bon nom, et relancez ce script !");
}

uploadAssets().catch(console.error);

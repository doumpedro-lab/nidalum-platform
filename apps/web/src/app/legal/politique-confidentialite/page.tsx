export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-playfair text-gold mb-12">POLITIQUE DE CONFIDENTIALITÉ</h1>
        <div className="font-mono text-sm text-white/80 space-y-6 leading-relaxed">
          <p>La protection de vos données personnelles est essentielle à la mission de NIDALUM.</p>
          <h2 className="text-xl text-gold mt-8 mb-4">Données Collectées</h2>
          <p>Lors de votre inscription au Founder Access, nous collectons uniquement votre adresse email et un identifiant généré anonymement (Guardian ID). Ces données sont utilisées exclusivement pour vous envoyer les Transmissions du Codex.</p>
          
          <h2 className="text-xl text-gold mt-8 mb-4">Analytics</h2>
          <p>Nous utilisons des outils d'analyse (Microsoft Clarity, GA4) de manière anonymisée pour comprendre l'utilisation du système NIDALUM et améliorer l'expérience. Vous pouvez vous y opposer via les paramètres de votre navigateur.</p>
          
          <h2 className="text-xl text-gold mt-8 mb-4">Vos Droits</h2>
          <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant transmission@nidalumuniverse.com.</p>
        </div>
      </div>
    </main>
  );
}

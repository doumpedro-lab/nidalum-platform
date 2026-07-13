export default function CGVPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-playfair text-gold mb-12">CONDITIONS GÉNÉRALES DE VENTE</h1>
        <div className="font-mono text-sm text-white/80 space-y-6 leading-relaxed">
          <h2 className="text-xl text-gold mt-8 mb-4">Article 1 - Objet</h2>
          <p>Les présentes CGV régissent l'acquisition du produit numérique "Le Codex Édition Fondatrice" sur le site nidalumuniverse.com.</p>
          
          <h2 className="text-xl text-gold mt-8 mb-4">Article 2 - Prix et Paiement</h2>
          <p>Le prix du Codex est de 99,00 € TTC, payable en une seule fois par carte bancaire via le système sécurisé Stripe.</p>
          
          <h2 className="text-xl text-gold mt-8 mb-4">Article 3 - Rétractation</h2>
          <p>Le Codex étant un contenu numérique immatériel fourni instantanément après achat, vous renoncez expressément à votre droit de rétractation dès validation du paiement conformément aux directives européennes applicables.</p>
          
          <h2 className="text-xl text-gold mt-8 mb-4">Article 4 - Propriété Intellectuelle</h2>
          <p>Le Codex reste la propriété stricte de NIDALUM. Tout partage, copie ou revente de l'accès est interdit et entraînera l'annulation immédiate du Founder Access.</p>
        </div>
      </div>
    </main>
  );
}

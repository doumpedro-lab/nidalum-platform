export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-playfair text-gold mb-12">CONTACT</h1>
        <div className="font-mono text-white/80 space-y-8 leading-relaxed">
          <p>Pour toute requête technique, accès ou presse :</p>
          <div className="border border-white/20 p-8">
            <p className="text-gold">transmission@nidalumuniverse.com</p>
          </div>
          <p className="text-sm text-white/50">
            Nous répondons exclusivement aux membres enregistrés et aux partenaires approuvés.
          </p>
        </div>
      </div>
    </main>
  );
}

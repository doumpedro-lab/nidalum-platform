export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-playfair text-gold mb-12">CONTACT</h1>
        <div className="font-mono text-white/80 space-y-8 leading-relaxed">
          <div className="border border-white/20 p-8 space-y-4">
            <p className="text-gold flex items-center gap-4"><span className="text-white/50 w-24">Entité :</span> NIDALUM</p>
            <p className="text-gold flex items-center gap-4"><span className="text-white/50 w-24">Fondateur :</span> Ramses Nidal</p>
            <p className="text-gold flex items-center gap-4"><span className="text-white/50 w-24">Email :</span> contact@nidalumuniverse.com</p>
            <p className="text-gold flex items-center gap-4"><span className="text-white/50 w-24">Téléphone :</span> +49 15563 655924</p>
            <p className="text-gold flex items-center gap-4"><span className="text-white/50 w-24">Web :</span> https://www.nidalumuniverse.com</p>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-8 pt-4 border-t border-white/10">Designed and operated in Germany.</p>
          </div>
          <p className="text-sm text-white/50">
            Nous répondons exclusivement aux membres enregistrés et aux partenaires approuvés.
          </p>
        </div>
      </div>
    </main>
  );
}

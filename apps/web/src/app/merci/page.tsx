export default function MerciPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-xl text-center space-y-8">
        <h1 className="text-4xl font-playfair text-gold">C'EST ACCOMPLI.</h1>
        <p className="font-mono text-white/70 tracking-widest leading-relaxed">
          Votre transaction a été validée. Votre statut de Fondateur est désormais actif.<br /><br />
          Le Silence est avec vous. Vérifiez vos transmissions (emails) pour accéder au système.
        </p>
        <div className="pt-12">
          <a href="/" className="text-gold font-mono uppercase tracking-widest hover:underline text-sm">
            [ Retourner à l'origine ]
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-playfair text-gold mb-12">IMPRESSUM NIDALUM UNIVERSE</h1>
        <div className="font-mono text-sm text-white/80 space-y-6 leading-relaxed">
          <p><strong>Angaben gem  5 TMG</strong></p>
          <p>
            NIDALUM (Einzelunternehmen)<br />
            Vertreten durch: Ramses Nidal<br />
          </p>
          
          <h2 className="text-xl text-gold mt-8 mb-4">Kontakt</h2>
          <p>
            Telefon: +49 15563 655924<br />
            E-Mail: contact@nidalumuniverse.com<br />
          </p>

          <h2 className="text-xl text-gold mt-8 mb-4">Verantwortlich fr den Inhalt nach  55 Abs. 2 RStV</h2>
          <p>
            Ramses Nidal<br />
          </p>

          <h2 className="text-xl text-gold mt-8 mb-4">EU-Streitschlichtung</h2>
          <p>Die Europische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

          <h2 className="text-xl text-gold mt-8 mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
      </div>
    </main>
  );
}

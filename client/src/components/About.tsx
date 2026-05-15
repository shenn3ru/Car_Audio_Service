const stats = [
  { value: '20+', label: 'Ani experiență' },
  { value: '5000+', label: 'Clienți mulțumiți' },
  { value: '3-12', label: 'Luni garanție' },
  { value: '100%', label: 'Satisfacție garantată' },
]

export default function About() {
  return (
    <div className="about-section">
      <div className="section-header">
        <h2>Despre noi</h2>
        <p>Pasiunea pentru sunet, experiența în auto</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>
            Cu peste <strong>20 de ani de experiență</strong> în domeniul sistemelor
            audio și multimedia auto, suntem liderul pieței din Chișinău.
          </p>
          <p>
            Folosim echipamente moderne și piese de calitate originală, oferind garanție
            între <strong>3 și 12 luni</strong> pentru toate serviciile noastre.
          </p>
          <p>
            Echipa noastră de tehnicieni certificați lucrează cu toate mărcile și modelele
            auto, de la mașini clasice până la cele mai noi modele.
          </p>
          <div className="about-badges">
            <span className="badge">🏆 Certificat oficial</span>
            <span className="badge">⚡ Servicii rapide</span>
            <span className="badge">🛡️ Garanție inclusă</span>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

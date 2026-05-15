import { useState } from 'react'

interface Service {
  id: string
  title: string
  img: string
  description: string
  features: string[]
  price: string
}

const services: Service[] = [
  {
    id: 'multimedia',
    title: 'Multimedia auto',
    img: '/image/multimedia auto.jpg',
    description: 'Sisteme multimedia moderne cu ecrane tactile, compatibile cu toate mărcile auto. Instalare profesională și configurare completă.',
    features: ['Ecrane 7"-10" tactile', 'GPS integrat', 'Bluetooth & WiFi', 'Cameră marsarier'],
    price: 'De la 150 €',
  },
  {
    id: 'audio',
    title: 'Audio auto',
    img: '/image/audio auto.jpg',
    description: 'Sisteme audio de înaltă fidelitate — amplificatoare, subwoofere, difuzoare premium pentru un sunet excepțional în mașina ta.',
    features: ['Difuzoare premium', 'Subwoofere', 'Amplificatoare', 'Procesoare DSP'],
    price: 'De la 80 €',
  },
  {
    id: 'electronic',
    title: 'Electronică',
    img: '/image/electronica auto.jpg',
    description: 'Reparații și instalare electronică auto — senzori de parcare, camere 360°, sisteme de alarmă, pornire de la distanță.',
    features: ['Senzori parcare', 'Camere 360°', 'Alarme', 'Pornire distanță'],
    price: 'De la 50 €',
  },
  {
    id: 'premium',
    title: 'Premium OEM',
    img: '/image/oem.png',
    description: 'Upgrade sisteme OEM originale — activare CarPlay/Android Auto, upgrade ecrane, integrare perfectă cu sistemul original al mașinii.',
    features: ['CarPlay / Android Auto', 'Upgrade ecran OEM', 'Păstrare funcții originale', 'Garanție 12 luni'],
    price: 'De la 200 €',
  },
  {
    id: 'accesorii',
    title: 'Accesorii',
    img: '/image/acc.jpg',
    description: 'Accesorii auto de calitate — cabluri, conectori, suporturi telefon, încărcătoare wireless, produse de îngrijire.',
    features: ['Cabluri calitate', 'Suporturi telefon', 'Încărcare wireless', 'Conectori profesionali'],
    price: 'De la 10 €',
  },
  {
    id: 'tv',
    title: 'TV & Monitoare',
    img: '/image/tv.jpg',
    description: 'Instalare monitoare și sisteme TV pentru pasageri — tetiere cu ecrane, monitoare plafon, sisteme de divertisment pentru copii.',
    features: ['Monitoare tetieră', 'Ecrane plafon', 'Conectivitate HDMI', 'Sunet dedicat'],
    price: 'De la 120 €',
  },
]

const repairServices = ['Difuzoare', 'Ecran', 'Software', 'CarPlay']
const carBrands = ['BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Toyota', 'Ford']

interface ServicesProps {
  onBookClick: () => void
}

export default function Services({ onBookClick }: ServicesProps) {
  const [selected, setSelected] = useState<Service | null>(null)
  const [checkedRepairs, setCheckedRepairs] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const toggleRepair = (name: string) => {
    setCheckedRepairs(prev =>
      prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
    )
  }

  const filtered = activeCategory === 'all'
    ? services
    : services.filter(s => s.id === activeCategory)

  return (
    <div className="services-section">
      <div className="section-header">
        <h2>Serviciile noastre</h2>
        <p>Soluții complete pentru sistemele audio și multimedia ale mașinii tale</p>
      </div>

      <div className="wrapper">
        <aside className="sidebar">
          <div className="box">
            <h3>Servicii de reparație</h3>
            {repairServices.map(name => (
              <label key={name} className="item checkbox-item">
                <input
                  type="checkbox"
                  checked={checkedRepairs.includes(name)}
                  onChange={() => toggleRepair(name)}
                />
                <span>{name}</span>
              </label>
            ))}
          </div>

          <div className="box">
            <h3>Noi reparăm</h3>
            {carBrands.map(brand => (
              <div key={brand} className="item brand-item">
                <span className="check-icon">✔</span> {brand}
              </div>
            ))}
          </div>

          <div className="box">
            <h3>Filtrează</h3>
            <select className="filter-select" onChange={e => setActiveCategory(e.target.value)}>
              <option value="all">Toate categoriile</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>
        </aside>

        <div className="main-content">
          <div className="grid">
            {filtered.map(service => (
              <div
                key={service.id}
                className="card"
                onClick={() => setSelected(service)}
              >
                <div
                  className="card-img"
                  style={{ backgroundImage: `url('${service.img}')` }}
                />
                <div className="card-body">
                  <h3>{service.title}</h3>
                  <p className="card-price">{service.price}</p>
                  <button className="card-btn">Detalii →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="overlay-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelected(null)}>×</button>
            <div className="overlay-grid">
              <div className="overlay-img">
                <img src={selected.img} alt={selected.title} />
              </div>
              <div className="overlay-info">
                <h2>{selected.title}</h2>
                <p>{selected.description}</p>
                <ul>
                  {selected.features.map(f => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <p className="overlay-price">{selected.price}</p>
                <button className="overlay-btn" onClick={() => { setSelected(null); onBookClick() }}>
                  Programează-te acum
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

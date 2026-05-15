import { useState } from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Services from './components/Services'
import About from './components/About'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AppointmentModal from './components/AppointmentModal'

export default function App() {
  const [appointmentOpen, setAppointmentOpen] = useState(false)

  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="acasa">
          <Banner onBookClick={() => setAppointmentOpen(true)} />
        </section>
        <section id="servicii">
          <Services onBookClick={() => setAppointmentOpen(true)} />
        </section>
        <section id="despre">
          <About />
        </section>
        <section id="galerie">
          <Gallery />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      {appointmentOpen && (
        <AppointmentModal onClose={() => setAppointmentOpen(false)} />
      )}
    </div>
  )
}

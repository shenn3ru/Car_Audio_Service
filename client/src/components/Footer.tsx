export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">🔊 Car Audio Service</div>
          <p>Specialiști în sisteme audio și multimedia auto din Chișinău. Experiență, calitate, garanție.</p>
          <div className="socials">
            <a href="#" className="social fb" aria-label="Facebook">
              <i className="bxl bx-facebook-circle" />
            </a>
            <a href="#" className="social ig" aria-label="Instagram">
              <i className="bxl bx-instagram-alt" />
            </a>
            <a href="#" className="social tg" aria-label="Telegram">
              <i className="bxl bx-telegram" />
            </a>
            <a href="https://wa.me/37367571810" className="social wa" aria-label="WhatsApp">
              <i className="bxl bx-whatsapp" />
            </a>
          </div>
        </div>

        <div className="footer-center">
          <h4>Program de lucru</h4>
          <ul>
            <li>Luni – Vineri: <strong>09:00 – 18:00</strong></li>
            <li>Sâmbătă: <strong>09:00 – 15:00</strong></li>
            <li>Duminică: <strong>Închis</strong></li>
          </ul>
        </div>

        <div className="footer-right">
          <h4>Contact rapid</h4>
          <ul>
            <li><a href="tel:+37367571810">+373 67 571 810</a></li>
            <li><a href="tel:+37376051625">+373 76 051 625</a></li>
            <li><a href="mailto:soimu.service@gmail.com">soimu.service@gmail.com</a></li>
            <li>Str. Tudor Vladimirescu 3, Chișinău</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Car Audio Service. Toate drepturile rezervate.</p>
      </div>
    </footer>
  )
}

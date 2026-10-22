import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNewsletterSubmit: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNewsletterSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onNewsletterSubmit(email);
      setEmail('');
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-content">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="logo-icon-box">
                <Building2 size={24} className="logo-icon" />
              </div>
              <div className="brand-text">
                <span className="brand-name">COMODO</span>
                <span className="brand-sub">LÜKS EMLAK</span>
              </div>
            </div>

            <p className="footer-about">
              Türkiye\'nin en prestijli bölgelerinde, yüksek getiri ve eşsiz mimariye sahip
              gayrimenkulleri yatırımcılarımızla buluşturan lider lüks emlak danışmanlık kuruluşu.
            </p>

            <div className="footer-contact-items">
              <div className="contact-item">
                <MapPin size={16} className="gold-icon" />
                <span>Bebek Mah. Cevdet Paşa Cad. No: 48, Beşiktaş / İstanbul</span>
              </div>
              <div className="contact-item">
                <Phone size={16} className="gold-icon" />
                <span>+90 (212) 345 67 89 / +90 (532) 415 88 90</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="gold-icon" />
                <span>info@comodoemlak.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Hızlı Erişim</h4>
            <ul className="footer-links">
              <li><a href="#properties">Öne Çıkan Portföy</a></li>
              <li><a href="#locations">Popüler Lokasyonlar</a></li>
              <li><a href="#mortgage-calculator">Konut Kredisi Hesaplama</a></li>
              <li><a href="#agents">Uzman Danışmanlarımız</a></li>
              <li><a href="#testimonials">Müşteri Yorumları</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Portföy Kategorileri</h4>
            <ul className="footer-links">
              <li><a href="#properties">Bodrum Lüks Villaları</a></li>
              <li><a href="#properties">Boğaz Manzaralı Penthouse</a></li>
              <li><a href="#properties">Çeşme & Alaçatı Malikâneleri</a></li>
              <li><a href="#properties">Levent & Maslak Rezidanslar</a></li>
              <li><a href="#properties">Tarihi Yalı ve Köşkler</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-heading">Özel Yatırım Bülteni</h4>
            <p className="newsletter-text">
              Piyasaya henüz çıkmamış gizli (off-market) lüks portföyler ve gayrimenkul yatırım
              fırsatları için bültenimize kaydolun.
            </p>

            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="newsletter-input-box">
                <Mail size={16} className="newsletter-mail-icon" />
                <input
                  type="email"
                  required
                  placeholder="E-posta adresiniz..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn" title="Bültene Kaydol">
                  <Send size={15} />
                </button>
              </div>
            </form>

            <div className="footer-security">
              <ShieldCheck size={14} className="emerald-icon" />
              <span>Verileriniz SSL ile şifrelenir, spam gönderilmez.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} <strong>Comodo Emlak</strong>. Tüm Hakları Saklıdır.
          </p>

          <div className="footer-bottom-links">
            <a href="#hero">Gizlilik Politikası</a>
            <span>•</span>
            <a href="#hero">Kullanım Şartları</a>
            <span>•</span>
            <a href="#hero">KVKK Aydınlatma Metni</a>
            <span>•</span>
            <a href="#hero">Çerez Tercihleri</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

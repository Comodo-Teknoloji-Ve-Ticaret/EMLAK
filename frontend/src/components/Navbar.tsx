import React, { useState } from 'react';
import { Building2, Heart, Moon, Sun, PlusCircle, Menu, X } from 'lucide-react';
import type { Currency, Theme } from '../types';

interface NavbarProps {
  currentTheme: Theme;
  onToggleTheme: () => void;
  currency: Currency;
  onChangeCurrency: (c: Currency) => void;
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenAddListing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onToggleTheme,
  currency,
  onChangeCurrency,
  favoriteCount,
  onOpenFavorites,
  onOpenAddListing,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-wrapper">
      <div className="container nav-content">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo">
          <div className="logo-icon-box">
            <Building2 className="logo-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">COMODO</span>
            <span className="brand-sub">LÜKS EMLAK</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <a href="#properties" className="nav-link">Portföy</a>
          <a href="#locations" className="nav-link">Popüler Bölgeler</a>
          <a href="#mortgage-calculator" className="nav-link">Kredi Hesaplayıcı</a>
          <a href="#agents" className="nav-link">Danışmanlarımız</a>
          <a href="#testimonials" className="nav-link">Görüşler</a>
        </nav>

        {/* Right Action Tools */}
        <div className="nav-actions">
          {/* Currency Switcher */}
          <div className="currency-selector">
            {(['TRY', 'USD', 'EUR'] as Currency[]).map((curr) => (
              <button
                key={curr}
                className={`currency-btn ${currency === curr ? 'active' : ''}`}
                onClick={() => onChangeCurrency(curr)}
                title={`Para birimini ${curr} yap`}
              >
                {curr === 'TRY' ? '₺' : curr === 'USD' ? '$' : '€'}
              </button>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button
            className="btn-icon theme-btn"
            onClick={onToggleTheme}
            aria-label="Temayı değiştir"
            title={currentTheme === 'dark' ? 'Açık Moda Geç' : 'Karanlık Moda Geç'}
          >
            {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Favorites Button with Counter */}
          <button
            className="favorites-btn"
            onClick={onOpenFavorites}
            title="Kayıtlı Favorilerim"
            aria-label="Favoriler"
          >
            <Heart size={19} className={favoriteCount > 0 ? 'heart-filled' : ''} />
            <span className="fav-label">Favoriler</span>
            {favoriteCount > 0 && <span className="fav-badge">{favoriteCount}</span>}
          </button>

          {/* Add Listing CTA */}
          <button className="btn-primary list-btn" onClick={onOpenAddListing}>
            <PlusCircle size={18} />
            <span>İlan Bırak</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu animate-fade-in">
          <a
            href="#properties"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Portföy
          </a>
          <a
            href="#locations"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Popüler Bölgeler
          </a>
          <a
            href="#mortgage-calculator"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Kredi Hesaplayıcı
          </a>
          <a
            href="#agents"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Danışmanlarımız
          </a>
          <a
            href="#testimonials"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Müşteri Yorumları
          </a>

          <div className="mobile-actions">
            <button
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddListing();
              }}
            >
              <PlusCircle size={18} />
              <span>İlan / Portföy Bırak</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

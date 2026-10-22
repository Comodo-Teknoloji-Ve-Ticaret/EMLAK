import React from 'react';
import { Search, MapPin, Home, ArrowRight, ShieldCheck, Award, TrendingUp, Sparkles } from 'lucide-react';
import type { PropertyFilterState, PropertyStatus, PropertyType } from '../types';

interface HeroProps {
  filter: PropertyFilterState;
  onFilterChange: (newFilter: Partial<PropertyFilterState>) => void;
  onSearchSubmit: () => void;
  totalProperties: number;
}

export const Hero: React.FC<HeroProps> = ({
  filter,
  onFilterChange,
  onSearchSubmit,
  totalProperties,
}) => {
  return (
    <section id="hero" className="hero-section">
      {/* Background ambient lighting glows */}
      <div className="hero-ambient-glow glow-1"></div>
      <div className="hero-ambient-glow glow-2"></div>

      <div className="container hero-container">
        {/* Top badge */}
        <div className="hero-badge-wrapper animate-fade-in">
          <div className="badge badge-gold">
            <Sparkles size={14} />
            <span>2026 Seçkin Gayrimenkul Koleksiyonu</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title animate-fade-in">
          Ayrıcalıklı Yaşam Alanları & <br />
          <span className="gold-gradient-text">Kusursuz Lüks Gayrimenkul</span>
        </h1>

        <p className="hero-subtitle animate-fade-in">
          İstanbul Boğazı\'ndan Bodrum kıyılarına, Türkiye\'nin en prestijli noktalarında
          özenle küratörlüğü yapılmış lüks villa, rezidans ve penthouse portföyü.
        </p>

        {/* Hero Interactive Search Bar */}
        <div className="hero-search-card glass-panel animate-fade-in">
          {/* Status Switcher Tabs */}
          <div className="search-status-tabs">
            {(
              [
                { label: 'Tümü', value: 'all' },
                { label: 'Satılık', value: 'sale' },
                { label: 'Kiralık', value: 'rent' },
              ] as { label: string; value: PropertyStatus }[]
            ).map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={`status-tab-btn ${filter.status === tab.value ? 'active' : ''}`}
                onClick={() => onFilterChange({ status: tab.value })}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Input Grid */}
          <div className="search-inputs-grid">
            {/* Search Keyword */}
            <div className="search-field">
              <label className="field-label">
                <Search size={15} />
                <span>Arama & Lokasyon</span>
              </label>
              <input
                type="text"
                placeholder="Örn: Yalıkavak, Bebek, Deniz Manzaralı..."
                value={filter.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                className="search-input"
              />
            </div>

            {/* City Selector */}
            <div className="search-field">
              <label className="field-label">
                <MapPin size={15} />
                <span>Şehir</span>
              </label>
              <select
                value={filter.city}
                onChange={(e) => onFilterChange({ city: e.target.value })}
                className="search-select"
              >
                <option value="all">Tüm Şehirler</option>
                <option value="İstanbul">İstanbul</option>
                <option value="Muğla">Muğla (Bodrum & Göcek)</option>
                <option value="İzmir">İzmir (Çeşme & Urla)</option>
                <option value="Antalya">Antalya (Kaş & Kalkan)</option>
                <option value="Ankara">Ankara (Çankaya)</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="search-field">
              <label className="field-label">
                <Home size={15} />
                <span>Konut Tipi</span>
              </label>
              <select
                value={filter.type}
                onChange={(e) => onFilterChange({ type: e.target.value as PropertyType })}
                className="search-select"
              >
                <option value="all">Tüm Tipler</option>
                <option value="villa">Lüks Villa & Malikâne</option>
                <option value="penthouse">Boğaz & Deniz Penthouse</option>
                <option value="residence">Akıllı Rezidans</option>
                <option value="apartment">Tarihi / Lüks Daire</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="search-field-btn">
              <button
                type="button"
                className="btn-primary search-submit-btn"
                onClick={onSearchSubmit}
              >
                <Search size={18} />
                <span>İlanları Bul ({totalProperties})</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges / Stats Bar */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <ShieldCheck size={24} className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-number">1.850+</span>
              <span className="stat-desc">Doğrulanmış Lüks Portföy</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Award size={24} className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-number">%99.4</span>
              <span className="stat-desc">Müşteri Memnuniyeti</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <TrendingUp size={24} className="stat-icon" />
            </div>
            <div className="stat-info">
              <span className="stat-number">₺4.8 Milyar+</span>
              <span className="stat-desc">Yıllık İşlem Hacmi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

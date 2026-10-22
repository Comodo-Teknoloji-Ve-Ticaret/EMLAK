import React from 'react';
import { MapPin, ArrowUpRight, Compass } from 'lucide-react';
import { mockHighlights } from '../data/mockProperties';

interface PopularLocationsProps {
  onSelectCity: (city: string) => void;
}

export const PopularLocations: React.FC<PopularLocationsProps> = ({ onSelectCity }) => {
  return (
    <section id="locations" className="locations-section">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge badge-gold">
            <Compass size={13} />
            <span>Prestijli Lokasyonlar</span>
          </div>
          <h2 className="section-title">
            Türkiye\'nin En Değerli <span className="gold-gradient-text">Bölgeleri</span>
          </h2>
          <p className="section-subtitle">
            Bodrum\'un koylarından İstanbul Boğazı\'nın asil yalılarına; en çok talep gören
            ve değerini katlayan seçkin gayrimenkul merkezleri.
          </p>
        </div>

        <div className="locations-grid">
          {mockHighlights.map((loc) => (
            <div
              key={loc.id}
              className="location-card glass-panel"
              onClick={() => onSelectCity(loc.city)}
              role="button"
              tabIndex={0}
            >
              <img src={loc.image} alt={loc.name} className="loc-card-img" loading="lazy" />
              <div className="loc-card-gradient"></div>

              <div className="loc-card-content">
                <div className="loc-card-top">
                  <span className="badge badge-glass">
                    <MapPin size={12} />
                    <span>{loc.city}</span>
                  </span>
                  <div className="loc-card-arrow">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="loc-card-bottom">
                  <h3 className="loc-name">{loc.name}</h3>
                  <p className="loc-tag">{loc.tag}</p>

                  <div className="loc-meta">
                    <span className="loc-count">{loc.count} Aktif Portföy</span>
                    <span className="loc-avg">Ort. {loc.avgPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

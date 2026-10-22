import React from 'react';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { PropertyFilterState, PropertyStatus, PropertyType } from '../types';

interface PropertyFilterProps {
  filter: PropertyFilterState;
  onFilterChange: (newFilter: Partial<PropertyFilterState>) => void;
  onResetFilters: () => void;
  resultCount: number;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filter,
  onFilterChange,
  onResetFilters,
  resultCount,
}) => {
  return (
    <div className="filter-wrapper glass-panel">
      <div className="filter-top-row">
        <div className="filter-title-box">
          <Filter size={18} className="gold-icon" />
          <h2 className="filter-section-title">Portföy Filtreleri</h2>
          <span className="results-badge">
            <strong>{resultCount}</strong> ilan listeleniyor
          </span>
        </div>

        {/* Quick Reset */}
        <button
          type="button"
          className="reset-filters-btn"
          onClick={onResetFilters}
          title="Filtreleri Sıfırla"
        >
          <RotateCcw size={14} />
          <span>Sıfırla</span>
        </button>
      </div>

      <div className="filter-controls-grid">
        {/* Status Selector */}
        <div className="filter-group">
          <label className="filter-label">Durum</label>
          <div className="status-pill-group">
            {(
              [
                { label: 'Tümü', value: 'all' },
                { label: 'Satılık', value: 'sale' },
                { label: 'Kiralık', value: 'rent' },
              ] as { label: string; value: PropertyStatus }[]
            ).map((st) => (
              <button
                key={st.value}
                type="button"
                className={`pill-btn ${filter.status === st.value ? 'active' : ''}`}
                onClick={() => onFilterChange({ status: st.value })}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* City Filter */}
        <div className="filter-group">
          <label className="filter-label">Lokasyon / Şehir</label>
          <select
            value={filter.city}
            onChange={(e) => onFilterChange({ city: e.target.value })}
            className="filter-select"
          >
            <option value="all">Tüm Şehirler</option>
            <option value="İstanbul">İstanbul</option>
            <option value="Muğla">Muğla (Bodrum & Göcek)</option>
            <option value="İzmir">İzmir (Çeşme)</option>
            <option value="Antalya">Antalya (Kaş & Kalkan)</option>
            <option value="Ankara">Ankara (Çankaya)</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="filter-group">
          <label className="filter-label">Konut Türü</label>
          <select
            value={filter.type}
            onChange={(e) => onFilterChange({ type: e.target.value as PropertyType })}
            className="filter-select"
          >
            <option value="all">Tüm Portföy Türleri</option>
            <option value="villa">Lüks Villa & Malikâne</option>
            <option value="penthouse">Boğaz & Deniz Manzaralı Penthouse</option>
            <option value="residence">Akıllı Rezidans</option>
            <option value="apartment">Tarihi / Lüks Daire</option>
          </select>
        </div>

        {/* Bedrooms Filter */}
        <div className="filter-group">
          <label className="filter-label">Oda Sayısı</label>
          <select
            value={filter.bedrooms}
            onChange={(e) => onFilterChange({ bedrooms: e.target.value })}
            className="filter-select"
          >
            <option value="all">Farketmez</option>
            <option value="2">2+1</option>
            <option value="3">3+1</option>
            <option value="4">4+1 veya 4+2</option>
            <option value="5">5+ ve Malikâne</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label className="filter-label">
            <SlidersHorizontal size={13} style={{ marginRight: '4px' }} />
            Sıralama
          </label>
          <select
            value={filter.sortBy}
            onChange={(e) =>
              onFilterChange({
                sortBy: e.target.value as PropertyFilterState['sortBy'],
              })
            }
            className="filter-select"
          >
            <option value="featured">Öne Çıkanlar Önce</option>
            <option value="newest">En Yeni İlanlar</option>
            <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="area-desc">Alan: En Geniş m²</option>
          </select>
        </div>
      </div>
    </div>
  );
};

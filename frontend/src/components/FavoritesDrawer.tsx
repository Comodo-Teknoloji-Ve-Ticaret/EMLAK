import React from 'react';
import { X, Heart, Trash2, ArrowRight, BedDouble, Maximize2 } from 'lucide-react';
import type { Property, Currency } from '../types';
import { formatCurrencyPrice } from '../utils/formatters';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  currency: Currency;
  onRemoveFavorite: (id: string) => void;
  onClearFavorites: () => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  currency,
  onRemoveFavorite,
  onClearFavorites,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay animate-fade-in" onClick={onClose}>
      <div className="drawer-panel glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-left">
            <Heart size={20} className="gold-icon fill-gold" />
            <h3 className="drawer-title">Kaydedilen Favoriler</h3>
            <span className="drawer-badge">{favorites.length}</span>
          </div>

          <div className="drawer-header-right">
            {favorites.length > 0 && (
              <button
                type="button"
                className="clear-all-btn"
                onClick={onClearFavorites}
                title="Tüm Favorileri Sil"
              >
                <Trash2 size={15} />
                <span>Temizle</span>
              </button>
            )}

            <button
              type="button"
              className="btn-icon drawer-close-btn"
              onClick={onClose}
              title="Kapat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="drawer-content">
          {favorites.length === 0 ? (
            <div className="empty-favorites">
              <div className="empty-icon-box">
                <Heart size={44} className="empty-heart-icon" />
              </div>
              <h4>Henüz favori ilan eklemediniz</h4>
              <p>
                İlgilendiğiniz lüks villaların ve rezidansların kartlarındaki kalp simgesine
                tıklayarak daha sonra karşılaştırmak üzere buraya kaydedebilirsiniz.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={onClose}
                style={{ marginTop: '1rem' }}
              >
                İlanları Keşfet
              </button>
            </div>
          ) : (
            <div className="favorites-list">
              {favorites.map((prop) => (
                <div key={prop.id} className="fav-item-card glass-panel">
                  <img
                    src={prop.featuredImage || prop.images[0]}
                    alt={prop.title}
                    className="fav-item-thumb"
                  />

                  <div className="fav-item-details">
                    <span className="fav-item-price">
                      {formatCurrencyPrice(prop.priceTRY, currency)}
                    </span>
                    <h4
                      className="fav-item-title"
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                    >
                      {prop.title}
                    </h4>
                    <span className="fav-item-loc">
                      {prop.district}, {prop.city}
                    </span>

                    <div className="fav-item-specs">
                      <span>
                        <BedDouble size={13} /> {prop.bedrooms}+{prop.livingRooms}
                      </span>
                      <span>
                        <Maximize2 size={13} /> {prop.areaSqM} m²
                      </span>
                    </div>

                    <div className="fav-item-actions">
                      <button
                        type="button"
                        className="btn-secondary fav-view-btn"
                        onClick={() => {
                          onClose();
                          onSelectProperty(prop);
                        }}
                      >
                        <span>İncele</span>
                        <ArrowRight size={13} />
                      </button>

                      <button
                        type="button"
                        className="fav-delete-btn"
                        onClick={() => onRemoveFavorite(prop.id)}
                        title="Favorilerden kaldır"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

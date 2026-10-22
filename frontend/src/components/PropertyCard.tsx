import React, { useState } from 'react';
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Eye,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import type { Property, Currency } from '../types';
import { formatCurrencyPrice } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const handleWhatsapp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(
      `Merhaba ${property.agent.name}, "${property.title}" (Ref: #${property.id}) ilanı hakkında detaylı bilgi almak istiyorum.`
    );
    window.open(`https://wa.me/${property.agent.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <article
      className="property-card glass-panel"
      onClick={() => onSelectProperty(property)}
      tabIndex={0}
      role="button"
      aria-label={`${property.title} detaylarını görüntüle`}
    >
      {/* Image Container with Badges & Arrows */}
      <div className="card-image-box">
        <img
          src={property.images[activeImageIndex] || property.featuredImage}
          alt={property.title}
          className="card-image"
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="card-image-gradient"></div>

        {/* Top Badges */}
        <div className="card-top-badges">
          <div className="badges-left">
            <span className={`badge ${property.status === 'sale' ? 'badge-gold' : 'badge-emerald'}`}>
              {property.status === 'sale' ? 'Satılık' : 'Kiralık'}
            </span>
            {property.isFeatured && (
              <span className="badge badge-rose">
                <Sparkles size={11} />
                <span>Öne Çıkan</span>
              </span>
            )}
            {property.isHotDeal && (
              <span className="badge badge-emerald">
                <Flame size={11} />
                <span>Fırsat</span>
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            className={`fav-action-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property);
            }}
            title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            aria-label="Favorilere ekle"
          >
            <Heart size={18} className={isFavorite ? 'heart-filled' : ''} />
          </button>
        </div>

        {/* Image Carousel Controls if multiple images */}
        {property.images.length > 1 && (
          <div className="card-image-nav">
            <button
              type="button"
              className="carousel-btn prev"
              onClick={handlePrevImage}
              aria-label="Önceki Fotoğraf"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="carousel-dots">
              {property.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              className="carousel-btn next"
              onClick={handleNextImage}
              aria-label="Sonraki Fotoğraf"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Price Tag Floating over bottom of image */}
        <div className="card-price-overlay">
          <span className="price-label">Fiyat</span>
          <span className="price-amount">
            {formatCurrencyPrice(property.priceTRY, currency)}
            {property.status === 'rent' && <small className="price-period"> / Ay</small>}
          </span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="card-body">
        {/* Location Row */}
        <div className="card-location">
          <MapPin size={14} className="location-pin" />
          <span>
            {property.neighborhood}, {property.district} / {property.city}
          </span>
        </div>

        {/* Title */}
        <h3 className="card-title" title={property.title}>
          {property.title}
        </h3>

        <p className="card-tagline">{property.tagline}</p>

        {/* Property Specs Pill Grid */}
        <div className="card-specs">
          <div className="spec-item" title="Oda Sayısı">
            <BedDouble size={16} className="spec-icon" />
            <span>
              {property.bedrooms}+{property.livingRooms}
            </span>
          </div>

          <div className="spec-item" title="Net Alan">
            <Maximize2 size={16} className="spec-icon" />
            <span>{property.areaSqM} m²</span>
          </div>

          <div className="spec-item" title="Banyo Sayısı">
            <Bath size={16} className="spec-icon" />
            <span>{property.bathrooms} Banyo</span>
          </div>
        </div>

        {/* Card Footer / Agent & Quick Action */}
        <div className="card-footer">
          <div className="agent-mini">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="agent-mini-avatar"
            />
            <div className="agent-mini-info">
              <span className="agent-mini-name">{property.agent.name}</span>
              <span className="agent-mini-title">{property.agent.title}</span>
            </div>
          </div>

          <div className="card-actions">
            <button
              type="button"
              className="btn-icon whatsapp-btn"
              onClick={handleWhatsapp}
              title="Danışman ile WhatsApp'ta görüş"
              aria-label="WhatsApp İletişim"
            >
              <MessageCircle size={18} />
            </button>

            <button
              type="button"
              className="btn-secondary view-btn"
              onClick={() => onSelectProperty(property)}
            >
              <Eye size={15} />
              <span>İncele</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

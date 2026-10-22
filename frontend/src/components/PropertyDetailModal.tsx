import React, { useState } from 'react';
import {
  X,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  Building,
  Flame,
  Car,
  Waves,
  ShieldCheck,
  Phone,
  MessageCircle,
  Share2,
  CheckCircle2,
  Compass,
  Video,
  Calculator,
  Send,
  Sparkles,
} from 'lucide-react';
import type { Property, Currency, InquiryFormData } from '../types';
import { formatCurrencyPrice, calculateMortgage } from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property | null;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (property: Property) => void;
  onClose: () => void;
  onSubmitInquiry: (data: InquiryFormData) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  currency,
  isFavorite,
  onToggleFavorite,
  onClose,
  onSubmitInquiry,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'virtual' | 'location' | 'mortgage'>('details');

  // Inquiry Form State
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '14:00 - 16:00',
    message: `Merhaba, ${property.title} için sunum ve detaylı bilgi talep ediyorum.`,
    propertyTitle: property.title,
    propertyId: property.id,
  });

  // Modal mortgage calculator state (preloaded with 30% down payment)
  const defaultDownPayment = Math.round(property.priceTRY * 0.3);
  const [downPayment, setDownPayment] = useState(defaultDownPayment);
  const [loanTermMonths, setLoanTermMonths] = useState(60); // 5 years
  const [monthlyInterestRate] = useState(2.79);

  const loanAmount = Math.max(0, property.priceTRY - downPayment);
  const mortgageResult = calculateMortgage(loanAmount, monthlyInterestRate, loanTermMonths);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitInquiry(formData);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} - ${property.tagline}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('İlan bağlantısı panoya kopyalandı!');
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className={`badge ${property.status === 'sale' ? 'badge-gold' : 'badge-emerald'}`}>
              {property.status === 'sale' ? 'Satılık' : 'Kiralık'}
            </span>
            <span className="modal-ref-id">Ref No: #{property.id.toUpperCase()}</span>
          </div>

          <div className="modal-header-actions">
            <button
              type="button"
              className={`btn-icon ${isFavorite ? 'gold-active' : ''}`}
              onClick={() => onToggleFavorite(property)}
              title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            >
              <Heart size={18} className={isFavorite ? 'heart-filled' : ''} />
            </button>

            <button
              type="button"
              className="btn-icon"
              onClick={handleShare}
              title="İlanı Paylaş"
            >
              <Share2 size={18} />
            </button>

            <button
              type="button"
              className="btn-icon close-btn"
              onClick={onClose}
              title="Kapat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-scroll-body">
          {/* Main Gallery Section */}
          <div className="modal-gallery">
            <div className="gallery-main-viewport">
              <img
                src={property.images[activeImageIndex] || property.featuredImage}
                alt={property.title}
                className="gallery-main-image"
              />
              <div className="gallery-badges">
                <span className="badge badge-glass">
                  Fotoğraf {activeImageIndex + 1} / {property.images.length}
                </span>
                {property.virtualTourAvailable && (
                  <span className="badge badge-gold">
                    <Sparkles size={12} />
                    <span>360° Sanal Tur Mevcut</span>
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="gallery-thumbnails">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumbnail-btn ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`Küçük resim ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Modal Grid (Left: Content, Right: Agent & Contact) */}
          <div className="modal-content-grid">
            {/* Left Content Column */}
            <div className="modal-left-col">
              <div className="property-title-group">
                <div className="property-price-tag">
                  <span className="price-title">Portföy Değeri</span>
                  <div className="price-large">
                    {formatCurrencyPrice(property.priceTRY, currency)}
                    {property.status === 'rent' && <span className="period"> / Aylık</span>}
                  </div>
                </div>

                <h1 className="modal-property-title">{property.title}</h1>
                <p className="modal-property-tagline">{property.tagline}</p>

                <div className="modal-location-text">
                  <MapPin size={16} className="gold-icon" />
                  <span>{property.address}</span>
                </div>
              </div>

              {/* Navigation Tabs inside modal */}
              <div className="modal-tabs">
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  <Building size={16} />
                  <span>Genel Özellikler</span>
                </button>

                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'virtual' ? 'active' : ''}`}
                  onClick={() => setActiveTab('virtual')}
                >
                  <Video size={16} />
                  <span>360° Sanal Tur</span>
                </button>

                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'location' ? 'active' : ''}`}
                  onClick={() => setActiveTab('location')}
                >
                  <Compass size={16} />
                  <span>Lokasyon & Çevre</span>
                </button>

                {property.status === 'sale' && (
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === 'mortgage' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mortgage')}
                  >
                    <Calculator size={16} />
                    <span>Kredi Hesaplayıcı</span>
                  </button>
                )}
              </div>

              {/* Tab 1: Detailed Specifications & Features */}
              {activeTab === 'details' && (
                <div className="tab-pane animate-fade-in">
                  {/* Key Metrics Quick Bar */}
                  <div className="specs-summary-grid">
                    <div className="spec-metric">
                      <BedDouble size={20} className="gold-icon" />
                      <div className="metric-info">
                        <span className="metric-label">Oda & Salon</span>
                        <span className="metric-val">
                          {property.bedrooms} Yatak Odası + {property.livingRooms} Salon
                        </span>
                      </div>
                    </div>

                    <div className="spec-metric">
                      <Maximize2 size={20} className="gold-icon" />
                      <div className="metric-info">
                        <span className="metric-label">Kullanım Alanı</span>
                        <span className="metric-val">{property.areaSqM} m² Net</span>
                      </div>
                    </div>

                    <div className="spec-metric">
                      <Bath size={20} className="gold-icon" />
                      <div className="metric-info">
                        <span className="metric-label">Banyo</span>
                        <span className="metric-val">{property.bathrooms} Adet</span>
                      </div>
                    </div>

                    <div className="spec-metric">
                      <Building size={20} className="gold-icon" />
                      <div className="metric-info">
                        <span className="metric-label">Kat Durumu</span>
                        <span className="metric-val">
                          {property.floor} (Top. {property.totalFloors} Kat)
                        </span>
                      </div>
                    </div>

                    <div className="spec-metric">
                      <Calendar size={20} className="gold-icon" />
                      <div className="metric-info">
                        <span className="metric-label">Yapı Yaşı</span>
                        <span className="metric-val">
                          {property.buildingAge === 0 ? 'Sıfır Yapı' : `${property.buildingAge} Yaşında`}
                        </span>
                      </div>
                    </div>

                    <div className="spec-metric">
                      <Flame size={20} className="gold-icon" />
                      <div className="metric-info">
                        <span className="metric-label">Isıtma & Soğutma</span>
                        <span className="metric-val">{property.heatingType}</span>
                      </div>
                    </div>

                    <div className="spec-metric">
                      <Car size={20} className="gold-icon" />
                      <div className="metric-info">
                        <span className="metric-label">Otopark</span>
                        <span className="metric-val">{property.parkingSpaces} Araçlık Kapalı/Özel</span>
                      </div>
                    </div>

                    <div className="spec-metric">
                      <Waves size={20} className="gold-icon" />
                      <div className="metric-info">
                        <span className="metric-label">Yüzme Havuzu</span>
                        <span className="metric-val">{property.hasPool ? 'Özel Havuz Var' : 'Yok'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="modal-section">
                    <h3 className="section-subtitle">Ayrıntılı Portföy Açıklaması</h3>
                    <p className="description-text">{property.description}</p>
                  </div>

                  {/* Highlights Checklist */}
                  <div className="modal-section">
                    <h3 className="section-subtitle">Öne Çıkan Donanım & İmkanlar</h3>
                    <div className="features-checklist-grid">
                      {property.features.map((feature, idx) => (
                        <div key={idx} className="feature-check-item">
                          <CheckCircle2 size={16} className="emerald-icon" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: 360 Virtual Tour Simulation */}
              {activeTab === 'virtual' && (
                <div className="tab-pane animate-fade-in">
                  <div className="virtual-tour-box glass-panel">
                    <div className="virtual-badge">
                      <Sparkles size={16} />
                      <span>İnteraktif 360° Sanal Gezinti</span>
                    </div>
                    <img
                      src={property.images[1] || property.featuredImage}
                      alt="360 Sanal Tur"
                      className="virtual-preview-img"
                    />
                    <div className="virtual-overlay">
                      <div className="virtual-compass">
                        <Compass size={32} className="spin-slow" />
                        <span>Panoramik 3D Model Yükleniyor...</span>
                      </div>
                      <p className="virtual-sub">
                        Oturma odası, master suit ve bahçe terasını gerçek zamanlı olarak 360 derece keşfedin.
                      </p>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => alert('Tam ekran 360° sanal tur ortamı başlatıldı.')}
                      >
                        Tam Ekran Sanal Tura Başla
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Location & Neighborhood Perks */}
              {activeTab === 'location' && (
                <div className="tab-pane animate-fade-in">
                  <div className="location-details-box">
                    <div className="simulated-map-container">
                      <div className="map-badge">
                        <MapPin size={16} />
                        <span>{property.address}</span>
                      </div>
                      <div className="map-visual">
                        <div className="map-pin-pulse"></div>
                        <div className="map-labels">
                          <span>{property.neighborhood}</span>
                          <small>Koordinatlar: {property.coordinates.lat}, {property.coordinates.lng}</small>
                        </div>
                      </div>
                    </div>

                    <h3 className="section-subtitle" style={{ marginTop: '1.5rem' }}>
                      Çevre Lokasyon & Ulaşım Avantajları
                    </h3>
                    <div className="nearby-perks-grid">
                      {property.nearbyPerks.metro && (
                        <div className="perk-card">
                          <span className="perk-label">Metro / Toplu Taşıma</span>
                          <span className="perk-val">{property.nearbyPerks.metro}</span>
                        </div>
                      )}
                      {property.nearbyPerks.coast && (
                        <div className="perk-card">
                          <span className="perk-label">Sahil & Marina</span>
                          <span className="perk-val">{property.nearbyPerks.coast}</span>
                        </div>
                      )}
                      {property.nearbyPerks.airport && (
                        <div className="perk-card">
                          <span className="perk-label">Havalimanı</span>
                          <span className="perk-val">{property.nearbyPerks.airport}</span>
                        </div>
                      )}
                      {property.nearbyPerks.hospital && (
                        <div className="perk-card">
                          <span className="perk-label">Sağlık & Hastane</span>
                          <span className="perk-val">{property.nearbyPerks.hospital}</span>
                        </div>
                      )}
                      {property.nearbyPerks.mall && (
                        <div className="perk-card">
                          <span className="perk-label">Alışveriş & Yaşam</span>
                          <span className="perk-val">{property.nearbyPerks.mall}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Mortgage Calculator for this property */}
              {activeTab === 'mortgage' && property.status === 'sale' && (
                <div className="tab-pane animate-fade-in">
                  <div className="property-mortgage-box glass-panel">
                    <h3 className="section-subtitle">Bu Portföy İçin Ödeme Planı Hesapla</h3>
                    
                    <div className="mortgage-inputs-grid">
                      <div className="calc-field">
                        <label>Peşinat Tutarı (₺)</label>
                        <input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          step={500000}
                          min={0}
                          max={property.priceTRY}
                          className="calc-input"
                        />
                        <span className="field-hint">
                          Portföy değerinin %{Math.round((downPayment / property.priceTRY) * 100)}'i
                        </span>
                      </div>

                      <div className="calc-field">
                        <label>Vade Süresi (Ay)</label>
                        <select
                          value={loanTermMonths}
                          onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                          className="calc-select"
                        >
                          <option value={12}>12 Ay (1 Yıl)</option>
                          <option value={24}>24 Ay (2 Yıl)</option>
                          <option value={36}>36 Ay (3 Yıl)</option>
                          <option value={60}>60 Ay (5 Yıl)</option>
                          <option value={120}>120 Ay (10 Yıl)</option>
                        </select>
                      </div>
                    </div>

                    {/* Calculated Output Cards */}
                    <div className="mortgage-output-cards">
                      <div className="output-card primary-output">
                        <span className="output-label">Tahmini Aylık Taksit</span>
                        <span className="output-value">
                          ₺{new Intl.NumberFormat('tr-TR').format(mortgageResult.monthlyPayment)}
                        </span>
                        <small>Aylık %{monthlyInterestRate} konut kredi faiz oranıyla</small>
                      </div>

                      <div className="output-card">
                        <span className="output-label">Kredi Tutarı</span>
                        <span className="output-value">
                          ₺{new Intl.NumberFormat('tr-TR').format(loanAmount)}
                        </span>
                      </div>

                      <div className="output-card">
                        <span className="output-label">Toplam Geri Ödeme</span>
                        <span className="output-value">
                          ₺{new Intl.NumberFormat('tr-TR').format(mortgageResult.totalPayment)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Agent Info & Contact Form */}
            <div className="modal-right-col">
              {/* Agent Profile Box */}
              <div className="agent-profile-box glass-panel">
                <div className="agent-header">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="agent-full-avatar"
                  />
                  <div className="agent-titles">
                    <h4 className="agent-name">{property.agent.name}</h4>
                    <span className="agent-role">{property.agent.title}</span>
                    <div className="agent-rating">
                      <Sparkles size={14} className="gold-icon" />
                      <span>{property.agent.rating} / 5.0 ({property.agent.reviewCount} Değerlendirme)</span>
                    </div>
                  </div>
                </div>

                <div className="agent-badges-row">
                  <div className="agent-stat">
                    <strong>{property.agent.completedDeals}+</strong>
                    <span>Lüks Satış</span>
                  </div>
                  <div className="agent-stat">
                    <strong>%100</strong>
                    <span>Güvenilirlik</span>
                  </div>
                </div>

                <div className="agent-direct-actions">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="btn-secondary agent-btn"
                  >
                    <Phone size={16} />
                    <span>Hemen Ara</span>
                  </a>

                  <a
                    href={`https://wa.me/${property.agent.whatsapp}?text=${encodeURIComponent(
                      `Merhaba ${property.agent.name}, ${property.title} (Ref: #${property.id}) hakkında randevu talep ediyorum.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary agent-btn whatsapp-highlight"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Inquiry & Booking Form */}
              <div className="inquiry-box glass-panel">
                <h4 className="inquiry-title">
                  <Calendar size={18} className="gold-icon" />
                  <span>Özel Sunum & Randevu Talebi</span>
                </h4>
                <p className="inquiry-desc">
                  Portföyü yerinde görmek veya özel katalog talep etmek için formu doldurun.
                </p>

                <form onSubmit={handleFormSubmit} className="inquiry-form">
                  <div className="form-group">
                    <label>Adınız ve Soyadınız</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ahmet Yılmaz"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Telefon Numarası</label>
                      <input
                        type="tel"
                        required
                        placeholder="0532 000 00 00"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>E-posta Adresi</label>
                      <input
                        type="email"
                        required
                        placeholder="ahmet@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Tercih Edilen Randevu Tarihi</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Saat Dilimi</label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="form-select"
                      >
                        <option value="10:00 - 12:00">10:00 - 12:00</option>
                        <option value="14:00 - 16:00">14:00 - 16:00</option>
                        <option value="16:00 - 18:00">16:00 - 18:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Özel Notunuz veya Sorularınız</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="btn-primary submit-inquiry-btn">
                    <Send size={16} />
                    <span>Randevu Talebini İlet</span>
                  </button>

                  <div className="privacy-badge">
                    <ShieldCheck size={14} className="emerald-icon" />
                    <span>Bilgileriniz KVKK kapsamında %100 gizli tutulur.</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

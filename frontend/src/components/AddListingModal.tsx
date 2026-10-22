import React, { useState } from 'react';
import { X, PlusCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (message: string) => void;
}

export const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  if (!isOpen) return null;

  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [propertyType, setPropertyType] = useState('villa');
  const [city, setCity] = useState('İstanbul');
  const [district, setDistrict] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [bedrooms, setBedrooms] = useState('3+1');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess(
      `Sayın ${ownerName}, "${district || city}" bölgesindeki ${propertyType} portföy başvurunuz alındı. Danışmanımız en kısa sürede sizinle iletişime geçecektir.`
    );
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-container glass-panel add-listing-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="badge badge-gold">
              <PlusCircle size={14} />
              <span>Portföy Kabul</span>
            </div>
            <h3 className="modal-title-simple">Mülkünüzü Comodo ile Değerlendirin</h3>
          </div>

          <button type="button" className="btn-icon close-btn" onClick={onClose} title="Kapat">
            <X size={20} />
          </button>
        </div>

        <div className="modal-scroll-body">
          <p className="add-listing-intro">
            Sahip olduğunuz gayrimenkulü Türkiye ve yurt dışındaki nitelikli yatırımcı ağımızla
            buluşturmak için mülk bilgilerinizi paylaşın; uzman ekspertiz ve değerleme ekibimiz
            24 saat içinde ücretsiz rapor hazırlasın.
          </p>

          <form onSubmit={handleSubmit} className="add-listing-form">
            {/* Listing Type Toggle */}
            <div className="form-group">
              <label>İşlem Türü</label>
              <div className="type-toggle-pills">
                <button
                  type="button"
                  className={`type-pill ${listingType === 'sale' ? 'active' : ''}`}
                  onClick={() => setListingType('sale')}
                >
                  Satışa Çıkarmak İstiyorum
                </button>
                <button
                  type="button"
                  className={`type-pill ${listingType === 'rent' ? 'active' : ''}`}
                  onClick={() => setListingType('rent')}
                >
                  Kiraya Vermek İstiyorum
                </button>
              </div>
            </div>

            {/* Property Specs */}
            <div className="form-row">
              <div className="form-group">
                <label>Gayrimenkul Tipi</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="form-select"
                >
                  <option value="villa">Lüks Villa / Malikâne</option>
                  <option value="penthouse">Boğaz / Deniz Manzaralı Penthouse</option>
                  <option value="residence">Akıllı Rezidans</option>
                  <option value="apartment">Tarihi / Lüks Daire</option>
                  <option value="commercial">Ticari Plaza / Ofis</option>
                </select>
              </div>

              <div className="form-group">
                <label>Oda Sayısı</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="form-select"
                >
                  <option value="2+1">2+1</option>
                  <option value="3+1">3+1</option>
                  <option value="4+1">4+1</option>
                  <option value="5+2">5+2 ve üzeri</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Bulunduğu Şehir</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-select"
                >
                  <option value="İstanbul">İstanbul</option>
                  <option value="Muğla">Muğla (Bodrum, Fethiye, Göcek)</option>
                  <option value="İzmir">İzmir (Çeşme, Urla)</option>
                  <option value="Antalya">Antalya (Kaş, Kalkan, Alanya)</option>
                  <option value="Ankara">Ankara (Çankaya)</option>
                </select>
              </div>

              <div className="form-group">
                <label>İlçe / Mahalle</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Yalıkavak, Bebek..."
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Tahmini Fiyat Beklentiniz (₺)</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 35.000.000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Kullanım Alanı (m²)</label>
                <input
                  type="number"
                  required
                  placeholder="Örn: 450"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Owner Info */}
            <h4 className="form-section-heading">İletişim Bilgileriniz</h4>
            <div className="form-group">
              <label>Adınız ve Soyadınız</label>
              <input
                type="text"
                required
                placeholder="Örn: Mustafa Kılıç"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
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
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>E-posta Adresi</label>
                <input
                  type="email"
                  required
                  placeholder="mustafa@example.com"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mülk Hakkında Özel Detaylar (Manzara, Bahçe, Havuz vb.)</label>
              <textarea
                rows={3}
                placeholder="Varsa özel manzara, müştemilat, mimari tarz vb. ayrıntıları ekleyin..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-textarea"
              />
            </div>

            <button type="submit" className="btn-primary submit-inquiry-btn">
              <CheckCircle2 size={18} />
              <span>Ücretsiz Ekspertiz & Portföy Başvurusu Yap</span>
            </button>

            <div className="privacy-badge">
              <ShieldCheck size={14} className="emerald-icon" />
              <span>Tüm mülk başvuruları gizlilik sözleşmesi (NDA) çerçevesinde korunur.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

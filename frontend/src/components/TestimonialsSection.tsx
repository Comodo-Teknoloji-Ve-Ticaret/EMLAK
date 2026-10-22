import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { mockTestimonials } from '../data/mockProperties';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge badge-gold">
            <Quote size={13} />
            <span>Müşteri Deneyimleri</span>
          </div>
          <h2 className="section-title">
            Seçkin Müşterilerimizin <span className="gold-gradient-text">Gözünden Comodo</span>
          </h2>
          <p className="section-subtitle">
            Mülk edinim sürecinde sağladığımız ayrıcalıklı danışmanlık hizmetine dair geri bildirimler.
          </p>
        </div>

        <div className="testimonials-grid">
          {mockTestimonials.map((t) => (
            <div key={t.id} className="testimonial-card glass-panel">
              <div className="testimonial-header">
                <div className="stars-row">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-gold gold-icon" />
                  ))}
                </div>
                <span className="testimonial-date">{t.date}</span>
              </div>

              <p className="testimonial-quote">"{t.comment}"</p>

              <div className="testimonial-footer">
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                <div className="testimonial-author">
                  <h4 className="author-name">{t.name}</h4>
                  <span className="author-role">{t.role}</span>
                  <div className="author-badge">
                    <CheckCircle2 size={12} className="emerald-icon" />
                    <span>{t.propertyPurchased}</span>
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

import React from 'react';
import { Award, Phone, Mail, MessageCircle, Star } from 'lucide-react';
import { mockAgents } from '../data/mockProperties';

export const AgentsSection: React.FC = () => {
  return (
    <section id="agents" className="agents-section">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge badge-gold">
            <Award size={13} />
            <span>Kıdemli Danışman Kadromuz</span>
          </div>
          <h2 className="section-title">
            Lüks Konut Sektörünün <span className="gold-gradient-text">Uzman İsimleri</span>
          </h2>
          <p className="section-subtitle">
            Hukuki güvence, gizlilik protokolleri ve uluslararası yatırım ağı ile
            arama sürecinizden tapu teslimine kadar yanınızdayız.
          </p>
        </div>

        <div className="agents-grid">
          {mockAgents.map((agent) => (
            <div key={agent.id} className="agent-card glass-panel">
              <div className="agent-card-image-wrap">
                <img src={agent.avatar} alt={agent.name} className="agent-avatar-img" />
                <div className="agent-rating-badge">
                  <Star size={13} className="gold-icon fill-gold" />
                  <span>{agent.rating}</span>
                </div>
              </div>

              <div className="agent-card-content">
                <h3 className="agent-card-name">{agent.name}</h3>
                <p className="agent-card-title">{agent.title}</p>

                <div className="agent-metrics-row">
                  <div className="agent-metric">
                    <strong>{agent.completedDeals}+</strong>
                    <span>İşlem</span>
                  </div>
                  <div className="agent-metric">
                    <strong>%{agent.reviewCount}</strong>
                    <span>Tavsiye</span>
                  </div>
                  <div className="agent-metric">
                    <strong>12+ Yıl</strong>
                    <span>Deneyim</span>
                  </div>
                </div>

                <div className="agent-card-actions">
                  <a
                    href={`tel:${agent.phone}`}
                    className="agent-icon-btn"
                    title={`Ara: ${agent.phone}`}
                  >
                    <Phone size={16} />
                  </a>

                  <a
                    href={`mailto:${agent.email}`}
                    className="agent-icon-btn"
                    title={`E-posta gönder: ${agent.email}`}
                  >
                    <Mail size={16} />
                  </a>

                  <a
                    href={`https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
                      `Merhaba ${agent.name}, portföyleriniz hakkında bilgi almak istiyorum.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary agent-wa-btn"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

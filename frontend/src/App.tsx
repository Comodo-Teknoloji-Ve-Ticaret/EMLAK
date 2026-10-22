import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import type {
  Currency,
  Theme,
  Property,
  PropertyFilterState,
  InquiryFormData,
} from './types';
import { mockProperties } from './data/mockProperties';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyFilter } from './components/PropertyFilter';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { MortgageCalculator } from './components/MortgageCalculator';
import { PopularLocations } from './components/PopularLocations';
import { AgentsSection } from './components/AgentsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AddListingModal } from './components/AddListingModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const INITIAL_FILTER: PropertyFilterState = {
  searchQuery: '',
  status: 'all',
  type: 'all',
  city: 'all',
  minPrice: 0,
  maxPrice: 200000000,
  bedrooms: 'all',
  sortBy: 'featured',
};

export const App: React.FC = () => {
  // Theme state with localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('comodo_emlak_theme') as Theme) || 'dark';
  });

  // Currency state with localStorage
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem('comodo_emlak_currency') as Currency) || 'TRY';
  });

  // Favorites state with localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('comodo_emlak_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter state
  const [filter, setFilter] = useState<PropertyFilterState>(INITIAL_FILTER);

  // Modal & Drawer states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('comodo_emlak_theme', theme);
  }, [theme]);

  // Sync currency to localStorage
  useEffect(() => {
    localStorage.setItem('comodo_emlak_currency', currency);
  }, [currency]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem('comodo_emlak_favs', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#fbbf24', '#10b981', '#ffffff'],
    });
  };

  // Toggle Favorite
  const handleToggleFavorite = (property: Property) => {
    const isAlreadyFav = favoriteIds.includes(property.id);
    if (isAlreadyFav) {
      setFavoriteIds((prev) => prev.filter((id) => id !== property.id));
      showToast(`"${property.title}" favorilerinizden çıkarıldı.`);
    } else {
      setFavoriteIds((prev) => [...prev, property.id]);
      fireConfetti();
      showToast(`"${property.title}" favorilerinize eklendi!`);
    }
  };

  const handleClearFavorites = () => {
    setFavoriteIds([]);
    showToast('Tüm favoriler temizlendi.');
  };

  // Handle Search Filter updates
  const handleFilterChange = (newFilter: Partial<PropertyFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilters = () => {
    setFilter(INITIAL_FILTER);
  };

  // Scroll smoothly to properties catalog
  const handleScrollToProperties = () => {
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter properties logic
  const filteredProperties = useMemo(() => {
    return mockProperties
      .filter((prop) => {
        // Status filter
        if (filter.status !== 'all' && prop.status !== filter.status) {
          return false;
        }

        // City filter
        if (filter.city !== 'all' && prop.city !== filter.city) {
          return false;
        }

        // Property type filter
        if (filter.type !== 'all' && prop.type !== filter.type) {
          return false;
        }

        // Bedrooms filter
        if (filter.bedrooms !== 'all') {
          const reqBed = parseInt(filter.bedrooms, 10);
          if (reqBed === 5) {
            if (prop.bedrooms < 5) return false;
          } else if (prop.bedrooms !== reqBed) {
            return false;
          }
        }

        // Search query filter (title, district, city, address, features)
        if (filter.searchQuery.trim() !== '') {
          const q = filter.searchQuery.toLowerCase().trim();
          const matches =
            prop.title.toLowerCase().includes(q) ||
            prop.district.toLowerCase().includes(q) ||
            prop.neighborhood.toLowerCase().includes(q) ||
            prop.city.toLowerCase().includes(q) ||
            prop.description.toLowerCase().includes(q) ||
            prop.features.some((f) => f.toLowerCase().includes(q));

          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'featured') {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
        if (filter.sortBy === 'newest') {
          return new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime();
        }
        if (filter.sortBy === 'price-asc') {
          return a.priceTRY - b.priceTRY;
        }
        if (filter.sortBy === 'price-desc') {
          return b.priceTRY - a.priceTRY;
        }
        if (filter.sortBy === 'area-desc') {
          return b.areaSqM - a.areaSqM;
        }
        return 0;
      });
  }, [filter]);

  // Favorite property objects
  const favoriteProperties = useMemo(() => {
    return mockProperties.filter((p) => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  // Form submission handler
  const handleInquirySubmit = (data: InquiryFormData) => {
    fireConfetti();
    setSelectedProperty(null);
    showToast(
      `Sayın ${data.fullName}, ${data.propertyTitle} için randevu talebiniz alındı! Danışmanımız en kısa sürede sizinle iletişime geçecektir.`
    );
  };

  const handleAddListingSuccess = (msg: string) => {
    fireConfetti();
    showToast(msg);
  };

  return (
    <div className="app-root">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Navigation Bar */}
      <Navbar
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        currency={currency}
        onChangeCurrency={setCurrency}
        favoriteCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAddListing={() => setIsAddListingOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero
          filter={filter}
          onFilterChange={handleFilterChange}
          onSearchSubmit={handleScrollToProperties}
          totalProperties={mockProperties.length}
        />

        {/* Properties Catalog Section */}
        <section id="properties" className="properties-section">
          <div className="container">
            {/* Filter controls */}
            <PropertyFilter
              filter={filter}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              resultCount={filteredProperties.length}
            />

            {/* Properties Grid */}
            {filteredProperties.length === 0 ? (
              <div className="empty-properties-state glass-panel">
                <h3>Arama kriterlerinize uygun portföy bulunamadı</h3>
                <p>
                  Lütfen filtrelerinizi gevşetin veya farklı bir arama terimi deneyin.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleResetFilters}
                >
                  Tüm İlanları Göster
                </button>
              </div>
            ) : (
              <div className="properties-grid">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    currency={currency}
                    isFavorite={favoriteIds.includes(prop.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectProperty={(p) => setSelectedProperty(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Popular Locations */}
        <PopularLocations
          onSelectCity={(c) => {
            handleFilterChange({ city: c });
            handleScrollToProperties();
          }}
        />

        {/* Standalone Mortgage Calculator */}
        <MortgageCalculator
          onOpenConsultation={() => {
            setIsAddListingOpen(true);
          }}
        />

        {/* Agents Showcase */}
        <AgentsSection />

        {/* Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer
        onNewsletterSubmit={(email) => {
          fireConfetti();
          showToast(`Teşekkürler! "${email}" bülten listemize başarıyla kaydedildi.`);
        }}
      />

      {/* Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        currency={currency}
        isFavorite={selectedProperty ? favoriteIds.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setSelectedProperty(null)}
        onSubmitInquiry={handleInquirySubmit}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProperties}
        currency={currency}
        onRemoveFavorite={(id) => {
          setFavoriteIds((prev) => prev.filter((i) => i !== id));
        }}
        onClearFavorites={handleClearFavorites}
        onSelectProperty={(p) => setSelectedProperty(p)}
      />

      {/* Add Listing Modal */}
      <AddListingModal
        isOpen={isAddListingOpen}
        onClose={() => setIsAddListingOpen(false)}
        onSubmitSuccess={handleAddListingSuccess}
      />
    </div>
  );
};

export default App;

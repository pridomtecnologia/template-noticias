import React, { useState, useEffect } from 'react';
import './App.css';
import { mockArticles, mockGallery, categories, bannerData, siteConfig } from './mock/mockData.js';

// Header Component
const Header = ({ isMenuOpen, toggleMenu }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>{siteConfig.siteName}</h1>
            <span>{siteConfig.siteSlogan}</span>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul>
              <li><a href="#home">Início</a></li>
              <li><a href="#noticias">Notícias</a></li>
              <li><a href="#economia">Economia</a></li>
              <li><a href="#esportes">Esportes</a></li>
              <li><a href="#cultura">Cultura</a></li>
              <li><a href="#galeria">Galeria</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>

          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

// Banner Component
const Banner = ({ banner }) => {
  return (
    <div className="banner">
      <a href={banner.link} target="_blank" rel="noopener noreferrer">
        <img src={banner.image} alt={banner.alt} />
      </a>
    </div>
  );
};

// Article Card Component
const ArticleCard = ({ article, featured = false }) => {
  return (
    <article className={`article-card ${featured ? 'featured' : ''}`}>
      <div className="article-image">
        <img src={article.image} alt={article.title} />
        <span className="article-category">{article.category}</span>
      </div>
      <div className="article-content">
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="article-meta">
          <span className="article-date">{article.date}</span>
          <a href="#" className="read-more">Leia mais</a>
        </div>
      </div>
    </article>
  );
};

// Featured Section Component
const FeaturedSection = ({ articles }) => {
  const featuredArticles = articles.filter(article => article.featured);
  const mainArticle = featuredArticles[0];
  const sideArticles = featuredArticles.slice(1, 3);

  if (!mainArticle) return null;

  return (
    <section className="featured-section">
      <div className="container">
        <h2>Destaques</h2>
        <div className="featured-grid">
          <div className="main-featured">
            <ArticleCard article={mainArticle} featured={true} />
          </div>
          <div className="side-featured">
            {sideArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// News Grid Component
const NewsGrid = ({ articles, selectedCategory, onCategoryChange }) => {
  const filteredArticles = selectedCategory === "Todas" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <section className="news-grid">
      <div className="container">
        <h2>Últimas Notícias</h2>
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="articles-grid">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Component
const Gallery = ({ images }) => {
  return (
    <section className="gallery">
      <div className="container">
        <h2>Galeria</h2>
        <div className="gallery-grid">
          {images.map(image => (
            <div key={image.id} className="gallery-item">
              <img src={image.image} alt={image.alt} />
              <div className="gallery-overlay">
                <span>Ver mais</span>
                {image.title && (
                  <div className="gallery-title">{image.title}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) {
      alert('Por favor, insira um email válido');
      return;
    }
    alert(`Obrigado por se inscrever com o email: ${email}`);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h3>Receba as últimas notícias</h3>
          <p>Inscreva-se em nossa newsletter e fique por dentro de tudo</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button onClick={handleSubmit}>Inscrever</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{siteConfig.siteName}</h4>
            <p>{siteConfig.siteSlogan}</p>
            <div className="social-links">
              <a href={siteConfig.social.facebook} aria-label="Facebook">📘</a>
              <a href={siteConfig.social.twitter} aria-label="Twitter">🐦</a>
              <a href={siteConfig.social.instagram} aria-label="Instagram">📷</a>
              <a href={siteConfig.social.linkedin} aria-label="LinkedIn">💼</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Seções</h4>
            <ul>
              <li><a href="#politica">Política</a></li>
              <li><a href="#economia">Economia</a></li>
              <li><a href="#esportes">Esportes</a></li>
              <li><a href="#cultura">Cultura</a></li>
              <li><a href="#tecnologia">Tecnologia</a></li>
              <li><a href="#saude">Saúde</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Institucional</h4>
            <ul>
              <li><a href="#sobre">Sobre nós</a></li>
              <li><a href="#equipe">Nossa equipe</a></li>
              <li><a href="#anuncie">Anuncie conosco</a></li>
              <li><a href="#politica-privacidade">Política de Privacidade</a></li>
              <li><a href="#termos">Termos de Uso</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contato</h4>
            <p>{siteConfig.contact.email}</p>
            <p>{siteConfig.contact.phone}</p>
            <p>Av. Paulista, 1000 - São Paulo/SP</p>
            <p>CEP: 01310-100</p>
          </div>
        </div>
        
        {/* Banner do rodapé */}
        <div className="footer-banner">
          <Banner banner={bannerData.footer} />
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 {siteConfig.siteName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [articles] = useState(mockArticles);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryFilter = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    
    // Simula carregamento para demonstrar estado de loading
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMenuOpen && window.innerWidth <= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  // Fecha o menu ao clicar em um link (mobile)
  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      {/* Banner Principal */}
      <Banner banner={bannerData.main} />
      
      <main>
        <FeaturedSection articles={articles} />
        
        {/* Banner Lateral */}
        <section className="banner-section">
          <div className="container">
            <Banner banner={bannerData.sidebar} />
          </div>
        </section>
        
        {loading ? (
          <div className="loading">Carregando notícias...</div>
        ) : (
          <NewsGrid 
            articles={articles} 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryFilter}
          />
        )}
        
        <Gallery images={mockGallery} />
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
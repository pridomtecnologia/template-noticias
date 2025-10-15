import React, { useState, useEffect } from 'react';
import '../../App.css';
import { mockArticles, mockGallery, categories, bannerData, siteConfig } from '../../mock/mockData.js';

import HeaderComponent from '../../componentes/header/HeaderComponent';
import FooterComponent from '../../componentes/footer/FooterComponent';
import { useNavigate  } from 'react-router-dom';

// Modal Component
const Modal = ({ article, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
          ✕
        </button>
        
        <div className="modal-header">
          <img src={article.image} alt={article.title} className="modal-image" />
          <div className="modal-header-content">
            <span className="modal-category">{article.category}</span>
            <h1 className="modal-title">{article.title}</h1>
            <div className="modal-meta">
              <span className="modal-author">Por {article.author}</span>
              <span className="modal-date">{article.date}</span>
              <span className="modal-read-time">{article.readTime} de leitura</span>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-tags">
            {article.tags && article.tags.map((tag, index) => (
              <span key={index} className="modal-tag">#{tag}</span>
            ))}
          </div>
          
          <div 
            className="modal-article-content"
            dangerouslySetInnerHTML={{ __html: article.fullContent }}
          />
        </div>
      </div>
    </div>
  );
}

const Banner = ({ banner, titulo }) => {
  return (
    <div className="banner">
      <a href={banner.link} rel="noopener noreferrer">
        <img src={banner.image} alt={banner.alt} />
        <div className="banner-overlay">
          <h2>{titulo}</h2>
          <p>{banner.description}</p>
        </div>
      </a>
    </div>
  );
};

// Hero Banner Component (para notícias em destaque)
const HeroBanner = ({ articles, onReadMore }) => {
  const heroArticles = articles.slice(0, 3);
  const mainArticle = heroArticles[0];
  const sideArticles = heroArticles.slice(1, 3);
  const navigate = useNavigate();
  

  if (!mainArticle) return null;

  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-grid">
          
          {/* Notícia principal - Lado esquerdo */}
          <div className="hero-main" style={{cursor: 'pointer'}} onClick={() => navigate('/leitura')}>
            <div className="hero-article">
              <div className="hero-image">
                <img src={mainArticle.image} alt={mainArticle.title} />
                <div className="hero-overlay">
                  <div className="hero-content">
                    <h2>{mainArticle.title}</h2>
                    <p>{mainArticle.excerpt}</p>
                    <div className="hero-meta">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notícias laterais - Lado direito */}
          <div className="hero-sidebar" style={{cursor: 'pointer'}} onClick={() => navigate('/leitura')}>
            {sideArticles.map((article, index) => (
              <div key={article.id} className="hero-side-article">
                <div className="hero-side-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="hero-side-content">
                  <h3>{article.title}</h3>
                  <div className="hero-side-meta">
                    <span className="hero-side-date">{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ArticleCard = ({ article, onReadMore }) => {
  const navigate = useNavigate();
  
  return (
    <div className="news-card" onClick={() => navigate('/leitura')}>
      <div className="news-card-image">
        <img src={article.image} alt={article.title} />
      </div>

      <div className="news-card-content">
        <h4>{article.title}</h4>
        <p>{article.excerpt}</p>
      </div>
    </div>
  );
};


// Featured Section Component
const FeaturedSection = ({ articles, onReadMore  }) => {
  const featuredArticles = articles.filter(article => article.featured);
  const mainArticle = featuredArticles[0];
  const sideArticles = featuredArticles.slice(1, 3);

  if (!mainArticle) return null;

  return (
    <section className="featured-section">
      <div className="container">
        <h2>Últimas</h2>
      </div>
    </section>
  );
};

// News Grid Component
const NewsGrid = ({ articles, selectedCategory, onCategoryChange, onReadMore }) => {
  const filteredArticles = selectedCategory === "Todas" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <section className="news-grid">
      <div className="container">
     
        <div className="articles-grid">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} onReadMore={onReadMore} />
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

const PoliticaPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [articles] = useState(mockArticles);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryFilter = (category) => {
    setLoading(true);
    setSelectedCategory(category);
    
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleReadMore = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArticle(null);
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
      <HeaderComponent isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="banner" style={{margin: 0}}>
        <img src="lula-trump.avif" alt='' style={{width: '100%', height: '60vh'}} />
        <div className="banner-overlay" style={{textAlign: 'center'}}>
          <h2>Lula confirma reunião com Rubio nesta quinta e comenta encontro com Trump: ‘Não foi química, foi indústria petroquímica'</h2>
        </div>
      </div>

      
      <main>
        
        <section className="banner-section">
          <HeroBanner articles={articles} onReadMore={handleReadMore}/>
          <FeaturedSection articles={articles} onReadMore={handleReadMore} />
        </section>
        
        {loading ? (
          <div className="loading">Carregando notícias...</div>
        ) : (
          <NewsGrid 
            articles={articles} 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryFilter}
            onReadMore={handleReadMore}
          />
        )}

      </main>
      
      <FooterComponent />

      <Modal 
        article={selectedArticle} 
        isOpen={modalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default PoliticaPage;
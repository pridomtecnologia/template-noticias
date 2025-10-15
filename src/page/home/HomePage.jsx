import React, { useState, useEffect } from 'react';
import '../../App.css';
import { mockArticles, mockGallery, categories, bannerData, siteConfig } from '../../mock/mockData.js';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';

import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import HeaderComponent from '../../componentes/header/HeaderComponent';
import FooterComponent from '../../componentes/footer/FooterComponent';

import { Link, useNavigate  } from 'react-router-dom';

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

const Banner = ({ banner }) => {
  const navigate = useNavigate();

  return (
    <div className="banner" style={{cursor: 'pointer'}}>
      <a onClick={() => navigate('/leitura')} rel="noopener noreferrer">
        <img src={banner.image} alt={banner.alt} />
        <div className="banner-overlay">
          <h2>Trump assina acordo de cessar-fogo em Gaza</h2>
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

  if (!mainArticle) return null;

  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-grid">
          {/* Notícia principal - Lado esquerdo */}
          <div className="hero-main">
            <div className="hero-article">
              <div className="hero-image">
                <img src={mainArticle.image} alt={mainArticle.title} />
                <span className="hero-category">{mainArticle.category}</span>
                <div className="hero-overlay">
                  <div className="hero-content">
                    <h2>{mainArticle.title}</h2>
                    <p>{mainArticle.excerpt}</p>
                    <div className="hero-meta">
                      <span className="hero-date">{mainArticle.date}</span>
                      {/* <a href="#" className="hero-read-more">Leia mais</a> */}
                       {/* <button 
                        className="hero-read-more" 
                        onClick={() => onReadMore(mainArticle)}
                      >
                        Leia mais
                      </button> */}
                      <div  className="hero-read-more" 
                        onClick={() => onReadMore(mainArticle)}>
                        <Button variant="contained"><ArticleIcon sx={{ mr: 1 }}/>  Leia sobre a notícia</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notícias laterais - Lado direito */}
          <div className="hero-sidebar">
            {sideArticles.map((article, index) => (
              <div key={article.id} className="hero-side-article">
                <div className="hero-side-image">
                  <img src={article.image} alt={article.title} />
                  <span className="hero-side-category">{article.category}</span>
                </div>
                <div className="hero-side-content">
                  <h3>{article.title}</h3>
                  <div className="hero-side-meta">
                    <span className="hero-side-date">{article.date}</span>
                    {/* <a href="#" className="hero-side-read-more">Leia mais</a> */}
                     <button 
                        className="hero-side-read-more" 
                        onClick={() => onReadMore(article)}
                      >
                        Leia mais
                      </button>
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
        <h2>Destaques</h2>
        <div className="featured-grid">
          <div className="main-featured">
            <ArticleCard article={mainArticle} featured={true}  onReadMore={onReadMore}  />
          </div>
          <div className="side-featured">
            {sideArticles.map(article => (
              <ArticleCard key={article.id} article={article} onReadMore={onReadMore}  />
            ))}
          </div>
        </div>
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
        {/* <h2>Últimas Notícias</h2> */}
        {/* <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div> */}
        <div className="articles-grid">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} onReadMore={onReadMore} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Component
// const Gallery = ({ images }) => {
//   return (
//     <section className="gallery">
//       <div className="container">
//         <h2>Galeria</h2>
//         <div className="gallery-grid">
//           {images.map(image => (
//             <div key={image.id} className="gallery-item">
//               <img src={image.image} alt={image.alt} />
//               <div className="gallery-overlay">
//                 <span>Ver mais</span>
//                 {image.title && (
//                   <div className="gallery-title">{image.title}</div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };


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
// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-section">
//             <img src="logo-noticia.png" alt="" width={120} />
//             {/* <p>{siteConfig.siteSlogan}</p> */}
//           </div>
//           <div className="footer-section">
//             {/* <h4>Seções</h4>
//             <ul>
//               <li><a href="#esportes">POLÍTICA</a></li>
//               <li><a href="#esportes">ESPORTES</a></li>
//               <li><a href="#noticias">NOTÍCIAS</a></li>
//               <li><a href="#economia">ECONOMIA</a></li>
//               <li><a href="#cultura">CULTURA</a></li>
//             </ul> */}
//           </div>
        
//           <div className="footer-section">
//             <p style={{color: '#5e5e5e'}}>&copy; 2025 {siteConfig.siteName}. Todos os direitos reservados.</p>
            
//             {/* <p>Av. Paulista, 1000 - São Paulo/SP</p>
//             <p>CEP: 01310-100</p> */}
//           </div>
//         </div>
        
//         {/* Banner do rodapé */}
//         <div className="footer-banner">
//         </div>
        
//         <div className="footer-bottom" style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
//           <div style={{display: 'flex', gap: '10px', color: '#5e5e5e'}}>
//             <p>Privacidade</p>
//             <p>|</p>
//             <p>Termos e Condições de Uso</p>
//           </div>
//           <div style={{display: 'flex', gap: '10px'}}>
//             <FacebookIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
//             <InstagramIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
//             <YouTubeIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

const HomePage = () => {
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
      
      <section className="banner-section">
        <div className="container">
          <Banner banner={bannerData.sidebar} />
        </div>
      </section>
      
      <main>
        
        <section className="banner-section">
          <div className="container">
            <h1>Não pintou química, pintou uma indústria petroquímica’, diz Lula sobre relação com Trump</h1>
          </div>

          <div className="container">
            <Button
              variant="contained"
              component={Link}
              to="/leitura"
            >
              <ArticleIcon sx={{ mr: 1 }} />
              Leia sobre a notícia
            </Button>
          </div>
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

export default HomePage;
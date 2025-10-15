import { mockArticles, mockGallery, categories, bannerData, siteConfig } from '../../mock/mockData.js';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img src="logo-noticia.png" alt="" width={120} />
          </div>
          <div className="footer-section">
          </div>
        
          <div className="footer-section">
            <p style={{color: '#5e5e5e'}}>&copy; 2025 {siteConfig.siteName}. Todos os direitos reservados.</p>
            
          </div>
        </div>
        
        {/* Banner do rodapé */}
        <div className="footer-banner">
        </div>
        
        <div className="footer-bottom" style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
          <div style={{display: 'flex', gap: '10px', color: '#5e5e5e'}}>
            <p>Privacidade</p>
            <p>|</p>
            <p>Termos e Condições de Uso</p>
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <FacebookIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
            <InstagramIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
            <YouTubeIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
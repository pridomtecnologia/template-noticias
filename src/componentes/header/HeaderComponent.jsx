

import React from 'react';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';   
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#5e5e5e',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function HeaderComponent ({ isMenuOpen, toggleMenu }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="//"><img src="logo-noticia.png" alt="" width={120} /></Link>
            
            {/* <h1>{siteConfig.siteName}</h1> */}
            {/* <span>{siteConfig.siteSlogan}</span> */}
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul>
              <li><Link to="//">INÍCIO</Link></li>
              <li><Link to="/politica">POLÍTICA</Link></li>
              <li><Link to="/esportes">ESPORTES</Link></li>
              <li><Link to="/noticias">NOTÍCIAS</Link></li>
              <li><Link to="/economia">ECONOMIA</Link></li>
              <li><Link to="/cultura">CULTURA</Link></li>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{color: '#5e5e5e'}} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Pesquisar..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <Box sx={{display: 'flex', alignItems: 'center', gap: '7px'}}>
                <FacebookIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
                <InstagramIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
                <YouTubeIcon sx={{color: '#5e5e5e', cursor: 'pointer'}} />
              </Box>
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


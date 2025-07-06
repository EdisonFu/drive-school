import React from 'react';
import { Link } from 'react-router-dom';
import imagesConfig from '../assets/imagesConfig';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src={imagesConfig.logo} alt="金寨驾校" />
              <div className="logo-text">
                <h1>金寨驾校</h1>
                <p>Jinzhai Driving School</p>
              </div>
            </Link>
          </div>
          <div className="contact-info">
            <div className="phone">
              <img src={imagesConfig.phoneIcon} alt="电话" />
              <span>400-123-4567</span>
            </div>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/about">关于我们</Link></li>
              <li><Link to="/courses">培训课程</Link></li>
              <li><Link to="/advantages">驾校优势</Link></li>
              <li><Link to="/contact">联系我们</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

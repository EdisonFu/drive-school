import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import { useContent } from '../content';
import '../styles/Footer.css';

const Footer = () => {
  const c = useContent();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>金寨驾校</h3>
            <p>金寨驾校成立于1999年，是一家专业的驾驶培训机构，拥有先进的教学设施和专业的教练团队，致力于为学员提供高质量的驾驶培训服务。</p>
          </div>
          <div className="footer-contact">
            <h3>联系我们</h3>
            <p><strong>地址：</strong>{c.global.address}</p>
            <p><strong>电话：</strong>{c.global.phone}</p>
          </div>
          <div className="footer-hours">
            <h3>营业时间</h3>
            <p>{c.global.hours1}</p>
            <p>{c.global.hours2}</p>
            <p>{c.global.hours3}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} 金寨驾校 版权所有</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

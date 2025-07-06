import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>金寨驾校</h3>
            <p>金寨驾校成立于2000年，是一家专业的驾驶培训机构，拥有先进的教学设施和专业的教练团队，致力于为学员提供高质量的驾驶培训服务。</p>
          </div>
          <div className="footer-contact">
            <h3>联系我们</h3>
            <p><strong>地址：</strong>安徽省金寨县梅山镇金寨大道288号</p>
            <p><strong>电话：</strong>400-123-4567</p>
            <p><strong>邮箱：</strong>info@jinzhaidriving.com</p>
          </div>
          <div className="footer-hours">
            <h3>营业时间</h3>
            <p><strong>周一至周五：</strong>8:00 - 18:00</p>
            <p><strong>周六：</strong>8:00 - 17:00</p>
            <p><strong>周日：</strong>9:00 - 16:00</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} 金寨驾校 版权所有 | 皖ICP备XXXXXXXX号</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

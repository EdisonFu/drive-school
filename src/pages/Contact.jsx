import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* 页面头图 */}
      <section className="page-header">
        <div className="page-header-content">
          <img src={imagesConfig.contact} alt="联系我们" className="page-header-image" />
          <div className="page-header-overlay">
            <div className="container">
              <h1>联系我们</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 联系信息 */}
      <section className="section contact-info-section">
        <div className="container">
          <h2 className="section-title">联系方式</h2>
          <div className="grid grid-3">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-content">
                <h3>地址</h3>
                <p>安徽省金寨县梅山镇金寨大道288号</p>
                <p>（金寨县人民医院对面）</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="info-content">
                <h3>电话</h3>
                <p>报名咨询：400-123-4567</p>
                <p>客服热线：0564-87654321</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="info-content">
                <h3>营业时间</h3>
                <p>周一至周五：8:00 - 18:00</p>
                <p>周六：8:00 - 17:00</p>
                <p>周日：9:00 - 16:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 地图 */}
      <section className="section map-section">
        <div className="container">
          <h2 className="section-title">校区地图</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <p>这里是地图占位区域，实际使用时请替换为真实地图嵌入代码</p>
              <p>可以使用百度地图或高德地图的嵌入式地图服务</p>
              {/* 实际使用时，可以替换为以下代码
              <iframe 
                src="https://map.baidu.com/..." 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0 }} 
                allowFullScreen 
                title="金寨驾校地图">
              </iframe>
              */}
            </div>
            <div className="location-info">
              <h3>交通指南</h3>
              <p><strong>公交路线：</strong></p>
              <ul>
                <li>乘坐1路、3路、5路公交车到"人民医院站"下车，步行200米即到</li>
                <li>乘坐2路、6路公交车到"金寨大道口站"下车，步行500米即到</li>
              </ul>
              <p><strong>自驾路线：</strong></p>
              <ul>
                <li>从金寨县城出发，沿金寨大道向南行驶约3公里，看到金寨县人民医院后，对面即是金寨驾校</li>
                <li>导航搜索"金寨驾校"或"安徽省金寨县梅山镇金寨大道288号"</li>
              </ul>
              <p><strong>预约免费接送：</strong>可以通过下方表单或电话预约，我们提供免费接送服务</p>
            </div>
          </div>
        </div>
      </section>

      {/* 联系表单 */}
      <section className="section contact-form-section" id="contact-form">
        <div className="container">
          <h2 className="section-title">在线咨询</h2>
          <div className="grid grid-2">
            <div className="form-info">
              <h3>有问题？联系我们</h3>
              <p>如果您有任何关于驾照培训的问题或需要了解更多信息，请填写右侧表单或直接拨打我们的电话。我们的客服团队将会尽快回复您的咨询。</p>
              <div className="contact-options">
                <div className="contact-option">
                  <h4>报名咨询</h4>
                  <p>了解课程费用、报名流程、优惠政策等</p>
                  <p>电话：400-123-4567</p>
                </div>
                <div className="contact-option">
                  <h4>教学咨询</h4>
                  <p>了解教学安排、考试时间、学车进度等</p>
                  <p>电话：0564-87654321</p>
                </div>
                <div className="contact-option">
                  <h4>投诉建议</h4>
                  <p>对我们的服务有任何意见或建议</p>
                  <p>电话：0564-12345678</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label htmlFor="name">姓名</label>
                  <input type="text" id="name" placeholder="请输入您的姓名" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">手机号码</label>
                  <input type="tel" id="phone" placeholder="请输入您的手机号码" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">电子邮箱</label>
                  <input type="email" id="email" placeholder="请输入您的电子邮箱（选填）" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">咨询主题</label>
                  <select id="subject" required>
                    <option value="">请选择咨询主题</option>
                    <option value="enrollment">报名咨询</option>
                    <option value="course">课程咨询</option>
                    <option value="price">价格咨询</option>
                    <option value="visit">预约参观</option>
                    <option value="other">其他咨询</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">留言内容</label>
                  <textarea id="message" placeholder="请输入您的咨询内容" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">提交咨询</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">常见问题</h2>
          <div className="faq-content">
            <div className="faq-item">
              <h3>如何报名？</h3>
              <p>您可以通过以下方式报名：</p>
              <ol>
                <li>在线预约：填写网站上的预约表单，我们会尽快联系您</li>
                <li>电话报名：拨打400-123-4567进行电话咨询和报名</li>
                <li>现场报名：直接到我们的校区（安徽省金寨县梅山镇金寨大道288号）咨询和报名</li>
              </ol>
            </div>
            <div className="faq-item">
              <h3>报名需要准备哪些资料？</h3>
              <p>报名需要准备以下资料：</p>
              <ol>
                <li>本人身份证原件及复印件</li>
                <li>一寸白底彩色照片6张</li>
                <li>报名费</li>
              </ol>
            </div>
            <div className="faq-item">
              <h3>如何安排学车时间？</h3>
              <p>我们提供灵活的学车时间安排，学员可以根据自己的时间安排预约练车，周一至周日均可安排。您可以通过我们的预约系统或直接联系教练进行预约。</p>
            </div>
            <div className="faq-item">
              <h3>学车过程中遇到问题怎么办？</h3>
              <p>如果在学车过程中遇到任何问题，您可以：</p>
              <ol>
                <li>直接联系您的教练进行沟通</li>
                <li>拨打我们的客服热线0564-87654321反映问题</li>
                <li>到校区前台咨询或投诉</li>
              </ol>
              <p>我们承诺会尽快解决您的问题，确保您的学车体验。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* 英雄区域 */}
      <section className="hero">
        <div className="hero-content">
          <img src={imagesConfig.hero} alt="金寨驾校" className="hero-image" />
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-text">
                <h2>专业驾驶培训</h2>
                <p>金寨驾校 - 金寨县专业驾培领航者 - 20余年驾培经验</p>
                <a href="#contact-form" className="btn btn-primary">立即报名</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我们 */}
      <section className="section about-section">
        <div className="container">
          <h2 className="section-title">关于我们</h2>
          <div className="grid grid-2">
            <div className="about-image">
              <img src={imagesConfig.history} alt="驾校历史" />
            </div>
            <div className="about-content">
              <h3>驾校简介</h3>
              <p>金寨驾校于1995年申报，1999年7月经省运管局批准立项，同年11月正式面向社会招生办学。作为金寨县历史悠久的驾驶培训机构，我们已有超过20年的办学经验，培养了数万名合格驾驶员。</p>
              <p>我校占地70余亩，拥有教学楼及附属房屋90间，配备完善的教学设施、宽敞的训练场地和一支经验丰富的教练团队，致力于为每一位学员提供专业、便捷、高效的驾驶培训服务。</p>
              <a href="/about" className="btn btn-secondary">了解更多</a>
            </div>
          </div>
        </div>
      </section>
      {/* 培训课程 */}
      <section className="section courses-section">
        <div className="container">
          <h2 className="section-title">培训课程</h2>
          <div className="grid grid-3">
            <div className="course-card card">
              <div className="course-image">
                <img src={imagesConfig.c1Course} alt="C1驾照" />
              </div>
              <div className="course-content">
                <h3>C1驾照（小型汽车）</h3>
                <p>适合驾驶手动挡汽车，学时更灵活，培训内容全面。</p>
                <div className="course-action">
                  <span className="course-price">¥3980起</span>
                  <a href="/courses" className="btn-submit">立即报名</a>
                </div>
              </div>
            </div>
            <div className="course-card card">
              <div className="course-image">
                <img src={imagesConfig.c2Course} alt="C2驾照" />
              </div>
              <div className="course-content">
                <h3>C2驾照（自动挡）</h3>
                <p>适合驾驶自动挡汽车，学习时间短，上手更快捷。</p>
                <div className="course-action">
                  <span className="course-price">¥4280起</span>
                  <a href="/courses" className="btn-submit">立即报名</a>
                </div>
              </div>
            </div>
            <div className="course-card card">
              <div className="course-image">
                <img src={imagesConfig.motorCourse} alt="摩托车驾照" />
              </div>
              <div className="course-content">
                <h3>摩托车驾照</h3>
                <p>包含E/F证，专业摩托车训练场地，保证通过率。</p>
                <div className="course-action">
                  <span className="course-price">¥1280起</span>
                  <a href="/courses" className="btn-submit">立即报名</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 驾校优势 */}
      <section className="section advantages-section">
        <div className="container">
          <h2 className="section-title">选择金寨驾校的六大理由</h2>
          <div className="grid grid-2">
            <div className="advantage-card">
              <div className="advantage-icon">
                <img src={imagesConfig.advantage1} alt="品质保障" />
              </div>
              <div className="advantage-content">
                <h3>品质保障</h3>
                <p>省级先进驾校、自营运营、20年专注驾培</p>
              </div>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <img src={imagesConfig.advantage2} alt="收费透明" />
              </div>
              <div className="advantage-content">
                <h3>收费透明</h3>
                <p>培训费一价全包、无后续收费、不限学时</p>
              </div>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <img src={imagesConfig.advantage3} alt="自有考场" />
              </div>
              <div className="advantage-content">
                <h3>自有考场</h3>
                <p>专业考场、考训一体、周六可考无需请假</p>
              </div>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <img src={imagesConfig.advantage4} alt="专业带教" />
              </div>
              <div className="advantage-content">
                <h3>专业带教</h3>
                <p>51名资深教练、持证上岗、专业耐心负责</p>
              </div>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <img src={imagesConfig.campus} alt="优质设施" />
              </div>
              <div className="advantage-content">
                <h3>优质设施</h3>
                <p>70余亩场地、宿舍食堂一应俱全、吃住学一体化</p>
              </div>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">
                <img src={imagesConfig.facility} alt="荣誉保障" />
              </div>
              <div className="advantage-content">
                <h3>荣誉保障</h3>
                <p>多次获省市级荣誉、质量管理优秀企业</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 联系表单 */}
      <section className="section contact-section" id="contact-form">
        <div className="container">
          <h2 className="section-title">在线预约</h2>
          <div className="grid grid-2">
            <div className="contact-info">
              <div className="contact-image">
                <img src={imagesConfig.contact} alt="联系我们" />
              </div>
              <div className="contact-text">
                <h3>预约看场地/免费接送</h3>
                <p className="highlight">满意再报名</p>
                <p>填写信息，我们会尽快联系您，为您安排最便捷的看场地时间或解答您的疑问。</p>
                <div className="contact-phone">
                  <img src={imagesConfig.phoneIcon} alt="电话" />
                  <span>0564-7358508</span>
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
                  <label htmlFor="course">意向课程</label>
                  <select id="course" required>
                    <option value="">请选择意向课程</option>
                    <option value="C1">C1驾照（手动挡）</option>
                    <option value="C2">C2驾照（自动挡）</option>
                    <option value="B2">B2驾照（货车）</option>
                    <option value="Motor">摩托车驾照</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">留言</label>
                  <textarea id="message" placeholder="请输入您的留言或疑问"></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-block">提交预约</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

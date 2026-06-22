import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import { useEnrollForm } from '../useEnrollForm';
import { useContent } from '../content';
import '../styles/Home.css';

const COURSE_DEFAULT_IMGS = [
  imagesConfig.c1Course,
  imagesConfig.truck,
  imagesConfig.forklift,
  imagesConfig.motorCourse,
];

const Home = () => {
  const { status, error, handleSubmit } = useEnrollForm('首页-在线预约');
  const c = useContent();
  return (
    <div className="home-page">
      {/* 英雄区域 */}
      <section className="hero">
        <div className="hero-content">
          <img src={c.home.hero_image || imagesConfig.hero} alt="金寨驾校" className="hero-image" />
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-text">
                <h2>{c.home.hero_title}</h2>
                <p>{c.home.hero_subtitle}</p>
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
              <h3>{c.home.about_title}</h3>
              <p>{c.home.about_text1}</p>
              <p>{c.home.about_text2}</p>
              <a href="/about" className="btn btn-secondary">了解更多</a>
            </div>
          </div>
        </div>
      </section>
      {/* 培训课程 */}
      <section className="section courses-section">
        <div className="container">
          <h2 className="section-title">培训课程</h2>
          <div className="grid grid-4">
            {c.courses.map((course, i) => (
              <div className="course-card card" key={i}>
                <div className="course-image">
                  <img src={course.image || COURSE_DEFAULT_IMGS[i]} alt={course.name} />
                </div>
                <div className="course-content">
                  <h3>{course.name}</h3>
                  <p>{course.desc}</p>
                  <div className="course-action">
                    <span className="course-price">{course.price}</span>
                    <a href="/courses" className="btn-submit">立即报名</a>
                  </div>
                </div>
              </div>
            ))}
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
                <img src={imagesConfig.honor} alt="荣誉保障" />
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
                  <span>{c.global.phone}</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              {status === 'success' ? (
                <div className="form-success">
                  <h3>✅ 提交成功！</h3>
                  <p>我们已收到您的预约信息，工作人员会尽快与您联系。</p>
                </div>
              ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">姓名</label>
                  <input type="text" id="name" name="name" placeholder="请输入您的姓名" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">手机号码</label>
                  <input type="tel" id="phone" name="phone" placeholder="请输入您的手机号码" required maxLength={11} />
                </div>
                <div className="form-group">
                  <label htmlFor="course">意向课程</label>
                  <select id="course" name="course" required>
                    <option value="">请选择意向课程</option>
                    <option value="C1C2">C1/C2 小型汽车</option>
                    <option value="Truck">货车（B2/A2）</option>
                    <option value="Forklift">叉车</option>
                    <option value="Motor">摩托车（E/F证）</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">留言</label>
                  <textarea id="message" name="message" placeholder="请输入您的留言或疑问"></textarea>
                </div>
                {error && <div className="form-error">{error}</div>}
                <button type="submit" className="btn btn-primary btn-block" disabled={status === 'submitting'}>
                  {status === 'submitting' ? '提交中…' : '提交预约'}
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

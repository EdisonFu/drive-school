import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import { useEnrollForm } from '../useEnrollForm';
import { useContent } from '../content';
import '../styles/Courses.css';

const COURSE_DEFAULT_IMGS = [
  imagesConfig.c1Course,
  imagesConfig.truck,
  imagesConfig.forklift,
  imagesConfig.motorCourse,
];

const Courses = () => {
  const { status, error, handleSubmit } = useEnrollForm('课程页-在线报名');
  const c = useContent();
  return (
    <div className="courses-page">
      {/* 页面头图 */}
      <section className="page-header">
        <div className="page-header-content">
          <img src={imagesConfig.c1Course} alt="培训课程" className="page-header-image" />
          <div className="page-header-overlay">
            <div className="container">
              <h1>培训课程</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 课程简介 */}
      <section className="section courses-intro">
        <div className="container">
          <h2 className="section-title">课程简介</h2>
          <div className="intro-content">
            <p>金寨驾校开设全面的驾驶培训课程，涵盖小型汽车（C1/C2）、摩托车、大型货车（B2）、牵引车（A2）增驾以及叉车特种作业培训，满足不同学员的需求。</p>
            <p>所有课程均采用"理论+实践"相结合的教学模式，专业教练一对一带教，自有考场、考训一体，帮助学员快速掌握技能、顺利通过考试。</p>
          </div>
        </div>
      </section>

      {/* 详细课程 */}
      <section className="section course-details">
        <div className="container">
          <h2 className="section-title">培训项目与收费</h2>

          {/* 费用说明 */}
          <div className="price-notice">
            ⚠️ 以下价格均为<strong>培训费</strong>，<strong>不包含考试费、体检费</strong>。具体费用及优惠详情，请来电咨询 <strong>{c.global.phone}</strong>。
          </div>

          {/* C1/C2驾照 */}
          <div className="course-item">
            <div className="course-header">
              <h3>C1 / C2 驾照（小型汽车 · 手动 + 自动挡）</h3>
              <span className="price">培训费 {c.courses[0].price}</span>
            </div>
            <div className="course-content grid grid-2">
              <div className="course-image">
                <img src={c.courses[0].image || COURSE_DEFAULT_IMGS[0]} alt="C1C2驾照培训" />
              </div>
              <div className="course-details-content">
                <div className="course-description">
                  <h4>课程介绍</h4>
                  <p>{c.courses[0].desc}</p>
                </div>
                <div className="course-features">
                  <h4>课程特点</h4>
                  <ul>
                    <li>手动挡、自动挡均可报名，培训费同价</li>
                    <li>教练一对一指导，确保学会为止</li>
                    <li>灵活排课，科目二、科目三考训一体化</li>
                    <li>自有考场，周六可考无需请假</li>
                  </ul>
                </div>
                <a href="#contact-form" className="btn btn-primary">立即报名</a>
              </div>
            </div>
          </div>

          {/* 货车（B2 / A2）*/}
          <div className="course-item">
            <div className="course-header">
              <h3>货车（B2 大型货车 · A2 牵引车）</h3>
              <span className="price">培训费 {c.courses[1].price}</span>
            </div>
            <div className="course-content grid grid-2">
              <div className="course-image">
                <img src={c.courses[1].image || COURSE_DEFAULT_IMGS[1]} alt="货车增驾培训" />
              </div>
              <div className="course-details-content">
                <div className="course-description">
                  <h4>课程介绍</h4>
                  <p>{c.courses[1].desc}</p>
                </div>
                <div className="course-features">
                  <h4>培训费标准</h4>
                  <ul>
                    <li>C1 升 B2（增驾）：¥3980</li>
                    <li>初学 B2（大型货车）：¥4780</li>
                    <li>A2 牵引车：¥3980</li>
                  </ul>
                </div>
                <a href="#contact-form" className="btn btn-primary">立即报名</a>
              </div>
            </div>
          </div>

          {/* 叉车 */}
          <div className="course-item">
            <div className="course-header">
              <h3>叉车（特种作业培训）</h3>
              <span className="price">培训费 {c.courses[2].price}</span>
            </div>
            <div className="course-content grid grid-2">
              <div className="course-image">
                <img src={c.courses[2].image || COURSE_DEFAULT_IMGS[2]} alt="叉车培训" />
              </div>
              <div className="course-details-content">
                <div className="course-description">
                  <h4>课程介绍</h4>
                  <p>{c.courses[2].desc}</p>
                </div>
                <div className="course-features">
                  <h4>培训费标准</h4>
                  <ul>
                    <li>有基础：¥1600</li>
                    <li>无基础：¥2000</li>
                  </ul>
                </div>
                <a href="#contact-form" className="btn btn-primary">立即报名</a>
              </div>
            </div>
          </div>

          {/* 摩托车驾照 */}
          <div className="course-item">
            <div className="course-header">
              <h3>摩托车驾照（E / F 证）</h3>
              <span className="price">培训费 {c.courses[3].price}</span>
            </div>
            <div className="course-content grid grid-2">
              <div className="course-image">
                <img src={c.courses[3].image || COURSE_DEFAULT_IMGS[3]} alt="摩托车驾照培训" />
              </div>
              <div className="course-details-content">
                <div className="course-description">
                  <h4>课程介绍</h4>
                  <p>{c.courses[3].desc}</p>
                </div>
                <div className="course-features">
                  <h4>课程特点</h4>
                  <ul>
                    <li>专业摩托车训练场地</li>
                    <li>资深教练一对一指导</li>
                    <li>学习周期短，灵活安排</li>
                  </ul>
                </div>
                <a href="#contact-form" className="btn btn-primary">立即报名</a>
              </div>
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
              <h3>学车需要多长时间？</h3>
              <p>一般情况下，C1/C2 驾照约需 2-4 个月，摩托车约需 1-2 个月，货车增驾时间视具体情况而定。实际时间因个人学习能力和练习频率而异。</p>
            </div>
            <div className="faq-item">
              <h3>网站上的价格包含哪些费用？</h3>
              <p>网站所列价格均为<strong>培训费</strong>，不包含考试费、体检费。考试费、体检费按实际标准收取，详细费用请来电咨询 {c.global.phone}。</p>
            </div>
            <div className="faq-item">
              <h3>如何安排学车时间？</h3>
              <p>我们提供灵活的学车时间安排，学员可以根据自己的时间预约练车，周一至周日均可安排。</p>
            </div>
            <div className="faq-item">
              <h3>考试不通过怎么办？</h3>
              <p>我们会提供针对性的强化训练，帮助学员查漏补缺，顺利通过考试。补考相关安排可咨询教练。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 在线预约表单 */}
      <section className="section contact-section" id="contact-form">
        <div className="container">
          <h2 className="section-title">在线报名</h2>
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
                  <h3>✅ 报名成功！</h3>
                  <p>我们已收到您的报名信息，工作人员会尽快与您联系。</p>
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

export default Courses;

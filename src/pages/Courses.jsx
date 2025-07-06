import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import '../styles/Courses.css';

const Courses = () => {
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
            <p>金寨驾校提供全面的驾驶培训课程，涵盖小型汽车（C1、C2）和摩托车驾照培训。我们拥有专业的教练团队和先进的教学设施，为学员提供高质量的驾驶培训服务。</p>
            <p>所有课程均采用"理论+实践"相结合的教学模式，通过科学的教学计划和个性化的培训方案，帮助学员快速掌握驾驶技能，顺利通过考试。</p>
          </div>
        </div>
      </section>

      {/* 详细课程 */}
      <section className="section course-details">
        <div className="container">
          <h2 className="section-title">详细课程</h2>
          
          {/* C1驾照 */}
          <div className="course-item">
            <div className="course-header">
              <h3>C1驾照（小型手动挡汽车）</h3>
              <span className="price">¥3980起</span>
            </div>
            <div className="course-content grid grid-2">
              <div className="course-image">
                <img src={imagesConfig.c1Course} alt="C1驾照培训" />
              </div>
              <div className="course-details-content">
                <div className="course-description">
                  <h4>课程介绍</h4>
                  <p>C1驾照允许驾驶小型、微型载客汽车以及轻型、微型载货汽车等，是最常见的驾照类型。我们的C1培训课程全面系统，从基础操作到复杂路况应对，全方位培养驾驶技能。</p>
                </div>
                <div className="course-features">
                  <h4>课程特点</h4>
                  <ul>
                    <li>全面系统的理论与实践教学</li>
                    <li>教练一对一指导，确保学习效果</li>
                    <li>灵活的学习时间安排</li>
                    <li>不限学时，确保学会为止</li>
                    <li>科目二、科目三考场与训练场一体化</li>
                  </ul>
                </div>
                <div className="course-steps">
                  <h4>学习流程</h4>
                  <ol>
                    <li>报名注册（网上预约或现场报名）</li>
                    <li>体检、照相</li>
                    <li>科目一理论学习与考试</li>
                    <li>科目二场地驾驶技能训练与考试</li>
                    <li>科目三道路驾驶技能训练与考试</li>
                    <li>科目四安全文明驾驶考试</li>
                    <li>领取驾驶证</li>
                  </ol>
                </div>
                <a href="#contact-form" className="btn btn-primary">立即报名</a>
              </div>
            </div>
          </div>
          
          {/* C2驾照 */}
          <div className="course-item">
            <div className="course-header">
              <h3>C2驾照（小型自动挡汽车）</h3>
              <span className="price">¥4280起</span>
            </div>
            <div className="course-content grid grid-2">
              <div className="course-image">
                <img src={imagesConfig.c2Course} alt="C2驾照培训" />
              </div>
              <div className="course-details-content">
                <div className="course-description">
                  <h4>课程介绍</h4>
                  <p>C2驾照允许驾驶小型、微型自动挡载客汽车以及轻型、微型自动挡载货汽车等。相比C1驾照，C2驾照学习更为简单，适合没有驾驶经验的学员快速上手。</p>
                </div>
                <div className="course-features">
                  <h4>课程特点</h4>
                  <ul>
                    <li>简单易学，无需掌握复杂的档位操作</li>
                    <li>学习周期短，通过率高</li>
                    <li>专业教练一对一教学</li>
                    <li>适合工作繁忙、学习时间有限的学员</li>
                    <li>新车教学，配备先进的教学设备</li>
                  </ul>
                </div>
                <div className="course-steps">
                  <h4>学习流程</h4>
                  <ol>
                    <li>报名注册（网上预约或现场报名）</li>
                    <li>体检、照相</li>
                    <li>科目一理论学习与考试</li>
                    <li>科目二场地驾驶技能训练与考试</li>
                    <li>科目三道路驾驶技能训练与考试</li>
                    <li>科目四安全文明驾驶考试</li>
                    <li>领取驾驶证</li>
                  </ol>
                </div>
                <a href="#contact-form" className="btn btn-primary">立即报名</a>
              </div>
            </div>
          </div>
          
          {/* 摩托车驾照 */}
          <div className="course-item">
            <div className="course-header">
              <h3>摩托车驾照（E/F证）</h3>
              <span className="price">¥1280起</span>
            </div>
            <div className="course-content grid grid-2">
              <div className="course-image">
                <img src={imagesConfig.motorCourse} alt="摩托车驾照培训" />
              </div>
              <div className="course-details-content">
                <div className="course-description">
                  <h4>课程介绍</h4>
                  <p>摩托车驾照分为E照（普通摩托车）和F照（轻便摩托车），我们提供专业的摩托车驾驶培训，从基础操作到复杂路况应对，全方位培养驾驶技能。</p>
                </div>
                <div className="course-features">
                  <h4>课程特点</h4>
                  <ul>
                    <li>专业摩托车训练场地</li>
                    <li>资深摩托车教练一对一指导</li>
                    <li>学习周期短，一般1-2个月即可完成</li>
                    <li>灵活的学习时间安排</li>
                    <li>高通过率保障</li>
                  </ul>
                </div>
                <div className="course-steps">
                  <h4>学习流程</h4>
                  <ol>
                    <li>报名注册（网上预约或现场报名）</li>
                    <li>体检、照相</li>
                    <li>科目一理论学习与考试</li>
                    <li>场地驾驶技能训练与考试</li>
                    <li>道路驾驶技能训练与考试</li>
                    <li>安全文明驾驶考试</li>
                    <li>领取驾驶证</li>
                  </ol>
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
              <p>一般情况下，C1驾照需要3-6个月时间，C2驾照需要2-4个月时间，摩托车驾照需要1-2个月时间。具体时间因个人学习能力和练习时间而异。</p>
            </div>
            <div className="faq-item">
              <h3>报名费用包含哪些内容？</h3>
              <p>报名费用包含培训费、考试费、体检费、照相费等，一次性收取，不存在额外收费项目。</p>
            </div>
            <div className="faq-item">
              <h3>如何安排学车时间？</h3>
              <p>我们提供灵活的学车时间安排，学员可以根据自己的时间安排预约练车，周一至周日均可安排。</p>
            </div>
            <div className="faq-item">
              <h3>考试不通过怎么办？</h3>
              <p>考试不通过可以免费补考，我们会提供针对性的强化训练，确保学员顺利通过考试。</p>
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
                  <span>400-123-4567</span>
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

export default Courses;

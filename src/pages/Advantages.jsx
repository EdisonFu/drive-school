import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import '../styles/Advantages.css';

const Advantages = () => {
  return (
    <div className="advantages-page">
      {/* 页面头图 */}
      <section className="page-header">
        <div className="page-header-content">
          <img src={imagesConfig.advantage1} alt="驾校优势" className="page-header-image" />
          <div className="page-header-overlay">
            <div className="container">
              <h1>驾校优势</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 优势简介 */}
      <section className="section advantages-intro">
        <div className="container">
          <h2 className="section-title">为什么选择金寨驾校</h2>
          <div className="intro-content">
            <p>金寨驾校作为安徽省金寨县规模最大、设施最完善的专业驾驶培训机构，拥有多项独特优势，为学员提供高质量的驾驶培训服务。我们坚持"诚信办学、规范教学"的原则，致力于为每一位学员提供专业、便捷、高效的驾驶培训体验。</p>
          </div>
        </div>
      </section>

      {/* 六大优势 */}
      <section className="section main-advantages">
        <div className="container">
          <h2 className="section-title">六大核心优势</h2>
          <div className="grid grid-3">
            <div className="advantage-card card">
              <div className="advantage-icon">
                <img src={imagesConfig.advantage1} alt="品质保障" />
              </div>
              <div className="advantage-content">
                <h3>品质保障</h3>
                <p>AAA级驾校、自营运营、20年专注驾培</p>
                <div className="advantage-details">
                  <ul>
                    <li>省级AAA级驾校认证</li>
                    <li>成立20年，专注驾驶培训</li>
                    <li>自营模式，杜绝中介乱象</li>
                    <li>严格质量管理体系</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="advantage-card card">
              <div className="advantage-icon">
                <img src={imagesConfig.advantage2} alt="收费透明" />
              </div>
              <div className="advantage-content">
                <h3>收费透明</h3>
                <p>培训费一价全包、无后续收费、不限学时</p>
                <div className="advantage-details">
                  <ul>
                    <li>一次性收费，明码标价</li>
                    <li>包含所有培训和考试费用</li>
                    <li>不限学时，确保学会为止</li>
                    <li>无隐形消费，杜绝乱收费</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="advantage-card card">
              <div className="advantage-icon">
                <img src={imagesConfig.advantage3} alt="自有考场" />
              </div>
              <div className="advantage-content">
                <h3>自有考场</h3>
                <p>专业考场、考训一体、周六可考勿需请假</p>
                <div className="advantage-details">
                  <ul>
                    <li>考训一体化模式</li>
                    <li>熟悉考场环境，降低考试紧张感</li>
                    <li>周六日可安排考试，无需请假</li>
                    <li>考试通过率高</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="advantage-card card">
              <div className="advantage-icon">
                <img src={imagesConfig.advantage4} alt="专业带教" />
              </div>
              <div className="advantage-content">
                <h3>专业带教</h3>
                <p>科学完善的带教体系，资深教练团队：专业、耐心、守纪</p>
                <div className="advantage-details">
                  <ul>
                    <li>教龄平均8年以上的资深教练</li>
                    <li>定期培训，更新教学方法</li>
                    <li>严格执行教学大纲</li>
                    <li>耐心细致，因材施教</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="advantage-card card">
              <div className="advantage-icon">
                <img src={imagesConfig.facility} alt="设施先进" />
              </div>
              <div className="advantage-content">
                <h3>设施先进</h3>
                <p>现代化训练场地、全新教练车、智能化教学设备</p>
                <div className="advantage-details">
                  <ul>
                    <li>宽敞的训练场地</li>
                    <li>定期更新的教练车队</li>
                    <li>智能教学系统辅助学习</li>
                    <li>舒适的学习环境</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="advantage-card card">
              <div className="advantage-icon">
                <img src={imagesConfig.campus} alt="服务贴心" />
              </div>
              <div className="advantage-content">
                <h3>服务贴心</h3>
                <p>灵活排课、一对一教学、免费接送、全程跟踪</p>
                <div className="advantage-details">
                  <ul>
                    <li>灵活的排课系统</li>
                    <li>预约看场地免费接送</li>
                    <li>专人全程跟踪学习进度</li>
                    <li>贴心服务，解决后顾之忧</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 硬件设施 */}
      <section className="section facilities-section">
        <div className="container">
          <h2 className="section-title">硬件设施</h2>
          <div className="grid grid-2">
            <div className="facility-image">
              <img src={imagesConfig.facility} alt="教学设施" />
            </div>
            <div className="facility-content">
              <h3>现代化教学设施</h3>
              <p>金寨驾校拥有现代化的教学设施，为学员提供优质的学习环境和训练条件。</p>
              <ul className="facility-list">
                <li>
                  <strong>标准化训练场地：</strong>拥有5个标准化训练场地，总面积达20000平方米，模拟各种道路环境和考试项目。
                </li>
                <li>
                  <strong>先进的教练车队：</strong>近百辆各类教练车，包括手动挡、自动挡小型汽车和摩托车，全部配备先进的教学设备。
                </li>
                <li>
                  <strong>智能教学系统：</strong>配备智能化教学系统，实时记录学员训练情况，科学分析学习效果，提高训练效率。
                </li>
                <li>
                  <strong>多媒体教室：</strong>配备现代化多媒体教室，为学员提供直观、生动的理论教学。
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 校区环境 */}
      <section className="section campus-section">
        <div className="container">
          <h2 className="section-title">校区环境</h2>
          <div className="grid grid-2">
            <div className="campus-content">
              <h3>舒适的学习环境</h3>
              <p>金寨驾校位于安徽省金寨县梅山镇金寨大道288号，交通便利，环境优美，为学员提供舒适的学习环境。</p>
              <ul className="campus-list">
                <li>
                  <strong>宽敞的休息区：</strong>配备舒适的休息区，提供饮水、充电等服务，方便学员休息和等待。
                </li>
                <li>
                  <strong>绿化环境：</strong>校区绿化良好，环境优美，为学员提供良好的学习氛围。
                </li>
                <li>
                  <strong>便利设施：</strong>校区内设有餐厅、卫生间等便利设施，满足学员基本需求。
                </li>
                <li>
                  <strong>交通便利：</strong>校区交通便利，多路公交可达，并提供免费接送服务。
                </li>
              </ul>
            </div>
            <div className="campus-image">
              <img src={imagesConfig.campus} alt="校区环境" />
            </div>
          </div>
        </div>
      </section>

      {/* 学员评价 */}
      <section className="section testimonial-section">
        <div className="container">
          <h2 className="section-title">学员评价</h2>
          <div className="testimonial-content">
            <div className="testimonial-slider">
              <div className="testimonial-card">
                <div className="testimonial-text">
                  <p>"金寨驾校的教练非常专业耐心，教学有方法，我只用了两个月就顺利拿到了驾照。场地宽敞，设施完善，收费透明，非常推荐！"</p>
                </div>
                <div className="testimonial-author">
                  <p><strong>李先生</strong> - C1驾照学员</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-text">
                  <p>"作为零基础学员，我很担心学不会开车，但金寨驾校的教练非常有耐心，从最基础教起，让我逐渐建立信心，现在已经顺利拿证了！"</p>
                </div>
                <div className="testimonial-author">
                  <p><strong>张女士</strong> - C2驾照学员</p>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-text">
                  <p>"金寨驾校服务很贴心，从报名到拿证全程有专人指导，预约练车也很方便，不耽误工作，周末也能安排。教练很专业，一次性通过所有考试！"</p>
                </div>
                <div className="testimonial-author">
                  <p><strong>王先生</strong> - C1驾照学员</p>
                </div>
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

export default Advantages;

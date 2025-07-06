import React from 'react';
import imagesConfig from '../assets/imagesConfig';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* 页面头图 */}
      <section className="page-header">
        <div className="page-header-content">
          <img src={imagesConfig.hero} alt="关于金寨驾校" className="page-header-image" />
          <div className="page-header-overlay">
            <div className="container">
              <h1>关于我们</h1>
            </div>
          </div>
        </div>
      </section>

      {/* 驾校历史 */}
      <section className="section history-section">
        <div className="container">
          <h2 className="section-title">驾校历史</h2>
          <div className="grid grid-2">
            <div className="content-text">
              <p>金寨驾校成立于2000年，坐落于安徽省六安市金寨县，是当地最具规模和影响力的专业驾驶培训机构。二十余年来，我们秉承"诚信办学、规范教学、安全第一"的理念，致力于培养合格的驾驶人才。</p>
              <p>从最初的几辆教练车、几名教练员，发展到今天拥有近百辆各类教练车、数十名专业教练的现代化驾校，金寨驾校见证了中国驾培行业的变革与发展。</p>
              <p>作为金寨县驾培行业的领军企业，我们曾多次获得"安徽省优秀驾校"、"六安市示范性驾校"、"驾培行业诚信单位"等荣誉称号，是当地驾培行业的标杆。</p>
            </div>
            <div className="content-image">
              <img src={imagesConfig.history} alt="金寨驾校历史" />
            </div>
          </div>
        </div>
      </section>

      {/* 驾校规模 */}
      <section className="section scale-section">
        <div className="container">
          <h2 className="section-title">驾校规模</h2>
          <div className="grid grid-2">
            <div className="content-image">
              <img src={imagesConfig.scale} alt="金寨驾校规模" />
            </div>
            <div className="content-text">
              <p>金寨驾校占地面积超过30000平方米，拥有先进的教学设施和宽敞的训练场地，是安徽省金寨县规模最大、设施最完善的专业驾驶培训机构。</p>
              <ul className="feature-list">
                <li>
                  <h3>训练场地</h3>
                  <p>拥有标准化训练场地5个，场地总面积达20000平方米，配备完善的教学设施，包括科目二、科目三专用训练场。所有训练场地均符合国家最新考试标准，考训一体化。</p>
                </li>
                <li>
                  <h3>教练车辆</h3>
                  <p>拥有各类教练车近百辆，包括手动挡、自动挡小型汽车和摩托车等，全部配备现代化教学设备，定期维护保养，确保车况良好。</p>
                </li>
                <li>
                  <h3>教练团队</h3>
                  <p>拥有资深教练员40余名，全部持证上岗，教学经验丰富，驾龄均在10年以上，提供专业、耐心、负责的教学服务。</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 教学理念 */}
      <section className="section philosophy-section">
        <div className="container">
          <h2 className="section-title">教学理念</h2>
          <div className="philosophy-content">
            <div className="philosophy-cards">
              <div className="philosophy-card">
                <h3>安全第一</h3>
                <p>安全是驾驶的首要原则，我们从基础训练开始，注重培养学员的安全意识和应急处理能力，确保每位学员都能成为安全、文明的驾驶员。</p>
              </div>
              <div className="philosophy-card">
                <h3>规范教学</h3>
                <p>严格按照最新的教学大纲和考试标准进行教学，采用科学的教学方法，确保学员掌握规范的驾驶技能，顺利通过各科目考试。</p>
              </div>
              <div className="philosophy-card">
                <h3>学员至上</h3>
                <p>以学员为中心，关注每位学员的学习进度和个人需求，提供个性化的教学服务，让学员在轻松愉快的氛围中学习驾驶技能。</p>
              </div>
              <div className="philosophy-card">
                <h3>持续创新</h3>
                <p>不断引入先进的教学方法和设备，优化教学流程，提升培训效率和质量，为学员提供更好的学车体验。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 教练团队 */}
      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">我们的教练团队</h2>
          <div className="team-content">
            <div className="team-image">
              <img src={imagesConfig.teachingStaff} alt="金寨驾校教练团队" />
            </div>
            <div className="team-text">
              <p>金寨驾校拥有一支经验丰富、技术精湛的教练团队。我们的教练员平均教龄超过8年，驾龄均在10年以上，具备扎实的驾驶技能和丰富的教学经验。</p>
              <p>所有教练员都经过严格的专业培训和考核，持证上岗，定期参加继续教育和技能提升培训，确保教学质量。我们的教练不仅具备专业的驾驶技能，还拥有良好的沟通能力和教学方法。</p>
              <p>我们注重教练员的职业道德培养，要求教练员对学员耐心负责、认真细致，绝不允许吃拿卡要、体罚学员等现象发生。我们的宗旨是让每一位学员都能感受到尊重与关怀。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 设施与考场 */}
      <section className="section facility-section">
        <div className="container">
          <h2 className="section-title">设施与考场</h2>
          <div className="grid grid-2">
            <div className="content-text">
              <p>金寨驾校拥有现代化的教学设施和完善的服务配套，为学员提供舒适便捷的学习环境。</p>
              <ul className="feature-list">
                <li>
                  <h3>自有考场</h3>
                  <p>我校拥有自己的考试场地，考训一体化，学员可以在实际考试场地进行训练，熟悉考试环境，提高通过率。周六可考，无需请假。</p>
                </li>
                <li>
                  <h3>多媒体教室</h3>
                  <p>配备现代化多媒体教室，采用图文并茂、视频演示等方式进行理论教学，提高学习效果。</p>
                </li>
                <li>
                  <h3>休息区域</h3>
                  <p>设有空调休息室、饮水区、卫生间等配套设施，为学员提供舒适的休息环境。</p>
                </li>
              </ul>
            </div>
            <div className="content-image">
              <img src={imagesConfig.facility} alt="金寨驾校设施" />
            </div>
          </div>
        </div>
      </section>

      {/* 荣誉资质 */}
      <section className="section honors-section">
        <div className="container">
          <h2 className="section-title">荣誉资质</h2>
          <div className="honors-content">
            <p>二十余年来，金寨驾校凭借优质的教学质量和良好的社会信誉，获得了多项荣誉：</p>
            <ul className="honors-list">
              <li>安徽省优秀驾校</li>
              <li>六安市示范性驾校</li>
              <li>金寨县驾培行业先进单位</li>
              <li>安徽省驾培行业诚信单位</li>
              <li>学员满意度五星级驾校</li>
              <li>安全生产先进单位</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="section contact-info-section">
        <div className="container">
          <h2 className="section-title">联系我们</h2>
          <div className="contact-info-content">
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <h3>总校区地址</h3>
                <p>安徽省六安市金寨县梅山镇学府路28号</p>
              </div>
              <div className="contact-info-card">
                <h3>咨询电话</h3>
                <p>400-123-4567</p>
                <p>0564-7654321</p>
              </div>
              <div className="contact-info-card">
                <h3>营业时间</h3>
                <p>周一至周日：08:00-18:00</p>
                <p>全年无休</p>
              </div>
              <div className="contact-info-card">
                <h3>在线咨询</h3>
                <p>官方网站：www.jinzhaijiaxiao.com</p>
                <p>官方微信：金寨驾校</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

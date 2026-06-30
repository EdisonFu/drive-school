import { createContext, useContext, useState, useEffect } from 'react';

// 生产同源（nginx 代理 /api）；本地开发可用 VITE_API_BASE
const API_BASE = import.meta.env.VITE_API_BASE || '';

// 默认内容（与后端 DEFAULT_CONTENT 保持一致）——后端不可用时兜底，图片留空则用打包的默认图
export const DEFAULT_CONTENT = {
  global: {
    phone: '0564-7358222',
    address: '安徽省六安市金寨县现代产业园',
    hours1: '周一至周五：8:00 - 18:00',
    hours2: '周六：8:00 - 17:00',
    hours3: '周日：9:00 - 16:00',
  },
  home: {
    hero_title: '专业驾驶培训',
    hero_subtitle: '金寨驾校 - 金寨县专业驾培领航者 - 20余年驾培经验',
    hero_image: '',
    about_title: '驾校简介',
    about_text1: '金寨驾校于1995年申报，1999年7月经省运管局批准立项，同年11月正式面向社会招生办学。作为金寨县历史悠久的驾驶培训机构，我们已有超过20年的办学经验，培养了数万名合格驾驶员。',
    about_text2: '我校占地70余亩，拥有教学楼及附属房屋90间，配备完善的教学设施、宽敞的训练场地和一支经验丰富的教练团队，致力于为每一位学员提供专业、便捷、高效的驾驶培训服务。',
  },
  courses: [
    { name: 'C1/C2驾照', price: '¥3320起', desc: '小型汽车，手动(C1)与自动挡(C2)培训费同价，自有考场，考训一体。', image: '',
      vip_name: 'C1/C2 VIP班', vip_price: '', vip_desc: '' },
    { name: '货车（B2/A2）', price: '¥3980起', desc: '大型货车、牵引车，初学与增驾均可，专业大车带教，另设叉车特种作业培训。', image: '' },
    { name: '叉车', price: '¥1600起', desc: '特种作业培训，零基础可报，考取后持证上岗。', image: '' },
    { name: '摩托车（E/F证）', price: '¥860起', desc: '专业摩托车训练场地，学习周期短，1-2个月可完成。', image: '' },
  ],
};

const ContentContext = createContext(DEFAULT_CONTENT);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    fetch(`${API_BASE}/api/content`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.global && Array.isArray(data.courses)) setContent(data);
      })
      .catch(() => {});
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

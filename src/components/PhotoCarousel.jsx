import { useState, useRef, useEffect } from 'react';
import '../styles/PhotoCarousel.css';

/**
 * 多图滑动轮播
 * props.items: [{ src, title, desc }]
 */
export default function PhotoCarousel({ items, autoplay = 5000 }) {
  const [i, setI] = useState(0);
  const startX = useRef(null);
  const timer = useRef(null);
  const n = items.length;

  const go = (k) => setI(((k % n) + n) % n);
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  // 自动播放（鼠标悬停时不动）
  useEffect(() => {
    if (!autoplay || n < 2) return;
    timer.current = setInterval(() => setI((v) => (v + 1) % n), autoplay);
    return () => clearInterval(timer.current);
  }, [autoplay, n]);

  // 触摸滑动
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    startX.current = null;
  };

  if (!n) return null;
  const cur = items[i];

  return (
    <div
      className="pc"
      onMouseEnter={() => clearInterval(timer.current)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="pc-stage">
        {items.map((it, k) => (
          <img
            key={k}
            src={it.src}
            alt={it.title}
            className={`pc-img ${k === i ? 'on' : ''}`}
            loading={k === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="pc-caption">
          <h3>{cur.title}</h3>
          {cur.desc && <p>{cur.desc}</p>}
        </div>
        {n > 1 && (
          <>
            <button className="pc-arrow pc-prev" onClick={prev} aria-label="上一张">‹</button>
            <button className="pc-arrow pc-next" onClick={next} aria-label="下一张">›</button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="pc-dots">
          {items.map((_, k) => (
            <button
              key={k}
              className={`pc-dot ${k === i ? 'on' : ''}`}
              onClick={() => go(k)}
              aria-label={`第${k + 1}张`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

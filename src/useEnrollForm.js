import { useState } from 'react';

// 生产环境同源，由 nginx 把 /api 反代到后端；本地开发可用 VITE_API_BASE 指向后端
const API_BASE = import.meta.env.VITE_API_BASE || '';

/**
 * 报名表单提交逻辑（三个页面共用）
 * 用法：<form onSubmit={handleSubmit}>，输入框需带 name 属性
 * status: idle | submitting | success | error
 */
export function useEnrollForm(source) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = (fd.get('name') || '').toString().trim();
    const phone = (fd.get('phone') || '').toString().trim();
    // 不同页面字段名不同：course 或 subject
    const course = (fd.get('course') || fd.get('subject') || '').toString();
    const message = (fd.get('message') || '').toString().trim();

    // 前端校验
    if (name.length < 2) {
      setStatus('error');
      setError('请输入正确的姓名');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setStatus('error');
      setError('请输入正确的11位手机号码');
      return;
    }

    setStatus('submitting');
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, course, message, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setError(data.error || '提交失败，请稍后重试');
      }
    } catch {
      setStatus('error');
      setError('网络异常，请稍后重试，或直接拨打电话联系我们');
    }
  }

  return { status, error, handleSubmit, reset: () => { setStatus('idle'); setError(''); } };
}

import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // 可扩展为后端存储或邮件发送
  };

  return (
    <div style={{maxWidth:400,margin:'2rem auto',padding:24,border:'1px solid #eee',borderRadius:8}}>
      <h2>联系方式</h2>
      {submitted ? (
        <div style={{color:'green'}}>提交成功！我们会尽快与您联系。</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:12}}>
            <label>姓名：</label>
            <input name="name" value={form.name} onChange={handleChange} required style={{width:'100%'}} />
          </div>
          <div style={{marginBottom:12}}>
            <label>电话：</label>
            <input name="phone" value={form.phone} onChange={handleChange} required style={{width:'100%'}} />
          </div>
          <div style={{marginBottom:12}}>
            <label>留言：</label>
            <textarea name="message" value={form.message} onChange={handleChange} style={{width:'100%'}} />
          </div>
          <button type="submit" style={{width:'100%',padding:8}}>提交</button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

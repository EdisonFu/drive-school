
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Advantages from './pages/Advantages';
import Contact from './pages/Contact';
import { ContentProvider } from './content';
import './styles/global.css';

const API_BASE = import.meta.env.VITE_API_BASE || '';

// 访问埋点：每次路由变化上报当前页面路径
function Tracker() {
  const location = useLocation();
  useEffect(() => {
    fetch(`${API_BASE}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: location.pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <ContentProvider>
      <Router>
        <Tracker />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: '1 0 auto' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/advantages" element={<Advantages />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;

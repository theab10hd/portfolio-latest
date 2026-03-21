import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Projects from './pages/Projects.tsx';
import Experience from './pages/Experience.tsx';
import Contact from './pages/Contact.tsx';

function App() {
  const location = useLocation();

  // Scroll to top and set dynamic title on route change
  useEffect(() => {
    window.scrollTo(0, 0);

    const baseName = 'Abhijith Gaganan';
    switch (location.pathname) {
      case '/':
        document.title = `Web + Graphic Designer - ${baseName}`;
        break;
      case '/about':
        document.title = `About | ${baseName}`;
        break;
      case '/projects':
        document.title = `Projects | ${baseName}`;
        break;
      case '/experience':
        document.title = `Experience | ${baseName}`;
        break;
      case '/contact':
        document.title = `Contact | ${baseName}`;
        break;
      default:
        document.title = `Web + Graphic Designer - ${baseName}`;
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Base/Header';
import AllNewsPage from './components/news/NewsCards';
import NewsDetails from './components/news/NewsDetails';
import ActivitiesSection from './components/ItqnSections/ActivitiesSection';
import DiwanSection from './components/ItqnSections/DiwanSection';
import CoursesSection from './components/ItqnSections/CoursesSection';
import MemorizationSection from './components/ItqnSections/MemorizationSection';
import CreativeSection from './components/ItqnSections/CreativeSection';
import Footer from './components/Base/Footer';
import Home from './components/Home/Home';
import FloatingButtons from './components/Home/FloatingButtons';
import Clues from './components/Clues/Clues';
import ContactSection from './components/Contact/ContactSection';
import Speech from './components/About/Speech';
import Branches from './components/About/Branches';
import Mission from './components/About/Mission'
function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="font-sans leading-normal tracking-normal">
          <Header />
          <main>
            <Routes>
              {/* Handle /itqan redirects */}
              <Route
                path="/itqan"
                element={<Navigate to="/" replace />}
              />
              <Route
                path="/itqan/:path*"
                element={<Navigate to={`/${window.location.pathname.split('/itqan/')[1]}`} replace />}
              />

              {/* Regular routes */}
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/home"
                element={<Home />}
              />
              <Route path="/news" element={<AllNewsPage />} />
              <Route path="/news/:id/:slug" element={<NewsDetails />} />
              <Route path="/activities-section" element={<ActivitiesSection />} />
              <Route path="/diwan-section" element={<DiwanSection />} />
              <Route path="/courses-section" element={<CoursesSection />} />
              <Route path="/memorization-section" element={<MemorizationSection />} />
              <Route path="/creatives-section" element={<CreativeSection />} />
              <Route path="/clues" element={<Clues />} />
              <Route path="/contact-us" element={<ContactSection />} />
              <Route path="/speech" element={<Speech />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/mission" element={<Mission />} />


            </Routes>
          </main>
          <FloatingButtons />
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

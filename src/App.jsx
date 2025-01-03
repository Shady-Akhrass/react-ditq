import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeaturedBrandCarousel from './components/FeaturedBrandCarousel';
import NewsSection from './components/NewsSection';
import MessageSection from './components/MessageSection';
import YouTubeSection from './components/YouTubeSection';
import AchievementsSection from './components/AchievementsSection';
import GeniusesSection from './components/GeniusesSection';
import ProjectsSection from './components/ProjectsSection';
import PartnersSection from './components/PartnersSection';
import SoundSection from './components/SoundSection';
import SliderSection from './components/SliderSection';
import Header from './components/Header';
import AllNewsPage from './components/news/NewsCards'; // Import the AllNewsPage component

function App() {
  return (
    <Router>
      <div className="font-sans leading-normal tracking-normal">
        <Header /> {/* Ensure Header does NOT include a Router */}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SliderSection />
                  <NewsSection />
                  <MessageSection />
                  <YouTubeSection />
                  <GeniusesSection />
                  <ProjectsSection />
                  <SoundSection />
                </>
              }
            />
            <Route
              path="/home"
              element={
                <>
                  <SliderSection />
                  <NewsSection />
                  <MessageSection />
                  <YouTubeSection />
                  <GeniusesSection />
                  <ProjectsSection />
                  <SoundSection />
                </>
              }
            />
            <Route path="/news" element={<AllNewsPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white">
          {/* Add footer content */}
        </footer>
      </div>
    </Router>
  );
}

export default App;

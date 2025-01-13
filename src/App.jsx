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
import NewsDetails from './components/news/NewsDetails'; // Import the NewsDetails component
import ActivitiesSection from './components/ActivitiesSection'; // Import the ActivitiesSection component

function App() {
  return (
    <Router>
      <div className="font-sans leading-normal tracking-normal">
        <Header />
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
                  {/* <AchievementsSection /> */}
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
                  {/* <AchievementsSection /> */}
                  <GeniusesSection />
                  <ProjectsSection />
                  <SoundSection />
                </>
              }
            />
            <Route path="/news" element={<AllNewsPage />} />
            {/* <Route path="/news/:title/details" element={<NewsDetails />} />
            <Route path="/news/:id/details" element={<NewsDetails />} /> */}
            <Route path="/news/:id/:title" element={<NewsDetails />} />
            <Route path="/activities-section" element={<ActivitiesSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
